import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Card, Icon } from 'react-native-elements'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { baseUrl } from '../shared/baseUrl'

const mapStateToProps = (state) => ({
    dishes: state.dishes,
    comments: state.comments,
})

function RenderComments({comments }){
    const renderCommentItem = ({ item, index }) => {
        return(
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Star</Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date}</Text>
            </View>
        )
    }
    return(
        <Card title='Comments'>
            <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
            />
        </Card>
    )
}

function RenderDish({ dish, favourite , onPress}) {
    return dish!=null? 
        (
            <Card 
                featuredTitle={dish.name}
                image={{ uri: baseUrl + dish.image }}>
                <Text style={{ padding: 10 }}>{dish.description}</Text>
                <Icon
                    raised
                    reverse
                    name={favourite ? 'heart':'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    onPress={() => favourite ? console.log('already favorite') : onPress()}
                />
            </Card>
        ):
        (<View></View>)
    
}
class DishDetail extends Component {
    state = {
        favourites: []
    }
    static navigationOptions = {
        title: 'Dish Details'
    }
    markFavourite = (dishId) => {
        this.setState({
            favourites : [...this.state.favourites, dishId]
        })
    }
    render(){
        const dishId = this.props.navigation.getParam('dishId', '')
        return (
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]} 
                    favourite={this.state.favourites.some(e => e === dishId)}
                    onPress={() => this.markFavourite(dishId)}
                />
                <RenderComments comments={this.props.comments.comments.filter(comment => comment.dishId===dishId)} />
            </ScrollView>
        )
    }
}

export default connect(mapStateToProps)(DishDetail)
