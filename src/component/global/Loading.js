import PropTypes from 'prop-types'
import React from 'react'

const Loading = props => {
  const { size } = props
  return (
    <div className={`preloader-wrapper ${size} active`}>
      <div className="spinner-layer spinner-blue-only">
        <div className="circle-clipper left">
          <div className="circle"></div>
        </div>
        <div className="gap-patch">
          <div className="circle"></div>
        </div>
        <div className="circle-clipper right">
          <div className="circle"></div>
        </div>
      </div>
    </div>
  )
}

Loading.propTypes = {
  size: PropTypes.string,
}

export default Loading
