import React, { Component } from 'react' 
import Menu from './MenuComponent'
import DishDetail from './DishDetailComponent'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

const MenuNavigator = createAppContainer(createStackNavigator(
    {
        Menu: { screen: Menu },
        DishDetail: { screen: DishDetail }
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#512da8'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }))

export default class Main extends Component {
    render() {
        return (
            <MenuNavigator />  
        )
    }
}
