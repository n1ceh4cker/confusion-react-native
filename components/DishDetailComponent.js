import React from 'react'
import { View, Text } from 'react-native'
import { Card } from 'react-native-elements'

function RenderDish({ dish }) {
    return dish!=null? 
        (
            <Card 
                featuredTitle={dish.name}
                image={require('./images/uthappizza.png')}
                >
                    <Text style={{ padding: 10 }}>{dish.description}</Text>
            </Card>
        ):
        (<View></View>)
    
}
function DishDetail({ dish }) {
    return (
        <RenderDish dish={dish} />
    )
}

export default DishDetail
