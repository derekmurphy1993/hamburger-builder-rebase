import React, { Component } from 'react'

import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Aux/Aux'

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    }

    // should be put in componentWillMount or for future proof put in constructor
    // because child elements are gotten before this runs
    componentDidMount () {
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({error: null})
        return req
      })

      this.resInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({error: error})
      })
    }

    // lifecycle method to execute when component isnt required anymore
    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor)
      axios.interceptors.request.eject(this.resInterceptor)
    }

    errorConfimedHandler = () => {
      this.setState({error: null})
    }

    render (){
        return (
          <Aux>
            <Modal show={this.state.error}
                modalClosed={this.errorConfimedHandler}>
              { this.state.error ? this.state.error.message : null }
            </Modal>
          <WrappedComponent {...this.props} />
          </Aux>
        )
      }
    }
}

export default withErrorHandler
