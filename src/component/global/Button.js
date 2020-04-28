import PropsType from 'prop-types'
import React from 'react'

const Button = props => {
  const { type, text, disabled, onClick } = props

  return (
    <button
      type={type}
      className="btn waves-effect waves-light"
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

Button.propTypes = {
  type: PropsType.string.isRequired,
  text: PropsType.string.isRequired,
  disabled: PropsType.bool,
  onClick: PropsType.func.isRequired,
}

Button.defaultProps = {
  disabled: null,
}

export default Button
