import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Card } from 'react-native-elements'
import { DISHES } from '../shared/dishes'

function RenderDish({ dish }) {
    return dish!=null? 
        (
            <Card 
                featuredTitle={dish.name}
                image={require('./images/uthappizza.png')}
                >
                    <Text style={{ padding: 10 }}>{dish.description}</Text>
            </Card>
        ):
        (<View></View>)
    
}
class DishDetail extends Component {
    state = {
        dishes: DISHES
    }
    static navigationOptions = {
        title: 'Dish Details'
    }
    render(){
        const dishId = this.props.navigation.getParam('dishId', '')
        return (
            <RenderDish dish={this.state.dishes[+dishId]} />
        )
    }
}

export default DishDetail
