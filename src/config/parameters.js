export const api = 'http://localhost:3033'

export const configApi = (token = null) => {
  if (token !== null) {
    return {
      headers: { Authorization: token },
    }
  }
  return { headers: { Authorization: {} } }
}
