import React, { Component } from 'react'
import { View, Text, Modal, StyleSheet, PanResponder, Alert, Share } from 'react-native'
import { Card, Icon, AirbnbRating, Input, Button } from 'react-native-elements'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { postFavorite, postComment } from '../redux/ActionCreaters'
import * as Animatable from 'react-native-animatable';
import { globalStyles } from '../shared/globalStylesheet'

const mapStateToProps = (state) => ({
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites
})

const mapDispatchToProps = (dispatch) => ({
    postFavorites: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
})
function RenderComments({comments }){
    const renderCommentItem = ({ item, index }) => {
        return(
            <View key={index} style={{margin: 10}}>
                <Text style={{ ...globalStyles.text, textAlign: 'center' }}>{item.comment}</Text>
                <AirbnbRating
                    size={25}
                    showRating={false}
                    defaultRating={item.rating}
                    isDisabled={true}
                    />
                <Text style={{ ...globalStyles.text, textAlign: 'center' }}>{ 'Author: ' + item.author.firstname + ' ' + item.author.lastname }</Text>
                <Text style={{ ...globalStyles.text, textAlign: 'center' }}>{ 'Date: ' + new Date(item.createdAt).toLocaleString() }</Text>
            </View>
        )
    }
    return(
        <Animatable.View animation='fadeInUp' duration={2000} delay={1000} >
            <Card title='Comments' titleStyle={globalStyles.subtitle}>
                <FlatList
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item._id.toString()}
                />
            </Card>
        </Animatable.View>
    )
}

function RenderDish({ dish, favorite , onPress, toggleModal}) {
    let view = ''
    const handleViewRef = ref => view = ref
    const recognizeDragRight = ({ moveX, moveY, dx, dy }) => {
        if(dx < -200) return true
        else return false
    }
    const recognizeDragLeft = ({ moveX, moveY, dx, dy }) => {
        if(dx > 200) return true
        else return false
    }
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => true,
        onPanResponderGrant: () => view.rubberBand(1000).then(endState => console.log(endState.finished ? 'finished' : 'cancelled')),
        onPanResponderEnd: (e, gestureState) => {
            console.log('pan responder end' + gestureState)
            if(recognizeDragRight(gestureState)){
                Alert.alert(
                    'Add favorite',
                    'Are you sure you want to add ' + dish.name + ' to favorite?',
                    [
                        {text: 'Cancel', onPress: () => console.log('Cancel Presses'), style:'cancel'},
                        {text: 'OK', onPress: () => favorite ? console.log('already favorite') : onPress()}
                    ],
                    { cancelable: false }
                )
            }else if(recognizeDragLeft(gestureState)){
                toggleModal()
            }
            return true
        }
    })
    const shareDish = (title, message, url) => {
        Share.share({
            title: title,
            message: title + ': ' + message + ' ' + url,
            url: url
        },{
            dialogTitle: 'Share ' + title
        })
    }
    return dish!=null? 
        (
            <Animatable.View animation='fadeInDown' duration={2000} delay={1000} 
                ref={handleViewRef}
                {...panResponder.panHandlers} >
                <Card 
                    featuredTitle={dish.name}
                    featuredTitleStyle={{ textAlign: 'center', ...globalStyles.title }}
                    imageStyle={{ height : 275 }}
                    image={{ uri:  dish.image }}>
                    <Text style={{ padding: 10, ...globalStyles.text }}>{dish.description}</Text>
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
                        <Icon
                            raised
                            reverse
                            name={'share'}
                            type='font-awesome'
                            color='#51d2a8'
                            onPress={() => shareDish(dish.name, dish.description, dish.image)}
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
        rating: 3,
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
        const { rating, comment } = this.state
        this.props.postComment(di,rating, comment)
        this.setState({
            rating: 3,
            comment: '',
            showModal: false
        })
    }
    render(){
        const dishId = this.props.navigation.getParam('dishId', '')
        return (
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes.find(e => e._id === dishId)} 
                    favorite={this.props.favorites.favorites.some(e => e._id === dishId)}
                    onPress={() => this.props.postFavorites(dishId)}
                    toggleModal={this.toggleModal}
                />
                <RenderComments comments={this.props.comments.comments.filter(comment => comment.dish===dishId)} />
                <Modal animationType={'slide'} transparent={false} 
                    visible={this.state.showModal}
                    onDismiss={() => this.toggleModal()}
                    onRequestClose={() => this.toggleModal()} >
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Add Rating</Text>
                        <AirbnbRating
                            reviews={['Terrible', 'Bad', 'Good', 'Very Good', 'Amazing']}
                            onFinishRating={(rating) => this.setState({ rating: rating })}
                        />
                        <Input
                            leftIcon={{ name:'comment-o', type:'font-awesome' }}
                            style={globalStyles.boldText}
                            value={this.state.comment}
                            placeholder='Comment  '
                            onChangeText={(value) => this.setState({comment: value})} 
                        />
                        <View style={styles.btn}>
                            <Button
                                raised
                                onPress={() => this.handleComment()}
                                title='Submit'
                                buttonStyle={{ backgroundColor: '#512da8' }}
                                titleStyle={globalStyles.boldText}
                            />
                        </View>
                        <View style={styles.btn}>
                            <Button
                                raised
                                onPress={() => this.toggleModal()}
                                title='Close'
                                buttonStyle={{ backgroundColor: '#777777' }}
                                titleStyle={globalStyles.boldText}
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
        fontFamily: 'DancingScript',
        fontWeight: 'normal',
        padding: 10,
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
        justifyContent: 'center',
        flexDirection: 'row'
    },
    icon: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 5
    },
    btn: {
        marginBottom: 10,
        marginTop: 10,
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(DishDetail)
