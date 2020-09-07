import React, { Component } from 'react'
import Home from './HomeComponent' 
import Menu from './MenuComponent'
import DishDetail from './DishDetailComponent'
import About from './AboutComponent'
import Contact from './ContactComponent'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer'
import { StyleSheet, SafeAreaView, View, Image, Text, ToastAndroid } from 'react-native'
import { Icon } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { fetchDishes, fetchPromos, fetchLeaders, fetchComments } from '../redux/ActionCreaters'
import Reservation from './ReservationComponent'
import Favorites from './FavoriteComponent'
import Login from './LoginComponent'
import NetInfo from '@react-native-community/netinfo'

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),
    fetchComments: () => dispatch(fetchComments())
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
        headerTitleStyle: {
            color: '#fff'
        },
        headerLeft: <Icon name='menu' size={24}
                    color='white'
                    containerStyle={{paddingLeft: 10}}
                    onPress={() => navigation.toggleDrawer()}
                    />
    })
})

const LoginNavigator = createStackNavigator(
    {
        Login: { screen: Login },
    },
    {
    defaultNavigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#512da8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        },
        headerLeft: <Icon name='menu' size={24}
                    color='white'
                    containerStyle={{paddingLeft: 10}}
                    onPress={() => navigation.toggleDrawer()}
                    />
    })
})

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
            headerTitleStyle: {
                color: '#fff'
            }
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
        headerTitleStyle: {
            color: '#fff'
        },
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
        headerTitleStyle: {
            color: '#fff'
        },
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
        headerTitleStyle: {
            color: '#fff'
        },
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
        headerTitleStyle: {
            color: '#fff'
        },
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
                    <Image source={require('./images/logo.png')} style={styles.drawerImage} />
                </View>
                <View style={{flex: 2}}>
                    <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
                </View>
            </View>
            <DrawerItems {...props} />
        </SafeAreaView>
    </ScrollView>
) 
const MainNavigator = createAppContainer(createDrawerNavigator({
    Login: {
        screen: LoginNavigator,
        navigationOptions: {
            title: 'Login',
            drawerLabel: 'Login',
            drawerIcon: ({ tintColor }) => (
                <Icon 
                    name='sign-in'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        }
    },
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
        contentComponent: CustomDrawerContent
    }
))

class Main extends Component {
    componentDidMount() {
        this.props.fetchDishes()
        this.props.fetchPromos()
        this.props.fetchLeaders()
        this.props.fetchComments()
        NetInfo.fetch()
            .then(connectionInfo => {
                ToastAndroid.show('Initial Network Connection: ' + connectionInfo.type, ToastAndroid.LONG)
                NetInfo.addEventListener(this.handleConnectivityChange)
            })
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
        return (
            <MainNavigator />  
        )
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
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)