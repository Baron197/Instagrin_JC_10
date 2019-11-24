import React, { Component } from 'react';
import { View, Platform, Image, TouchableWithoutFeedback } from 'react-native';
import { Header, Icon, Button } from 'react-native-elements';
import { 
    Card, 
    CardItem, 
    Thumbnail, 
    Text, 
    Left, 
    Body, 
    Right 
} from 'native-base';
import { connect } from 'react-redux';
import { selectUserProfileExplore } from '../actions';

class PostDetailExplore extends Component {
    onHeaderCardPress = (user) => {
        this.props.selectUserProfileExplore(user)
        this.props.navigation.navigate('OtherProfile')
    }

    render() {
        if(this.props.selectedPost) {
            return (
                <View style={{ flex: 1 }}>
                    <Header
                        placement='left'
                        centerComponent={{ 
                            text: 'Explore', 
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
                    <View style={{ marginVertical: 10 }}>
                        <Card>
                            <TouchableWithoutFeedback onPress={() => this.onHeaderCardPress({ userId: this.props.selectedPost.userId, userPhoto: this.props.selectedPost.userPhoto, username: this.props.selectedPost.username })}>
                                <CardItem>
                                    <Left>
                                        <Thumbnail source={{uri: this.props.selectedPost.userPhoto }} />
                                        <Body>
                                            <Text>{this.props.selectedPost.username}</Text>
                                            <Text note>Instagrin User</Text>
                                        </Body>
                                    </Left>
                                </CardItem>
                            </TouchableWithoutFeedback>
                            <CardItem cardBody>
                                <Image source={{uri: this.props.selectedPost.imageURL }} style={{height: 350, width: null, flex: 1}}/>
                            </CardItem>
                            <CardItem>
                                <Left>
                                    <Text>{this.props.selectedPost.caption}</Text>
                                </Left>
                            </CardItem>
                        </Card>
                    </View>
                </View>
            )
        }
        
        return (
            <View style={{ flex: 1 }}>
                <Header
                    placement='left'
                    centerComponent={{ 
                        text: 'Explore', 
                        style: { color: 'black', fontSize: 18 } 
                    }}
                    leftComponent={{ 
                        icon: 'arrow-back', 
                        color: 'black',
                        onPress: () => this.props.navigation.goBack() 
                    }}
                    containerStyle={{
                        backgroundColor: '#fff',
                        justifyContent: 'space-around',
                        marginTop: Platform.OS === 'ios' ? 0 : - 25
                    }}
                />
            </View>
        );
    }
}

const mapStateToProps = ({ post }) => {
    return { selectedPost: post.selectExpPost, loading: post.loading }
}

export default connect(mapStateToProps, { selectUserProfileExplore })(PostDetailExplore);