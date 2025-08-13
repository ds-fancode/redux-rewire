export const customRequestIdleCallback = (() => {
  const requestIdleCallback = (
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

  return requestIdleCallback
})()

export const cancelCustomIdleCallback = (id => {
  clearTimeout(id)
  return clearTimeout
})()
