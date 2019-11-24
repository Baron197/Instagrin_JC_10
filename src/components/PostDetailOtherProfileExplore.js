import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { Card, CardItem, Thumbnail, Text, Button, Left, Body, Right } from 'native-base';

class PostDetailOtherProfileExplore extends Component {
    render() {
        return (
            <View>
                <Header
                    placement='left'
                    centerComponent={{ 
                        text: 'Post', 
                        style: { color: 'black', fontSize: 18, fontWeight: '700' } 
                    }}
                    leftComponent={{ 
                        icon: 'arrow-back', 
                        color: 'black',
                        onPress: () => this.props.navigation.goBack()
                    }}
                    containerStyle={{
                        backgroundColor: '#fff',
                        justifyContent: 'space-around',
                        elevation: 2,
                        marginTop: Platform.OS === 'ios' ? 0 : - 25
                    }}
                />
                <Card>
                    <CardItem>
                        <Left style={{ flex: 3 }}>
                            <Thumbnail source={{uri: this.props.userPhoto }} />
                            <Body>
                                <Text>{this.props.username}</Text>
                                <Text note>Instagrin User</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem cardBody>
                        <Image source={{uri: this.props.imageURL }} style={{height: 350, width: null, flex: 1}}/>
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Text>{this.props.caption}</Text>
                        </Left>
                    </CardItem>
                </Card>
            </View>
        )
    }
}

const mapStateToProps = ({ post }) => {
    // console.log('Post Detail : ', post.selectedPostDetailProfile)
    return {
        ...post.selectedPostDetailOtherProfileExplore
    }
}

export default connect(mapStateToProps)(PostDetailOtherProfileExplore);
