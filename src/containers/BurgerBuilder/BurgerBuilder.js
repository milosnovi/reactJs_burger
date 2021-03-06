import React, {Component} from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    // constructor(props) {
    //   super(props);
    //
    // }

    state = {
      ingredients: {
        salad: 1,
        bacon: 0,
        cheese: 0,
        meat: 2
      },
      totalPrice: 4,
      purchasable: true,
      purchasing: false
    };

    addIngredientHandler = (type) => {
      const oldCount = this.state.ingredients[type];
      const updateCount = oldCount + 1;
      const updateIngredients = {
        ...this.state.ingredients
      }
      updateIngredients[type] = updateCount;

      const priceAddition = PRICE[type];
      const oldPrice = this.state.totalPrice;

      const newPrice = oldPrice + priceAddition;

      this.setState({
        totalPrice: newPrice,
        ingredients:updateIngredients
      });

      this.updatePurchaseState(updateIngredients);
    }

    removeIngredientHandler = (type) => {
      const oldCount = this.state.ingredients[type];
      const oldPrice = this.state.totatPrice;

      if(oldCount <= 0) {
        return;
      }
      const updateCount = oldCount - 1;
      const updateIngredients = {
        ...this.state.ingredients
      }
      updateIngredients[type] = updateCount;

      const priceDeduction = PRICE[type];
      const newPrice = oldPrice - priceDeduction;

      this.setState({
        totalPrice: newPrice,
        ingredients:updateIngredients
      });

      this.updatePurchaseState(updateIngredients);
    }

    updatePurchaseState(ingredients) {
      const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey]
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

      this.setState({ purchasable: sum > 0 });
    }

    purchaseHandler = () => {
      this.setState({
        purchasing:true
      });
    }

    render() {
      const disabledInfo = {
        ...this.state.ingredients
      };
      for(let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
      }

      return(
        <Aux>
          <Modal show={this.state.purchasing}>
            <OrderSummary ingredients={this.state.ingredients} />
          </Modal>
          <Burger
            ingredients={this.state.ingredients}
            />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
    }
}

export default BurgerBuilder;
