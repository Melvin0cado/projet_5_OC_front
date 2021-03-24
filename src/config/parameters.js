const env = 'prod'

export const api =
  env === 'dev' ? 'http://localhost:3033' : 'https://api.family-saves.com'

export const configApi = (token = null) => {
  if (token !== null) {
    return {
      headers: { Authorization: token },
    }
  }
  return { headers: { Authorization: {} } }
}
