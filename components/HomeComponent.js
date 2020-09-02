import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Card } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { baseUrl } from '../shared/baseUrl'
import Loading from './LoadingComponent'

const mapStateToProps = (state) => ({
    dishes: state.dishes,
    promotions: state.promotions,
    leaders: state.leaders
})

const RenderCard = ({ item, isLoading, errMsg }) => {
    if(isLoading) return <Loading />
    else if(errMsg) return <View><Text>{errMsg}</Text></View>
    else if(item!=null) 
    return(        
        <Card
            featuredTitle={item.name}
            featuredSubtitle={item.designation}
            image={{ uri: baseUrl+ item.image  }}>
                <Text style={{ margin:10 }}>{item.description}</Text>
        </Card>
    )
    else return <View></View>
}
class Home extends Component {
    static navigationOptions = {
        title: 'Home'
    }
    render() {
        const { dishes, promotions, leaders } = this.props
        return (
            <ScrollView>
                <RenderCard item={dishes.dishes.filter(dish => dish.featured)[0]} 
                    isLoading={dishes.isLoading} errMsg={dishes.errMsg} />            
                <RenderCard item={promotions.promotions.filter(promotion => promotion.featured)[0]}
                    isLoading={promotions.isLoading} errMsg={promotions.errMsg} />           
                <RenderCard item={leaders.leaders.filter(leader => leader.featured)[0]}
                    isLoading={leaders.isLoading} errMsg={leaders.errMsg} />
            </ScrollView>
        )
    }
}
export default connect(mapStateToProps)(Home)