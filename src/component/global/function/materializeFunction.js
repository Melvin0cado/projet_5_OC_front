import M from 'materialize-css'

export const clearInput = () => {
  document.querySelectorAll('input').forEach(input => {
    input.value = ''
  })
  M.updateTextFields()
}
