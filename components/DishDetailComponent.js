import React, { Component } from 'react'
import { View, Text, Modal, Button, StyleSheet, PanResponder, Alert } from 'react-native'
import { Card, Icon, AirbnbRating } from 'react-native-elements'
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { baseUrl } from '../shared/baseUrl'
import { postFavorites, postComment } from '../redux/ActionCreaters'
import * as Animatable from 'react-native-animatable';

const mapStateToProps = (state) => ({
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites
})

const mapDispatchToProps = (dispatch) => ({
    postFavorites: (dishId) => dispatch(postFavorites(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
})
function RenderComments({comments }){
    const renderCommentItem = ({ item, index }) => {
        return(
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Star</Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date}</Text>
            </View>
        )
    }
    return(
        <Animatable.View animation='fadeInUp' duration={2000} delay={1000} >
            <Card title='Comments'>
                <FlatList
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()}
                />
            </Card>
        </Animatable.View>
    )
}

function RenderDish({ dish, favorite , onPress, toggleModal}) {
    handleViewRef = ref => this.view = ref
    const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
        if(dx < -200) return true
        else return false
    }
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => true,
        onPanResponderGrant: () => this.view.rubberBand(1000).then(endState => console.log(endState.finished ? 'finished' : 'cancelled')),
        onPanResponderEnd: (e, gestureState) => {
            console.log('pan responder end' + gestureState)
            if(recognizeDrag(gestureState)){
                Alert.alert(
                    'Add favorite',
                    'Are you sure you want to add ' + dish.name + ' to favorite?',
                    [
                        {text: 'Cancel', onPress: () => console.log('Cancel Presses'), style:'cancel'},
                        {text: 'OK', onPress: () => favorite ? console.log('already favorite') : onPress()}
                    ],
                    { cancelable: false }
                )
            }
            return true
        }
    })
    return dish!=null? 
        (
            <Animatable.View animation='fadeInDown' duration={2000} delay={1000} 
                ref={this.handleViewRef}
                {...panResponder.panHandlers} >
                <Card 
                    featuredTitle={dish.name}
                    image={{ uri: baseUrl + dish.image }}>
                    <Text style={{ padding: 10 }}>{dish.description}</Text>
                    <View style={styles.iconRow}>
                        <Icon
                            raised
                            reverse
                            name={favorite ? 'heart':'heart-o'}
                            type='font-awesome'
                            color='#f50'
                            onPress={() => favorite ? console.log('already favorite') : onPress()}
                        />
                        <Icon
                            raised
                            reverse
                            name={'pencil'}
                            type='font-awesome'
                            color='#512da8'
                            onPress={() => toggleModal()}
                        />
                    </View>
                </Card>
            </Animatable.View>
        ):
        (<View></View>)
    
}
class DishDetail extends Component {
    static navigationOptions = {
        title: 'Dish Details'
    }
    state = {
        rating: '',
        author: '',
        comment: '',
        showModal: false
    }
    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal
        })
    }
    handleComment = () => {
        console.log(this.state.toString())
        const di = this.props.navigation.getParam('dishId', '')
        const { rating, author, comment } = this.state
        this.props.postComment(di,rating, author, comment)
        this.setState({
            rating: '',
            author: '',
            comment: '',
            showModal: false
        })
    }
    render(){
        const dishId = this.props.navigation.getParam('dishId', '')
        return (
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]} 
                    favorite={this.props.favorites.some(e => e === dishId)}
                    onPress={() => this.props.postFavorites(dishId)}
                    toggleModal={this.toggleModal}
                />
                <RenderComments comments={this.props.comments.comments.filter(comment => comment.dishId===dishId)} />
                <Modal animationType={'slide'} transparent={false} 
                    visible={this.state.showModal}
                    onDismiss={() => this.toggleModal()}
                    onRequestClose={() => this.toggleModal()} >
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Add Rating</Text>
                        <AirbnbRating
                            reviews={['Terrible', 'Bad', 'Good', 'Very Good', 'Amazing']}
                            onFinishRating={(rating) => this.setState({rating: rating})}/>
                        <View style={styles.formRow}>
                            <Icon name={'user-o'} type='font-awesome' style={styles.icon}/>
                            <TextInput 
                                style={styles.input}
                                value={this.state.author}
                                placeholder='Your Name'
                                onChangeText={(value) => this.setState({author: value})}
                            />
                        </View>
                        <View style={styles.formRow}>
                            <Icon name={'comment-o'} type='font-awesome' style={styles.icon}/>
                            <TextInput
                                style={styles.input}
                                value={this.state.comment}
                                placeholder='Comment'
                                onChangeText={(value) => this.setState({comment: value})} 
                            />
                        </View>
                        <View style={styles.btn}>
                            <Button
                                onPress={() => this.handleComment()}
                                title='Submit'
                                color='#512da8'
                            />
                        </View>
                        <View style={styles.btn}>
                            <Button
                                onPress={() => this.toggleModal()}
                                title='Close'
                                color='#777777'
                            />
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512da8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        margin: 10
    },
    iconRow: {
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
    icon: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 5
    },
    input: {
        flex: 9,
        borderBottomColor: '#777777',
        borderBottomWidth: 2,
        fontSize: 16,
        padding: 5
    },
    btn: {
        marginBottom: 10,
        marginTop: 10,
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(DishDetail)
