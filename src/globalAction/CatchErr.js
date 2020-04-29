import { ErrorSwal } from './swal'

export const catchErr = error => {
  const { status, message } = error.data

  switch (status) {
    case 404:
    case 409:
      ErrorSwal(message)
      break
    default:
  }
  console.log(error)
}
