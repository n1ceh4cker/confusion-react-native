import React, { Component } from 'react'
import Home from './HomeComponent' 
import Menu from './MenuComponent'
import DishDetail from './DishDetailComponent'
import About from './AboutComponent'
import Contact from './ContactComponent'
import Loading from './LoadingComponent'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer'
import { StyleSheet, SafeAreaView, View, Image, Text, ToastAndroid } from 'react-native'
import { Icon } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { fetchDishes, fetchPromos, fetchLeaders, fetchComments, requestLogin, receiveLogin, logoutUser, fetchFavorites } from '../redux/ActionCreaters'
import Reservation from './ReservationComponent'
import Favorites from './FavoriteComponent'
import Login from './LoginComponent'
import NetInfo from '@react-native-community/netinfo'
import * as SecureStore from 'expo-secure-store';
import { TouchableOpacity } from 'react-native'
import { globalStyles } from '../shared/globalStylesheet'

const mapStateToProps = (state) => ({
    auth: state.auth
})

const mapDispatchToProps = (dispatch) => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),
    fetchComments: () => dispatch(fetchComments()),
    fetchFavorites: () => dispatch(fetchFavorites()),
    requestLogin: (creds) => dispatch(requestLogin(creds)),
    receiveLogin: (res) => dispatch(receiveLogin(res)),
    logoutUser: () => dispatch(logoutUser())
})
const HomeNavigator = createStackNavigator(
    {
        Home: { screen: Home },
    },
    {
    defaultNavigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#512da8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: globalStyles.subtitle,
        headerLeft: <Icon name='menu' size={24}
                    color='white'
                    containerStyle={{paddingLeft: 10}}
                    onPress={() => navigation.toggleDrawer()}
                    />
    })
})

const LoginNavigator = createAppContainer(createStackNavigator(
    {
        Login: { screen: Login },
    },
    {
    defaultNavigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#512da8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: globalStyles.subtitle,
        headerLeft: <Icon name='lock' size={24}
                    color='white'
                    containerStyle={{paddingLeft: 10}}
                    />
    })
}))

