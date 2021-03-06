import React, { Component } from 'react'
import Aux from '../../../hoc/Aux/Aux'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {
  // this could be functional component doesnt ned to be a class
  // was just testing component did update

  componentDidUpdate() {
    console.log('[OrderSummary] will update')
  }

  render () {

    const ingredientSummary = Object.keys(this.props.ingredients)
      .map(igKey => {
        return <li key={igKey}>
        <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
        </li>
      })

    return (
      <Aux>
        <h3> Your Order </h3>
        <p> a delicious burger with the following:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong> Total Price: {this.props.price.toFixed(2)} </strong></p>
        <p> Continue to Checkout? </p>
        <Button buttonType='Danger' clicked={this.props.cancelled}> Cancel </Button>
        <Button buttonType='Success' clicked={this.props.continue}> Continue </Button>

      </Aux>
    )
  }
}

export default OrderSummary
