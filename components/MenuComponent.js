import React from 'react'
import { ListItem } from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler'
import { View } from 'react-native'

function Menu({ dishes }) {
    const renderMenuItem = ({ item }) => {
        return(
            <ListItem
                title={item.name}
                subtitle={item.description}
                hideChevron={true}
                leftAvatar={{ source: require('./images/uthappizza.png')}}
                />
        )
    }
    return (

            <FlatList 
            data={dishes}
            renderItem={renderMenuItem}
            keyExtractor={item => item.id.toString()}
            />        
    )
}

export default Menu
