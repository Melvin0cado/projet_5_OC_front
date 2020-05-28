import Swal from 'sweetalert2'
import { disconnect } from '../component/global/function/disconnect'
import history from '../history'

export const ErrorSwal = (message, goDisconnect = false) => {
  Swal.fire({
    title: 'Erreurs',
    icon: 'error',
    showCancelButton: false,
    text: message,
    timer: 5000,
    timerProgressBar: true,
  }).then(() => {
    if (goDisconnect === true) {
      disconnect()
    }
  })
}

export const SuccesSwal = (message, redirect = null) => {
  Swal.fire({
    title: 'Succès',
    icon: 'success',
    showCancelButton: false,
    text: message,
    timer: 5000,
    timerProgressBar: true,
  }).then(() => {
    if (redirect === 'refresh') {
      window.location.reload(false)
    } else if (redirect !== null) {
      history.push(redirect)
    }
  })
}
