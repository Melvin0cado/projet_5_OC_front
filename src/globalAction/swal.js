import Swal from 'sweetalert2'
import history from '../history'

export const ErrorSwal = message => {
  Swal.fire({
    type: 'error',
    title: 'Erreurs',
    icon: 'error',
    showCancelButton: false,
    text: message,
    timer: 5000,
    timerProgressBar: true,
  })
}

export const SuccesSwal = (message, redirect = 'refresh') => {
  Swal.fire({
    type: 'success',
    title: 'Succès',
    icon: 'success',
    showCancelButton: false,
    text: message,
    timer: 3000,
    timerProgressBar: true,
  }).then(() => {
    if (redirect === 'refresh') {
      window.location.reload(false)
    } else if (redirect !== null) {
      history.push(redirect)
    }
  })
}
