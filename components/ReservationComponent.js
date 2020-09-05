import React, { Component } from 'react'
import { ScrollView, Switch } from 'react-native-gesture-handler'
import { StyleSheet, View, Text, Picker, Button, Modal, Alert } from 'react-native'
import DatePicker from 'react-native-datepicker'
import * as Animatable from 'react-native-animatable';
import { Permissions } from 'react-native-unimodules';
import { Notifications } from 'expo';

export default class Reservation extends Component {
    static navigationOptions = {
        title: 'Reserve Table'
    }
    state = {
        guests: 1,
        smoking: false,
        date: '',
    }
    handleSubmit = () => {
        Alert.alert(
            'Your Reservation OK?',
            `Number of Guests: ${this.state.guests} \nSmoking? ${this.state.smoking ? 'Yes' : 'No'} \nDate: ${this.state.date}`,
            [
                {text: 'Cancel', onPress: () => this.resetForm(), style:'cancel'},
                {text: 'OK', onPress: () => this.resetForm()}
            ],
            { cancelable: false }
        )
    }
    resetForm = () => {
        this.setState({
            guests: 1,
            smoking: false,
            date: '',
            showModal: false
        })
    }
    async obtainNotificationPermission(){
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS)
        if(permission.status!=='granted'){
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS)
            if(permission.status!=='granted'){
                Alert.alert('Permission not granted to show status')
            }
        }
        return permission
    }
    async presentLocalNotification(date){
        await this.obtainNotificationPermission()
        Notifications.presentLocalNotificationAsync({
            title: 'Your Reservation',
            body: 'Reservation for ' + date + ' requested',
            ios: {
                sound: true
            },
            android: {
                sound: true,
                vibrate: true,
                color: '#512da8'
            }
        })
    }
    render() {
        return (
            <ScrollView>
                <Animatable.View animation='zoomIn' duration={2000} delay={1000} >
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Number of Guests</Text>
                    <Picker 
                        style={styles.formItem}
                        selectedValue={this.state.guests}
                        onValueChange={(itemValue, itemIndex) => this.setState({guests: itemValue})}
                    >
                        <Picker.Item label="1" value="1" />
                        <Picker.Item label="2" value="2" />
                        <Picker.Item label="3" value="3" />
                        <Picker.Item label="4" value="4" />
                        <Picker.Item label="5" value="5" />
                    </Picker>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                    <Switch
                        style={styles.formItem}
                        value={this.state.smoking}
                        onTintColor='#512da8'
                        onValueChange={(value) => this.setState({smoking: value})}>
                    </Switch>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Date</Text>
                    <DatePicker 
                        style={{ flex: 2, marginRight: 20}}
                        date={this.state.date}
                        mode='date'
                        placeholder='Select Date'
                        minDate='2020-01-01'
                        confirmBtnText='Confirm'
                        cancelBtnText='Cancel'
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                        }}
                        onDateChange={(date) => this.setState({date: date})}
                    />
                </View>
                <View style={styles.formRow}>
                    <Button
                        onPress={() => {this.handleSubmit(); this.presentLocalNotification(this.state.date)}}
                        title='Reserve'
                        color='#512da8'
                        accessibilityLabel='Learn more'
                    />
                </View>
                </Animatable.View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    }
})