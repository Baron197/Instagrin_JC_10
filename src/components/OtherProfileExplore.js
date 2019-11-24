import React, { Component } from 'react';
import { View, Text, Platform, Image, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Header, ListItem, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { selectOtherProfilePostExplore } from '../actions';

class OtherProfileExplore extends Component {

    onSelectPostPress = (post) => {
        this.props.selectOtherProfilePostExplore(post)
        this.props.navigation.navigate('PostDetailOtherProfile')
    }

    renderListPost = () => {
        var i = 2;
        return this.props.listPost.map((item, index) => {
            var styleObj = { width: '33%', marginVertical: 1 }
            if((index + 1) === i ) {
                i += 3;
                styleObj.marginHorizontal = '0.5%'
            }
            return (
                <View 
                    style={styleObj}
                >
                    <TouchableWithoutFeedback onPress={() => this.onSelectPostPress(item)}>
                        <Image source={{uri: item.imageURL }} style={{height: 125, width: '100%' }}/>
                    </TouchableWithoutFeedback>
                </View>
            )
        })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header
                    centerComponent={{ 
                        text: this.props.user.username.toLowerCase().replace(/\s/g, ''), 
                        style: { color: 'black', fontSize: 18, fontWeight: '700' } 
                    }}
                    leftComponent={{ 
                        icon: 'arrow-back', 
                        color: 'black',
                        onPress: () => this.props.navigation.goBack() 
                    }}
                    placement={'left'}
                    centerContainerStyle={{ flex: 4 }}
                    containerStyle={{
                        backgroundColor: '#fff',
                        justifyContent: 'space-around',
                        marginTop: Platform.OS === 'ios' ? 0 : - 25,
                        // borderBottomWidth: 0.5
                    }}
                />
                <ScrollView>
                    <ListItem
                        leftAvatar={{
                            source: { uri: this.props.user.userPhoto },
                            size: 'large'
                        }}
                        title={this.props.user.username}
                        subtitle={'Instagrin User'}
                    />
                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        flex: 1,
                        marginVertical: 15
                        // justifyContent: 'space-between'
                    }}>
                        {this.renderListPost()}
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = ({ post }) => {
    var user = post.selectedProfileUserExplore
    var listPost = post.postList.filter((item,index) => {
        return user.userId === item.userId
    })
    return {
        user,
        listPost
    }
}

export default connect(mapStateToProps, { selectOtherProfilePostExplore })(OtherProfileExplore);