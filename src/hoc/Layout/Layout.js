import React, { Component } from 'react'

import classes from './Layout.module.css'
import Toolbar from '../../components/Nav/Toolbar/Toolbar'
import SideDrawer from '../../components/Nav/SideDrawer/SideDrawer'

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false})
  }

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return {showSideDrawer: !prevState.showSideDrawer}
    } )
  }

  render () {
    return (
      <div>
      <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
      <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
      <main className={classes.Content}>
      { this.props.children }
      </main>
      </div>
    )
  }
}

export default Layout;
