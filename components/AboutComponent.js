import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux'
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = (state) => ({
    leaders: state.leaders
})
const RenderLeaders = ({ leaders, isLoading, errMsg }) => {
    const renderLeaderItem = ({ item }) => {
        return (
            <ListItem
                title={item.name}
                subtitle={item.description}
                hideChevron={true}
                leftAvatar={{source: { uri: baseUrl + item.image }}}
            />
        )
    }
    if(isLoading) return <Loading />
    else if(errMsg) return <Text>{errMsg}</Text>
    else return(
        <FlatList
            data={leaders}
            renderItem={renderLeaderItem}
            keyExtractor={item => item.id.toString()}
        />
    )
}
class About extends Component {
    render(){
        const { leaders, isLoading, errMsg } = this.props.leaders
        return(
            <ScrollView>
                <Animatable.View animation='fadeInDown' duration={2000} delay={1000} >
                    <Card title='Our History'>
                        <Text>Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.</Text>
                        <Text>The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.</Text>
                    </Card>
                    <Card title='Corporate Leadership'>
                        <RenderLeaders leaders={leaders} isLoading={isLoading} errMsg={errMsg} />
                    </Card>
                </Animatable.View>
            </ScrollView>
        )
    }
}

export default connect(mapStateToProps)(About);    