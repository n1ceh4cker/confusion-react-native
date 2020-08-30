import React, { Component } from 'react'
import { DISHES } from '../shared/dishes'
import Menu from './MenuComponent'
import DishDetail from './DishDetailComponent'
import { View } from 'react-native'

export default class Main extends Component {
    state = {
        dishes: DISHES,
        selectedDish: null
    }
    onDishSelect = (dishId) => {
        this.setState({
            selectedDish: dishId
        })
    }
    render() {
        return (
            <View>
                <Menu dishes={this.state.dishes} onPress={this.onDishSelect}/>
                <DishDetail dish={this.state.dishes.filter(dish => dish.id === this.state.selectedDish)[0]} />
            </View>
            
        )
    }
}
