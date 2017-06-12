const field = 'lastfm-username'

export const getUsername = () =>
  window.localStorage.getItem(field)

export const setUsername = username =>
  window.localStorage.setItem(field, username)

export const clearUsername = () =>
  window.localStorage.removeItem(field)
