// Self-contained in-memory mock of AsyncStorage for unit tests.
// Keeps the lib/ tests free of native modules while behaving like the real KV store.
jest.mock("@react-native-async-storage/async-storage", () => {
  let store = {};
  return {
    __esModule: true,
    default: {
      getItem: jest.fn((key) =>
        Promise.resolve(Object.prototype.hasOwnProperty.call(store, key) ? store[key] : null),
      ),
      setItem: jest.fn((key, value) => {
        store[key] = String(value);
        return Promise.resolve();
      }),
      removeItem: jest.fn((key) => {
        delete store[key];
        return Promise.resolve();
      }),
      clear: jest.fn(() => {
        store = {};
        return Promise.resolve();
      }),
      getAllKeys: jest.fn(() => Promise.resolve(Object.keys(store))),
      multiGet: jest.fn((keys) =>
        Promise.resolve(keys.map((k) => [k, Object.prototype.hasOwnProperty.call(store, k) ? store[k] : null])),
      ),
    },
  };
});
