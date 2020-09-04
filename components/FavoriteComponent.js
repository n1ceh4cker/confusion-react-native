import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FlatList } from 'react-native-gesture-handler'
import { ListItem } from 'react-native-elements'
import Loading from './LoadingComponent'
import { View } from 'react-native'
import { baseUrl } from '../shared/baseUrl'
import { deleteFavorite } from '../redux/ActionCreaters'
import Swipeout from 'react-native-swipeout'

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
                onPress: () => this.props.deleteFavorite(item.id)
            }]
            return(
            <Swipeout right={rightSwipe} autoClose={true}>
                <ListItem 
                    key={index}
                    title={item.name}
                    subtitle={item.description}
                    hideChevron={true}
                    leftAvatar={{source: {uri: baseUrl + item.image }}}
                    onPress={() => navigate('DishDetail', { dishId: item.id })}
                    />
            </Swipeout>
            )
        }
        if(dishes.isLoading) return <Loading />
        else if(dishes.errMsg) return <View><Text>{dishes.errMsg}</Text></View>
        else return (
            <FlatList
                data={dishes.dishes.filter(dish => favorites.some(e => e===dish.id))}
                renderItem={renderMenuItem}
                keyExtractor={item => item.id.toString()}
                />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites)