import React, { Component } from 'react'
import { ScrollView, Switch } from 'react-native-gesture-handler'
import { StyleSheet, View, Text, Picker, Button } from 'react-native'
import DatePicker from 'react-native-datepicker'

export default class Reservation extends Component {
    static navigationOptions = {
        title: 'Reserve Table'
    }
    state = {
        guests: 1,
        smoking: false,
        date: ''
    }
    handleSubmit = () => {
        console.log(JSON.stringify(this.state))
        this.setState({
            guests: 1,
            smoking: false,
            date: ''
        })
    }
    render() {
        return (
            <ScrollView>
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
                        style={styles.formLabel}
                        value={this.state.smoking}
                        onTintColor='#512da8'
                        onValueChange={(value) => this.setState({smoking: value})}>
                    </Switch>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Date and Time</Text>
                    <DatePicker 
                        style={{ flex: 2, marginRight: 20}}
                        date={this.state.date}
                        mode='datetime'
                        placeholder='Select Date and Time'
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
                        onPress={() => this.handleSubmit()}
                        title='Reserve'
                        color='#512da8'
                        accessibilityLabel='Learn more'
                    />
                </View>
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