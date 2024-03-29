import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FlatList } from 'react-native-gesture-handler'
import { ListItem } from 'react-native-elements'
import Loading from './LoadingComponent'
import { View, Alert } from 'react-native'
import { deleteFavorite } from '../redux/ActionCreaters'
import Swipeout from 'react-native-swipeout'
import * as Animatable from 'react-native-animatable';
import { globalStyles } from '../shared/globalStylesheet'

const mapStateToProps = (state) => ({
    dishes: state.dishes,
    favorites: state.favorites
})

const mapDispatchToProps = (dispatch) => ({
    deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId))
})

class Favorites extends Component {
    static navigationOptions = {
        title: 'My Favorites'
    }
    render() {
        const { dishes, favorites } = this.props
        const { navigate } = this.props.navigation
        const renderMenuItem = ({ item, index }) => {
            const rightSwipe = [{
                text: 'Delete',
                type: 'delete',
                onPress: () => {
                    Alert.alert(
                        'Delete Favorite?',
                        'Are you sure you want to delete ' + item.name + ' from favorites?',
                        [
                            {
                                text: 'Cancel',
                                style: 'cancel',
                                onPress: () => console.log(item.name + ' not deleted from favorite!')
                            },
                            {
                                text: 'OK',
                                onPress: () => this.props.deleteFavorite(item._id)
                            }
                        ],
                        { cancelable: false }
                    )
                }
            }]
            return(
            <Swipeout right={rightSwipe} autoClose={true}>
                <Animatable.View animation='fadeInRightBig' duration={2000}>
                    <ListItem 
                        key={index}
                        title={item.name}
                        subtitle={item.description}
                        titleStyle={globalStyles.subtitle}
                        subtitleStyle={globalStyles.text}
                        hideChevron={true}
                        leftAvatar={{source: {uri:  item.image }, size:60}}
                        onPress={() => navigate('DishDetail', { dishId: item._id })}
                        />
                </Animatable.View>
            </Swipeout>
            )
        }
        if(dishes.isLoading) return <Loading />
        else if(dishes.errMsg) return <View><Text>{dishes.errMsg}</Text></View>
        else return (
            <FlatList
                data={dishes.dishes.filter(dish => favorites.favorites.some(e => e._id===dish._id))}
                renderItem={renderMenuItem}
                keyExtractor={item => item._id.toString()}
                />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites)