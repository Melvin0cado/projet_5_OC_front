import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'

export default (ComposedComponent, roleAllowed) => {
  class Auth extends Component {
    constructor(props) {
      super(props)
      this.state = {
        isAuth: false,
        authorized: false,
      }
    }

    componentDidMount() {
      const { authenticated, history } = this.props
      if (!authenticated) {
        return history.push('/login')
      }
      this.AccessRole(roleAllowed)
    }

    componentDidUpdate() {
      const { authenticated, history } = this.props
      if (!authenticated) {
        return history.push('/login')
      }
    }

    AccessRole() {
      const { role } = this.props
      const mainRole = role[0]

      if (!roleAllowed) {
        return this.setState({ isAuth: true, authorized: true })
      }
      if (roleAllowed.includes(mainRole)) {
        return this.setState({ isAuth: true, authorized: true })
      }
      return this.setState({ isAuth: false, authorized: false })
    }

    render() {
      const { isAuth, authorized } = this.state
      if (isAuth && authorized) {
        return <ComposedComponent {...this.props} />
      }
      if (isAuth && !authorized) {
        return <Unauthorized />
      }
      return <LoadingPage size="big" />
    }
  }

  const Unauthorized = () => {
    return <div className="unauthorized">unauthorized</div>
  }

  const LoadingPage = () => {
    return (
      <div className="centerPage">
        <div className="preloader-wrapper big active">
          <div className="spinner-layer spinner-blue-only">
            <div className="circle-clipper left">
              <div className="circle" />
            </div>
            <div className="gap-patch">
              <div className="circle" />
            </div>
            <div className="circle-clipper right">
              <div className="circle" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  Auth.propTypes = {
    role: PropTypes.array,
    authenticated: PropTypes.bool,
    history: PropTypes.object,
  }

  const mapStateToProps = state => {
    return {
      authenticated: state.auth.authenticated,
      token: state.auth.token,
      role: state.auth.role,
    }
  }

  return connect(mapStateToProps)(Auth)
}
