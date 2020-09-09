import React, { Component } from 'react'
import { ScrollView, Switch, TouchableOpacity } from 'react-native-gesture-handler'
import { StyleSheet, View, Text, Picker, Button, Alert, Platform } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import * as Animatable from 'react-native-animatable';
import { Permissions } from 'react-native-unimodules';
import { Notifications } from 'expo';
import * as Calendar from 'expo-calendar'
import { Icon } from 'react-native-elements';
export default class Reservation extends Component {
    static navigationOptions = {
        title: 'Reserve Table'
    }
    state = {
        guests: 1,
        smoking: false,
        datetime: new Date(),
        show: false,
        mode: 'date'
    }
    handleSubmit = () => {
        Alert.alert(
            'Your Reservation OK?',
            `Number of Guests: ${this.state.guests} \nSmoking? ${this.state.smoking ? 'Yes' : 'No'} \nDate: ${this.state.datetime}`,
            [
                {text: 'Cancel', onPress: () => this.resetForm(), style:'cancel'},
                {text: 'OK', onPress: () => {
                    this.presentLocalNotification(this.state.datetime)
                    this.addReservationToCalendar(this.state.datetime)
                    this.resetForm()
                }}
            ],
            { cancelable: false }
        )
    }
    resetForm = () => {
        this.setState({
            guests: 1,
            smoking: false,
            datetime: new Date(),
            show: false,
            mode: 'date'
        })
    }
    showDatePicker = () => {
        this.setState({
            show: true,
            mode: 'date'
        })
    }
    onChangeDate = (e, selectedValue) => {
        if(this.state.mode === 'date'){
            this.setState({
                datetime: selectedValue,
                mode: 'time',
                show: true
            })
        }else{
            this.setState({
                datetime: new Date(this.state.datetime.toDateString() + ' ' + selectedValue.toTimeString()),
                mode: 'date',
                show: false
            })
        }
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
    async presentLocalNotification(datetime){
        await this.obtainNotificationPermission()
        Notifications.presentLocalNotificationAsync({
            title: 'Your Reservation',
            body: 'Reservation for ' + datetime.toString() + ' requested',
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
    async obtainCalendarPermission(){
        let permission = await Permissions.getAsync(Permissions.CALENDAR)
        if(permission.status!=='granted'){
            permission = await Permissions.askAsync(Permissions.CALENDAR)
            if(permission.status!=='granted'){
                Alert.alert('Permission not granted to add event to calendar')
            }
        }
        return permission
    }
    async createCalendar(){
        await this.obtainCalendarPermission()
        const calendars = await Calendar.getCalendarsAsync() 
        const defaultCalendarSource = Platform.OS==='ios'? 
            calendars.filter(e => e.source.name==='Default')[0].source :
            { isLocalAccount: true, name: 'Expo Calender' }
        const calenderId = await Calendar.createCalendarAsync({
            title: 'Expo Calender',
            color: 'blue',
            entityType: Calendar.EntityTypes.EVENT,
            sourceId: defaultCalendarSource.id,
            source: defaultCalendarSource,
            name: 'Restorante con Fusion',
            ownerAccount: 'personal',
            accessLevel: Calendar.CalendarAccessLevel.OWNER,
        })
        return calenderId
    }
    async addReservationToCalendar(datetime){
        const calendarId = await this.createCalendar()
        console.log(Date.parse(datetime))
        Calendar.createEventAsync(calendarId ,{
            title: 'Con Fusion Table Reservation',
            startDate: Date.parse(datetime),
            endDate: Date.parse(datetime) + 7200000,
            timeZone: 'Asia/Hong_Kong',
            location: '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong'
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
                    <Text style={styles.formLabel}>Date and Time</Text>
                    <TouchableOpacity onPress={this.showDatePicker} style={{ flexDirection: 'row' }}>
                        <Icon name='calendar-alt' type='font-awesome-5' size={22} color='grey'/> 
                        <Text>{'  ' + this.state.datetime.toLocaleDateString() + ' ' + this.state.datetime.toLocaleTimeString()}</Text>
                    </TouchableOpacity>
                    {this.state.show &&
                    <DateTimePicker
                        testID="datetimepicker"
                        value={new Date()}
                        mode={this.state.mode}
                        is24Hour={true} 
                        display="default"
                        onChange={this.onChangeDate}
                        />
                    }   
                </View>
                <View style={styles.formRow}>
                    <Button
                        onPress={this.handleSubmit}
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