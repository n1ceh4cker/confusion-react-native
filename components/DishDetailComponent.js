import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Card, Icon } from 'react-native-elements'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { baseUrl } from '../shared/baseUrl'
import { postFavorites } from '../redux/ActionCreaters'

const mapStateToProps = (state) => ({
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites
})

const mapDispatchToProps = (dispatch) => ({
    postFavorites: (dishId) => dispatch(postFavorites(dishId))
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

function RenderDish({ dish, favorite , onPress}) {
    return dish!=null? 
        (
            <Card 
                featuredTitle={dish.name}
                image={{ uri: baseUrl + dish.image }}>
                <Text style={{ padding: 10 }}>{dish.description}</Text>
                <Icon
                    raised
                    reverse
                    name={favorite ? 'heart':'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    onPress={() => favorite ? console.log('already favorite') : onPress()}
                />
            </Card>
        ):
        (<View></View>)
    
}
class DishDetail extends Component {
    static navigationOptions = {
        title: 'Dish Details'
    }
    render(){
        const dishId = this.props.navigation.getParam('dishId', '')
        return (
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]} 
                    favorite={this.props.favorites.some(e => e === dishId)}
                    onPress={() => this.props.postFavorites(dishId)}
                />
                <RenderComments comments={this.props.comments.comments.filter(comment => comment.dishId===dishId)} />
            </ScrollView>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail)
