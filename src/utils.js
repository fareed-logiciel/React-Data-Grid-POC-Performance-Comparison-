// Generate sample data
export const generateData = (rowCount) => {
  return Array.from({ length: rowCount }, (_, id) => ({
    id,
    symbol: `SYM${id}`,
    price: (Math.random() * 1000).toFixed(2),
    volume: (Math.random() * 100000).toFixed(0),
    bid: (Math.random() * 100).toFixed(2),
    ask: (Math.random() * 100).toFixed(2),
    last: (Math.random() * 100).toFixed(2),
  }));
};

export const UPDATE_COUNT = 10000; // 10,000 rows to update
export const INTERVAL = 200; // 200 milliseconds interval
