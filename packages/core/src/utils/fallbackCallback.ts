export const fallbackAsyncCallback = (action: () => void) =>
  Promise.resolve().then(action)
