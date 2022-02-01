import React, { Component } from 'react'
import * as SecureStore from 'expo-secure-store'
import { View, StyleSheet } from 'react-native'
import { Input, CheckBox, Button, Icon, Image } from 'react-native-elements'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { ScrollView } from 'react-native-gesture-handler'
import { baseUrl } from '../shared/baseUrl'
import { Permissions } from 'react-native-unimodules'
import * as ImagePicker from 'expo-image-picker'
import { connect } from 'react-redux'
import { loginUser } from '../redux/ActionCreaters'
import { ToastAndroid } from 'react-native'
import { Text } from 'react-native'
import { globalStyles } from '../shared/globalStylesheet'

const mapStateToProps = (state) => ({

})
const mapDispatchToProps = (dispatch) => ({
    loginUser: (creds) => dispatch(loginUser(creds))
})
class LoginTab extends Component {
    state = {
        username: '',
        password: '',
    }
    static navigationOptions = {
        title: 'Login',
        tabBarIcon: ({ tintColor }) => (
            <Icon 
                name='sign-in'
                type='font-awesome'
                size={24}
                color={tintColor}
            />
        )
    }
    handleLogin = () => {
        console.log(JSON.stringify(this.state))
        this.props.loginUser({ username: this.state.username, password: this.state.password })
    }
    render() {
        return (
            <View style={styles.container} >
                <Input 
                    placeholder='Username  '
                    leftIcon={{ type: 'font-awesome', name: 'user'}}
                    onChangeText={username => this.setState({ username: username })}
                    value={this.state.username}
                    containerStyle={styles.formInput}
                    style={globalStyles.boldText}
                />
                <Input 
                    placeholder='Password  '
                    leftIcon={{ name: 'lock'}}
                    onChangeText={password => this.setState({ password: password} )}
                    value={this.state.password}
                    containerStyle={styles.formInput}
                    style={globalStyles.boldText}
                />
                
                <Button 
                    raised
                    onPress={this.handleLogin}
                    title='Login'
                    icon={
                        <Icon
                            name='sign-in'
                            type='font-awesome'
                            size={24}
                            color='white'
                        /> 
                    }
                    titleStyle={globalStyles.text}
                    buttonStyle={{ backgroundColor: '#512da8' }}
                    containerStyle={{ margin: 40 }}
                />
            
              
            </View>
        )
    }
}

class RegisterTab extends Component {
    state = {
        firstname: '',
        lastname: '',
        email: '',
        username: '',
        password: '',
        imageUrl: baseUrl + 'images/user-logo.png',
    }
    static navigationOptions = {
        title: 'Register',
        tabBarIcon: ({ tintColor }) => (
            <Icon 
                name='user-plus'
                type='font-awesome'
                size={24}
                color={tintColor}
            />
        )
    }
    getImageFromCamera = async () => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA)
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if(cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted'){
            let captureImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4,3]
            })
            if(!captureImage.cancelled){
                this.setState({ imageUrl: captureImage.uri })
            }
        }
    }
    getImageFromGallery = async () => {
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if(cameraRollPermission.status === 'granted'){
            let captureImage = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4,3]
            })
            if(!captureImage.cancelled){
                this.setState({ imageUrl: captureImage.uri })
            }
        }
    }
    handleRegister = () => {
        console.log(JSON.stringify(this.state))
        return fetch(baseUrl + 'users/signup', {
            method: 'POST',
            headers: { 
                'Content-Type':'application/json' 
            },
            body: JSON.stringify({ username: this.state.username, password: this.state.password, firstname: this.state.firstname, lastname: this.state.lastname, imageUrl: this.state.imageUrl })
        })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
            },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(response => {
            if (response.success) {
                ToastAndroid.show(response.status, ToastAndroid.LONG)
            }
            else {
                var error = new Error('Error ' + response.status);
                error.response = response;
                throw error;
            }
        })
        .catch(error => {throw error;})
    }
    render() {
        return (
            <ScrollView>
            <View style={styles.container} >
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: this.state.imageUrl }}
                        style={styles.image}
                    />
                    <Button 
                        raised
                        title='Camera' 
                        buttonStyle={{ backgroundColor: '#512da8' }}
                        titleStyle={globalStyles.boldText}
                        onPress={this.getImageFromCamera}
                        containerStyle={{ marginTop: 20 }}
                    />
                    <Button 
                        raised
                        title='Gallery' 
                        buttonStyle={{ backgroundColor: '#512da8' }}
                        titleStyle={globalStyles.boldText}    
                        onPress={this.getImageFromGallery}
                        containerStyle={{ marginTop: 20 }}
                    />        
                </View>
                <Text style={{ textAlign: 'center', color: '#666', ...globalStyles.boldText }}>Change profile image</Text>
                <Input 
                    placeholder='First Name  '
                    leftIcon={{ type: 'font-awesome', name: 'user-o'}}
                    onChangeText={firstname => this.setState({firstname:firstname })}
                    value={this.state.firstname}
                    containerStyle={styles.formInput}
                    style={globalStyles.boldText}
                />

                <Input 
                    placeholder='Last Name  '
                    leftIcon={{ type: 'font-awesome', name: 'user-o'}}
                    onChangeText={lastname => this.setState({ lastname: lastname })}
                    value={this.state.lastname}
                    containerStyle={styles.formInput}
                    style={globalStyles.boldText}
                />

                <Input 
                    placeholder='Email'
                    leftIcon={{ type: 'font-awesome', name: 'envelope'}}
                    onChangeText={email => this.setState({ email: email })}
                    value={this.state.email}
                    containerStyle={styles.formInput}
                    style={globalStyles.boldText}
                />
                <Input 
                    placeholder='Username  '
                    leftIcon={{ type: 'font-awesome', name: 'user'}}
                    onChangeText={username => this.setState({ username: username })}
                    value={this.state.username}
                    containerStyle={styles.formInput}
                    style={globalStyles.boldText}
                />
                
                <Input 
                    placeholder='Password  '
                    leftIcon={{ name: 'lock'}}
                    onChangeText={password => this.setState({ password: password} )}
                    value={this.state.password}
                    containerStyle={styles.formInput}
                    style={globalStyles.boldText}
                />

                <Button 
                    raised
                    onPress={this.handleRegister}
                    title='Register'
                    titleStyle={globalStyles.boldText}
                    icon={
                        <Icon
                            name='sign-in'
                            type='font-awesome'
                            size={24}
                            color='white'
                        /> 
                    }
                    buttonStyle={{ backgroundColor: '#512da8' }}
                    containerStyle={{ margin: 40 }}
                />
                  
            </View>
            </ScrollView>
        )
    }
}

const Login = createBottomTabNavigator({
    Login: connect(mapStateToProps,mapDispatchToProps)(LoginTab),
    Register: RegisterTab
},{
    tabBarOptions: {
        activeBackgroundColor: '#9575cd',
        inactiveBackgroundColor: '#d1c4e9',
        activeTintColor: 'white',
        inactiveTintColor: 'gray'
    }
})

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 20,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 40
    },
    formInput: {
        marginVertical: 5
    }
})

export default Login