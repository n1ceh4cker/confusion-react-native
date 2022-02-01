import React, { Component } from 'react'
import { Tile } from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'
import Loading from './LoadingComponent'
import * as Animatable from 'react-native-animatable';
import { globalStyles } from '../shared/globalStylesheet'

const mapStateToProps = (state) => ({
    dishes: state.dishes,
})

class Menu extends Component {
    static navigationOptions = {
        title: 'Menu'
    }
    render(){
        const { navigate } = this.props.navigation
        const { dishes, isLoading, errMsg } = this.props.dishes
        const renderMenuItem = ({ item , index}) => {
            return(
                <Animatable.View animation='fadeInRightBig' duration={2000}>
                    <Tile
                        key={index}
                        title={item.name}
                        caption={item.description}
                        titleStyle={globalStyles.title}
                        captionStyle={globalStyles.text}
                        featured
                        onPress={() => navigate('DishDetail', { dishId: item._id })}
                        imageSrc={{ uri: item.image }}
                        />
                </Animatable.View>
            )
        }
        if(isLoading) return <Loading />
        else if(errMsg) return <View><Text>{errMsg}</Text></View>
        else
        return (

                <FlatList 
                data={dishes}
                renderItem={renderMenuItem}
                keyExtractor={(item) => item._id.toString()}
                />        
        )
    }
}

export default connect(mapStateToProps)(Menu)
