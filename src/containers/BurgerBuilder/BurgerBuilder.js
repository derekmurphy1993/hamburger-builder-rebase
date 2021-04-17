import React, { Component } from 'react'
import Aux from '../../hoc/Aux/Aux'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
// this will use our personalized axios instance from the file
import axios from '../../axios-orders'

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
    ingredients: null,
    totalPrice: 4,
    canPurchase: false,
    purchasing: false,
    loading: false,
    error: false
  }

  // componentDidMount good for fetching data
  componentDidMount () {
    axios.get('https://reacttutorial-f9977-default-rtdb.firebaseio.com/ingredients.json')
      .then(res => {
        this.setState({ ingredients: res.data })
      })
      .catch( error => {
        this.setState({error: true})
      })
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

purchaseHandler = () => {
  this.setState({purchasing: true})
}

purchaseCancelHandler = () => {
  this.setState({purchasing: false})
}

purchaseContinueHandler = () => {
  this.setState( { loading: true } )
  // alert('you continue!')
  //this is a sample, in reality price should be calc on backend
  const order ={
    ingredients: this.state.ingredients,
    price: this.state.totalPrice,
    customer: {
      name: "Danny Dog",
      address: {
        street: 'yehaw ave',
        zipCode: '10001',
        country: 'USA'
      },
      email: 'test@test'
    },
    deliveryMethod: 'ASAP'
  }

  // .json is firebase specific, would just be orders w other hosts
  axios.post('/orders.json', order)
  .then(res => {
      this.setState({ loading: false, purchasing: false })
    })
  .catch(error => {
        this.setState({ loading: false, purchasing: false })
      })
}

  render () {
    const disabledInfo = {
      ...this.state.ingredients
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null
    if (this.state.loading) {
      orderSummary = <Spinner />
    }
    let burger = this.state.error ? <p>Ingredients Cant Be Loaded! System Error</p> : <Spinner />
    if (this.state.ingredients) {
    burger = (
      <Aux>
      <Burger ingredients={this.state.ingredients} />
      <BuildControls
      ingredientAdded={ this.addIngredientHandler }
      ingredientRemoved={ this.subIngredientHandler }
      ordered={ this.purchaseHandler }
      disabled={disabledInfo}
      price={this.state.totalPrice}
      canPurchase={this.state.canPurchase}/>
      </Aux>)

      orderSummary = <OrderSummary
          ingredients={this.state.ingredients}
          cancelled={this.purchaseCancelHandler}
          continue={this.purchaseContinueHandler}
          price={this.state.totalPrice}/>
    }

    return (
      <Aux>
      <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
        {orderSummary}
      </Modal>
        {burger}
      </Aux>
    )
  }
}

export default withErrorHandler(BurgerBuilder, axios)
