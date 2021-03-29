import React, { Component } from 'react'
import Aux from '../../hoc/Aux'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.2,
  meat: 1.3,
  bacon: 7
}

class BurgerBuilder extends Component {

  // constructor(props) {
  //   super(props)
  //   this.state = {...}
  // } using more *modern* method of state =

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    canPurchase: false
  }

  updatePurchaseState (ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey]
      })
      .reduce((sum, el) => {
        return sum + el
      }, 0)
      this.setState({canPurchase: sum > 0})
  }

addIngredientHandler = (type) => {
  const oldCount = this.state.ingredients[type]
  const updatedCount = oldCount + 1
  const updatedIngredients = {
    ...this.state.ingredients
  }
  updatedIngredients[type] = updatedCount
  const priceAddition = INGREDIENT_PRICES[type]
  const oldPrice = this.state.totalPrice
  const newPrice = oldPrice + priceAddition
  this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
  this.updatePurchaseState(updatedIngredients)
}

subIngredientHandler = (type) => {
  const oldCount = this.state.ingredients[type]
  if (oldCount <= 0) {
    return
  }
  const updatedCount = oldCount - 1
  const updatedIngredients = {
    ...this.state.ingredients
  }
  updatedIngredients[type] = updatedCount
  const priceSub = INGREDIENT_PRICES[type]
  const oldPrice = this.state.totalPrice
  const newPrice = oldPrice - priceSub
  this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
  this.updatePurchaseState(updatedIngredients)
}

  render () {
    const disabledInfo = {
      ...this.state.ingredients
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    return (
      <Aux>
      <Modal />
      <Burger ingredients={this.state.ingredients} />
        <BuildControls
        ingredientAdded={ this.addIngredientHandler }
        ingredientRemoved={ this.subIngredientHandler }
        disabled={disabledInfo}
        price={this.state.totalPrice}
        canPurchase={this.state.canPurchase}/>
      </Aux>
    )
  }
}

export default BurgerBuilder
