export const customRequestIdleCallback = (() => {
  const requestIdleCallbackFallback = (
    cb: (props: {didTimeout: boolean; timeRemaining: () => number}) => void
  ): ReturnType<typeof setTimeout> => {
    const start = Date.now()
    return setTimeout(() => {
      cb({
        didTimeout: false,
        timeRemaining: () => {
          return Math.max(0, 50 - (Date.now() - start))
        }
      })
    }, 1) as any
  }

  return typeof window !== 'undefined' && window.requestIdleCallback
    ? window.requestIdleCallback.bind(window)
    : requestIdleCallbackFallback
})()

export const cancelCustomIdleCallback = (id => {
  clearTimeout(id)
  return clearTimeout
})()
