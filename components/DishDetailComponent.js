import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Card, Icon } from 'react-native-elements'
import { DISHES } from '../shared/dishes'
import { COMMENTS } from '../shared/comments'
import { FlatList, ScrollView } from 'react-native-gesture-handler'

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
                image={require('./images/uthappizza.png')}
            >
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
        dishes: DISHES,
        comments: COMMENTS,
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
                <RenderDish dish={this.state.dishes[+dishId]} 
                    favourite={this.state.favourites.some(e => e === dishId)}
                    onPress={() => this.markFavourite(dishId)}
                />
                <RenderComments comments={this.state.comments.filter(comment => comment.id===dishId)} />
            </ScrollView>
        )
    }
}

export default DishDetail