const MenuNavigator = createStackNavigator(
    {
        Menu: { screen: Menu ,
            navigationOptions: ({ navigation }) => ({
                headerLeft: <Icon name='menu' size={24}
                    color='white'
                    containerStyle={{paddingLeft: 10}}
                    onPress={() => navigation.toggleDrawer()}
                    />
            })
        },
        DishDetail: { screen: DishDetail }
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#512da8'
            },
            headerTintColor: '#fff',
            headerTitleStyle: globalStyles.subtitle,
        }
})
const AboutNavigator = createStackNavigator(
    {
        About: { screen: About },
    },
    {
    defaultNavigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#512da8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: globalStyles.subtitle,
        headerLeft: <Icon name='menu' size={24}
                    color='white'
                    containerStyle={{paddingLeft: 10}}
                    onPress={() => navigation.toggleDrawer()}
                    />
    })
})
const ContactNavigator = createStackNavigator(
    {
        Contact: { screen: Contact },
    },
    {
    defaultNavigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#512da8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: globalStyles.subtitle,
        headerLeft: <Icon name='menu' size={24}
                    color='white'
                    containerStyle={{paddingLeft: 10}}
                    onPress={() => navigation.toggleDrawer()}
                    />
    })
})
const FavoriteNavigator = createStackNavigator(
    {
        Favorites: { screen: Favorites },
    },
    {
    defaultNavigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#512da8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: globalStyles.subtitle,
        headerLeft: <Icon name='menu' size={24}
                    color='white'
                    containerStyle={{paddingLeft: 10}}
                    onPress={() => navigation.toggleDrawer()}
                    />
    })
})
const ReservationNavigator = createStackNavigator(
    {
        Reservation: { screen: Reservation },
    },
    {
    defaultNavigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#512da8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: globalStyles.subtitle,
        headerLeft: <Icon name='menu' size={24}
                    color='white'
                    containerStyle={{paddingLeft: 10}}
                    onPress={() => navigation.toggleDrawer()}
                    />
    })
})
const CustomDrawerContent = (props) => (
    <ScrollView>
        <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never'}}>
            <View style={styles.drawerHeader}>
                <View style={{flex: 1}}>
                    <Image source={require('../assets/images/logo.png')} style={styles.drawerImage} />
                </View>
                <View style={{flex: 2}}>
                <Text style={{ ...globalStyles.title, color: "#eee"}}>Ristorante Con Fusion</Text>
                </View>
            </View>
            <DrawerItems {...props} labelStyle={globalStyles.subtitle} />
            <TouchableOpacity onPress={props.logoutUser} style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
                <Icon name='sign-out' type='font-awesome' size={28} color='#666'/>
                <Text style={{ ...globalStyles.subtitle, marginLeft: 30}}>Logout</Text>
            </TouchableOpacity>
        </SafeAreaView>
    </ScrollView>
) 
const MainNavigator = createAppContainer(createDrawerNavigator({
    Home: {
        screen: HomeNavigator,
        navigationOptions: {
            title: 'Home',
            drawerLabel: 'Home',
            drawerIcon: ({ tintColor }) => (
                <Icon 
                    name='home'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        }
    },
    About: {
        screen: AboutNavigator,
        navigationOptions: {
            title: 'About',
            drawerLabel: 'About Us',
            drawerIcon: ({ tintColor }) => (
                <Icon 
                    name='info-circle'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        }
    },
    Menu: {
        screen: MenuNavigator,
        navigationOptions: {
            title: 'Menu',
            drawerLabel: 'Menu',
            drawerIcon: ({ tintColor }) => (
                <Icon 
                    name='list'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        }
    },
    Contact: {
        screen: ContactNavigator,
        navigationOptions: {
            title: 'Contact',
            drawerLabel: 'Contact Us',
            drawerIcon: ({ tintColor }) => (
                <Icon 
                    name='address-card'
                    type='font-awesome'
                    size={22}
                    color={tintColor}
                />
            )
        }
    },
    Favorites: {
        screen: FavoriteNavigator,
        navigationOptions: {
            title: 'My Favorites',
            drawerLabel: 'My Favorites',
            drawerIcon: ({ tintColor }) => (
                <Icon 
                    name='heart'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        }
    },
    Reservation: {
        screen: ReservationNavigator,
        navigationOptions: {
            title: 'Reserve Table',
            drawerLabel: 'Reserve Table',
            drawerIcon: ({ tintColor }) => (
                <Icon 
                    name='cutlery'
                    type='font-awesome'
                    size={22}
                    color={tintColor}
                />
            )
        }
    }},
    {
        drawerBackgroundColor: '#d1c4e9',
        initialRouteName: 'Home',
        contentComponent: connect(mapStateToProps, mapDispatchToProps)(CustomDrawerContent)
    }
))

class Main extends Component {
    componentDidMount() {
        this.props.fetchDishes()
        this.props.fetchPromos()
        this.props.fetchLeaders()
        this.props.fetchComments()
        this.getItems()
        NetInfo.fetch()
            .then(connectionInfo => {
                ToastAndroid.show('Initial Network Connection: ' + connectionInfo.type, ToastAndroid.LONG)
                NetInfo.addEventListener(this.handleConnectivityChange)
            })
    }
    getItems = async () => {
        const c = await SecureStore.getItemAsync('creds');
        const creds = c ? JSON.parse(c) : null;
        const token = await SecureStore.getItemAsync('token');
        const res = { token };
        console.log(creds)
        console.log(token)
        if (creds && token) {
            console.log('i was')
            this.props.requestLogin(creds);
            this.props.receiveLogin(res);
            this.props.fetchFavorites();
        }
    }
    handleConnectivityChange = (connectionInfo) => {
        switch (connectionInfo.type) {
            case 'none':
                ToastAndroid.show('You are now offline', ToastAndroid.LONG)
                break
            case 'wifi':
                ToastAndroid.show('You are now connected to wifi', ToastAndroid.LONG)
                break
            case 'cellular':
                ToastAndroid.show('You are now connected to cellular', ToastAndroid.LONG)
                break
            case 'unknown':
                ToastAndroid.show('You have now unknown connection', ToastAndroid.LONG)
                break
            default:
                break
        }
    }
    render() {
        if (this.props.auth.isLoading) {
            return (
                <Loading />
            )
        }         
        else if (this.props.auth.isAuthenticated) {
            return (
                <MainNavigator />  
            )
        }               
        else {
            return (
                <LoginNavigator />
            )
        }        
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    drawerHeader: {
        backgroundColor: '#512da8',
        height: 140,
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        flexDirection: "row"
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)