import M from 'materialize-css'
import moment from 'moment'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { i18n } from '../../config/datePickerConfig'

class DatePicker extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: true }
  }

  componentDidMount() {
    const { name, setDateSelected } = this.props
    M.Datepicker.init(document.getElementById(name), {
      autoClose: true,
      format: 'dd/mm/yyyy',
      selectMonth: true,
      firstDay: 1,
      i18n,
      onSelect: date => setDateSelected(moment(date).format()),
    })
  }

  render() {
    const { name, className } = this.props

    return (
      <div className={className}>
        <input
          name={name}
          type="text"
          id={name}
          className="datepicker"
          required
        />
        <label htmlFor={name}>Date limite</label>
      </div>
    )
  }
}

DatePicker.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  setDateSelected: PropTypes.func,
}

export default DatePicker
