import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Card } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import { DISHES } from '../shared/dishes'
import { PROMOTIONS } from '../shared/promotions'
import { LEADERS } from '../shared/leaders'

const RenderCard = ({ item }) => {
    return(
        item!=null?
        <Card
            featuredTitle={item.name}
            featuredSubtitle={item.designation}
            image={require('./images/uthappizza.png')}>
                <Text style={{ margin:10 }}>{item.description}</Text>
        </Card>:
        <View></View>
    )
}
export default class Home extends Component {
    state = {
        dishes: DISHES,
        promotions: PROMOTIONS,
        leaders: LEADERS
    }
    static navigationOptions = {
        title: 'Home'
    }
    render() {
        return (
            <ScrollView>
                <RenderCard item={this.state.dishes.filter(dish => dish.featured)[0]} />            
                <RenderCard item={this.state.promotions.filter(promotion => promotion.featured)[0]} />           
                <RenderCard item={this.state.leaders.filter(leader => leader.featured)[0]} />
            </ScrollView>
        )
    }
}
