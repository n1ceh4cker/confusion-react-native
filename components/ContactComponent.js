import React, { Component } from 'react'
import { Card } from 'react-native-elements'
import { Text } from 'react-native'
import * as Animatable from 'react-native-animatable';

class Contact extends Component {
    render(){
        return (
            <Animatable.View animation='fadeInDown' duration={2000} delay={1000} >
                <Card title='Conatact Us'>
                    <Text>121, Clear Water Bay Road</Text>
                    <Text>Clear Water Bay, Kowloon</Text>
                    <Text>HONG KONG</Text>
                    <Text>Tel: +852 1234 5678</Text>
                    <Text>Fax: +852 8765 4321</Text>        
                    <Text>Email:confusion@food.net</Text>
                </Card>
            </Animatable.View>
        )
    }
}

export default Contact