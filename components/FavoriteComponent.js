import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FlatList } from 'react-native-gesture-handler'
import { ListItem } from 'react-native-elements'
import Loading from './LoadingComponent'
import { View } from 'react-native'
import { baseUrl } from '../shared/baseUrl'

const mapStateToProps = (state) => ({
    dishes: state.dishes,
    favorites: state.favorites
})
class Favorites extends Component {
    static navigationOptions = {
        title: 'My Favorites'
    }
    render() {
        const { dishes, favorites } = this.props
        const { navigate } = this.props.navigation
        const renderMenuItem = ({ item, index }) => (
            <ListItem 
                key={index}
                title={item.name}
                subtitle={item.description}
                hideChevron={true}
                leftAvatar={{source: {uri: baseUrl + item.image }}}
                onPress={() => navigate('DishDetail', { dishId: item.id })}
                />
        )
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

export default connect(mapStateToProps)(Favorites)