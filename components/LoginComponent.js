import React, { Component } from 'react'
import * as SecureStore from 'expo-secure-store'
import { View, Button, StyleSheet } from 'react-native'
import { Input, CheckBox } from 'react-native-elements'

export default class Login extends Component {
    state = {
        username: '',
        password: '',
        remember: false
    }
    componentDidMount = () => {
        SecureStore.getItemAsync('userinfo')
            .then(userdata => {
                let userinfo = JSON.parse(userdata)
                if(userinfo){
                    this.setState({
                        username: userinfo.username,
                        password: userinfo.password,
                        remember: true
                    })
                }
            })
    }
    static navigationOptions = {
        title: 'Login'
    }
    handleLogin = () => {
        console.log(JSON.stringify(this.state))
        if(this.state.remember){
            SecureStore.setItemAsync('userinfo', JSON.stringify({ username: this.state.username, password: this.state.password }))
                .catch(error => console.log('Could not save user'))
        }else{
            SecureStore.deleteItemAsync('userinfo')
                .catch(error => console.log('Could not delete user'))
        }
    }
    render() {
        return (
            <View style={styles.container} >
                <Input 
                    placeholder='Username'
                    leftIcon={{ type: 'font-awesome', name: 'user-o'}}
                    onChangeText={username => this.setState({ username: username })}
                    value={this.state.username}
                    containerStyle={styles.formInput}
                />
                <Input 
                    placeholder='Password'
                    leftIcon={{ type: 'font-awesome', name: 'key'}}
                    onChangeText={password => this.setState({ password: password} )}
                    value={this.state.password}
                    containerStyle={styles.formInput}
                />
                <CheckBox 
                    title='Remember Me'
                    center
                    checked={this.state.remember}
                    onPress={() => this.setState({ remember: !this.state.remember })}
                    containerStyle={styles.formCheck}
                />
                <View style={styles.formBtn} >
                    <Button 
                        onPress={this.handleLogin}
                        title='Login'
                        color='#512da8'
                    />
                </View>    
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20
    },
    formInput: {
        margin: 40
    },
    formCheck: {
        margin: 40,
        backgroundColor: null
    },
    formBtn: {
        margin: 60
    }
})