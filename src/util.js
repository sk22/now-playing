export const getLastTruthy = array => {
  if (!array.length) return null
  const lastItem = array[array.length - 1]
  return lastItem || getLastTruthy(array.slice(0, array.length - 1))
}
