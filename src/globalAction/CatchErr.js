import { ErrorSwal } from './swal'

export const catchErr = error => {
  const { code } = error.data
  let { message } = error.data

  if (code === 401 && message === 'Expired JWT Token') {
    message = 'Votre session à expiré'
  }
  switch (code) {
    case 401:
      ErrorSwal(message, true)
      break
    case 404:
    case 409:
      ErrorSwal(message)
      break
    default:
  }
  console.log(error)
}
