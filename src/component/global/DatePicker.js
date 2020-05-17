import M from 'materialize-css'
import moment from 'moment'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { i18n } from '../../config/datePickerConfig'

class DatePicker extends Component {
  constructor(props) {
    super(props)
    this.init = this.init.bind(this)
  }

  componentDidMount() {
    this.init()
  }

  componentDidUpdate(prevProps) {
    const { defaultValue } = this.props

    if (prevProps.defaultValue !== defaultValue) {
      this.init()
    }
  }

  init() {
    const { id, setDateSelected, defaultValue } = this.props

    M.Datepicker.init(document.getElementById(id), {
      autoClose: true,
      format: 'dd/mm/yyyy',
      selectMonth: true,
      defaultDate: new Date(moment(defaultValue).format()),
      setDefaultDate: true,
      minDate: new Date(moment().day(1).format()),
      firstDay: 1,
      i18n,
      onSelect: date => setDateSelected(moment(date).format()),
    })
  }

  render() {
    const { id, name, className, defaultValue } = this.props
    return (
      <div className={className}>
        <input
          name={name}
          type="text"
          id={id}
          defaultValue={
            defaultValue !== '' ? moment(defaultValue).format('DD/MM/YYYY') : ''
          }
          className="datepicker"
          placeholder="DD/MM/AAAA"
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
  id: PropTypes.string,
  defaultValue: PropTypes.string,
}

export default DatePicker
