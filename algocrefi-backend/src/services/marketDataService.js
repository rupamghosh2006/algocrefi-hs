const COINGECKO_BASE = "https://api.coingecko.com/api/v3";

const INTERVAL_SECONDS = {
  "5m": 300,
  "15m": 900,
  "1h": 3600,
  "4h": 14400,
  "1d": 86400,
};

function resolveBucketSeconds(interval) {
  return INTERVAL_SECONDS[interval] || INTERVAL_SECONDS["1h"];
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

async function fetchJson(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`Market provider request failed with status ${response.status}`);
    }
    return response.json();
  } finally {
    clearTimeout(timeout);
  }
}

function toVolumeMap(totalVolumes) {
  const map = new Map();
  if (!Array.isArray(totalVolumes)) return map;

  for (const row of totalVolumes) {
    const [tsMs, vol] = row;
    const tsSec = Math.floor(Number(tsMs) / 1000);
    map.set(tsSec, Number(vol) || 0);
  }

  return map;
}

function buildCandles(prices, totalVolumes, fromTs, toTs, interval) {
  const bucketSeconds = resolveBucketSeconds(interval);
  const volumeByTs = toVolumeMap(totalVolumes);
  const buckets = new Map();

  for (const row of prices || []) {
    const [tsMs, rawPrice] = row;
    const tsSec = Math.floor(Number(tsMs) / 1000);
    const price = Number(rawPrice);

    if (!Number.isFinite(tsSec) || !Number.isFinite(price)) continue;
    if (tsSec < fromTs || tsSec > toTs) continue;

    const bucketTs = Math.floor(tsSec / bucketSeconds) * bucketSeconds;
    const existing = buckets.get(bucketTs);
    const pointVolume = volumeByTs.get(tsSec) || 0;

    if (!existing) {
      buckets.set(bucketTs, {
        time: bucketTs,
        open: price,
        high: price,
        low: price,
        close: price,
        volume: pointVolume,
      });
      continue;
    }

    existing.high = Math.max(existing.high, price);
    existing.low = Math.min(existing.low, price);
    existing.close = price;
    existing.volume += pointVolume;
  }

  return Array.from(buckets.values()).sort((a, b) => a.time - b.time);
}

async function getOhlc({ interval, fromTs, toTs }) {
  const rangeSeconds = Math.max(3600, toTs - fromTs);
  const days = clamp(Math.ceil(rangeSeconds / 86400), 1, 90);
  const marketChartUrl = `${COINGECKO_BASE}/coins/algorand/market_chart?vs_currency=usd&days=${days}&interval=hourly`;
  const data = await fetchJson(marketChartUrl);

  return buildCandles(data.prices || [], data.total_volumes || [], fromTs, toTs, interval);
}

async function getMarketStats() {
  const marketsUrl = `${COINGECKO_BASE}/coins/markets?vs_currency=usd&ids=algorand&price_change_percentage=24h`;
  const rows = await fetchJson(marketsUrl);
  const row = Array.isArray(rows) ? rows[0] : null;

  if (!row) {
    throw new Error("No market stats returned by provider");
  }

  return {
    price: Number(row.current_price || 0),
    change24h: Number(row.price_change_percentage_24h || 0),
    volume24h: Number(row.total_volume || 0),
    liquidity: Number(row.market_cap || 0),
    high24h: Number(row.high_24h || 0),
    low24h: Number(row.low_24h || 0),
  };
}

module.exports = {
  getOhlc,
  getMarketStats,
};
