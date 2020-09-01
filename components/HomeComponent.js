import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Card } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { baseUrl } from '../shared/baseUrl'

const mapStateToProps = (state) => ({
    dishes: state.dishes,
    promotions: state.promotions,
    leaders: state.leaders
})

const RenderCard = ({ item }) => {
    return(
        item!=null?
        <Card
            featuredTitle={item.name}
            featuredSubtitle={item.designation}
            image={{ uri: baseUrl+ item.image  }}>
                <Text style={{ margin:10 }}>{item.description}</Text>
        </Card>:
        <View></View>
    )
}
class Home extends Component {
    static navigationOptions = {
        title: 'Home'
    }
    render() {
        return (
            <ScrollView>
                <RenderCard item={this.props.dishes.dishes.filter(dish => dish.featured)[0]} />            
                <RenderCard item={this.props.promotions.promotions.filter(promotion => promotion.featured)[0]} />           
                <RenderCard item={this.props.leaders.leaders.filter(leader => leader.featured)[0]} />
            </ScrollView>
        )
    }
}
export default connect(mapStateToProps)(Home)