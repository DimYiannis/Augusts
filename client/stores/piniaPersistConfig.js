export const piniaPersistConfig = (key) => ({
    key: key,
    storage: process.client ? localStorage : null,
  });
  