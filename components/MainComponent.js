import React, { Component } from 'react'
import Home from './HomeComponent' 
import Menu from './MenuComponent'
import DishDetail from './DishDetailComponent'
import About from './AboutComponent'
import Contact from './ContactComponent'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'

const HomeNavigator = createStackNavigator(
    {
        Home: { screen: Home },
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
})

const MenuNavigator = createStackNavigator(
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
})
const AboutNavigator = createStackNavigator(
    {
        About: { screen: About },
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
})
const ContactNavigator = createStackNavigator(
    {
        Contact: { screen: Contact },
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
})
const MainNavigator = createAppContainer(createDrawerNavigator({
    Home: {
        screen: HomeNavigator,
        navigationOptions: {
            title: 'Home',
            drawerLabel: 'Home'
        }
    },
    About: {
        screen: AboutNavigator,
        navigationOptions: {
            title: 'About',
            drawerLabel: 'About Us'
        }
    },
    Menu: {
        screen: MenuNavigator,
        navigationOptions: {
            title: 'Menu',
            drawerLabel: 'Menu'
        }
    },
    Contact: {
        screen: ContactNavigator,
        navigationOptions: {
            title: 'Contact',
            drawerLabel: 'Contact Us'
        }
    }},
    {
        drawerBackgroundColor: '#d1c4e9'
    }
))

export default class Main extends Component {
    render() {
        return (
            <MainNavigator />  
        )
    }
}
