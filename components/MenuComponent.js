import React, { Component } from 'react'
import { ListItem } from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler'
import { View } from 'react-native'
import { DISHES } from '../shared/dishes'

class Menu extends Component {
    state = {
        dishes: DISHES
    }
    static navigationOptions = {
        title: 'Menu'
    }
    render(){
        const { navigate } = this.props.navigation
        const renderMenuItem = ({ item }) => {
            return(
                <ListItem
                    title={item.name}
                    subtitle={item.description}
                    hideChevron={true}
                    onPress={() => navigate('DishDetail', { dishId: item.id })}
                    leftAvatar={{ source: require('./images/uthappizza.png')}}
                    />
            )
        }
        return (

                <FlatList 
                data={this.state.dishes}
                renderItem={renderMenuItem}
                keyExtractor={item => item.id.toString()}
                />        
        )
    }
}

export default Menu
