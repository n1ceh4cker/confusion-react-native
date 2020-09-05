import React, { Component } from 'react'
import { Card, Button, Icon } from 'react-native-elements'
import { Text } from 'react-native'
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer'

class Contact extends Component {
    sendMail(){
        MailComposer.composeAsync({
            recipients: ['niceakhtar21@gmail.com'],
            subject: 'Enquiry',
            body: 'To whom it may concern'
        })
    }
    render(){
        return (
            <Animatable.View animation='fadeInDown' duration={2000} delay={1000} >
                <Card title='Conatact Us'>
                    <Text style={{ margin: 10 }}>121, Clear Water Bay Road</Text>
                    <Text style={{ margin: 10 }}>Clear Water Bay, Kowloon</Text>
                    <Text style={{ margin: 10 }}>HONG KONG</Text>
                    <Text style={{ margin: 10 }}>Tel: +852 1234 5678</Text>
                    <Text style={{ margin: 10 }}>Fax: +852 8765 4321</Text>        
                    <Text style={{ margin: 10 }}>Email:confusion@food.net</Text>
                    <Button
                        title='Send Email'
                        buttonStyle={{ backgroundColor: '#512da8'}}
                        icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
                        onPress={this.sendMail}
                        />
                </Card>
            </Animatable.View>
        )
    }
}

export default Contact