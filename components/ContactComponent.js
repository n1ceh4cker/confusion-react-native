import React, { Component } from 'react'
import { Card, Button, Icon } from 'react-native-elements'
import { Text } from 'react-native'
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer'
import { globalStyles } from '../shared/globalStylesheet';

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
                <Card title='Conatact Us' titleStyle={globalStyles.title} containerStyle={{ padding: 25  }}>
                    <Text style={{ marginBottom: 15 , ...globalStyles.text }}>121, Clear Water Bay Road</Text>
                    <Text style={{ marginBottom: 15 , ...globalStyles.text }}>Clear Water Bay, Kowloon</Text>
                    <Text style={{ marginBottom: 15 , ...globalStyles.text }}>HONG KONG</Text>
                    <Text style={{ marginBottom: 15 , ...globalStyles.text }}>Tel: +852 1234 5678</Text>
                    <Text style={{ marginBottom: 15 , ...globalStyles.text }}>Fax: +852 8765 4321</Text>        
                    <Text style={{ marginBottom: 25 , ...globalStyles.text }}>Email:confusion@food.net</Text>
                    <Button
                        raised
                        title='Send Email'
                        titleStyle={globalStyles.boldText}
                        buttonStyle={{ backgroundColor: '#512da8' }}
                        icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
                        onPress={this.sendMail}
                        />
                </Card>
            </Animatable.View>
        )
    }
}

export default Contact