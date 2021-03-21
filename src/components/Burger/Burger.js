import React from 'react'

import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    // gives an array of object keys, .map continues off this
    .map(igKey => {
    return [...Array(props.ingredients[igKey])].map((_, i) => {
      return <BurgerIngredient key={igKey + i} type={igKey} />
    })
    // constructs array with all (...) using JS Array() method
    // making an array of ingredients
  })
    .reduce((arr, el) => {
      return arr.concat(el)
    }, [])
    // reduce array into one array
    if (transformedIngredients.length === 0) {
      transformedIngredients = <p> Please start building a burger! </p>
    }

  return (
    <div className={classes.Burger}>
    <BurgerIngredient type="bread-top" />
    {transformedIngredients}
    <BurgerIngredient type="bread-bottom" />
    </div>
  )
}

export default burger
