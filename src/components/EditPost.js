import React, { Component } from 'react';
import { View, Image, ActivityIndicator, Keyboard } from 'react-native';
import { Header, Icon, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { Card, CardItem, Thumbnail, Text, Button, Left, Body, Right } from 'native-base';
import { onEditPostCaptionChange, saveEditPost } from '../actions';

class EditPost extends Component {
    state = { imageHeight: 350 }

    savePost = () => {
        this.props.saveEditPost({ 
            caption: this.props.caption,
            imageURL: this.props.imageURL,
            userId: this.props.userId
        }, this.props.id)
    }

    inputCaptionChange = (text) => {
        this.props.onEditPostCaptionChange(text);
    }

    componentDidUpdate() {
        if(!this.props.username) {
            this.props.navigation.goBack()
        }
    }

    componentWillMount() {
        this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', () => this.setState({ imageHeight: 150 }));
        this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', () => this.setState({ imageHeight: 350 }));
      }
    
    componentWillUnmount() {
        this.keyboardDidShowSub.remove();
        this.keyboardDidHideSub.remove();
    }

    render() {
        if(!this.props.username) {
            return <View />
        }
        return (
            <View>
                <Header
                    placement="left"
                    leftComponent={{ 
                        icon: 'clear', 
                        color: 'black',
                        onPress: () => this.props.navigation.goBack() 
                    }}
                    centerComponent={{ 
                        text: 'Edit Info', 
                        style: { color: 'black', fontSize: 18, fontWeight: '700' } 
                    }}
                    rightComponent={this.props.loading ? <ActivityIndicator size="small" color="#4388d6" /> : { 
                        icon: 'done', 
                        color: '#4388d6',
                        onPress: this.savePost
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
                        <Image source={{uri: this.props.imageURL }} style={{height: this.state.imageHeight, width: null, flex: 1}}/>
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Input
                                placeholder='Caption'
                                value={this.props.caption}
                                onChangeText={this.inputCaptionChange}
                            />
                        </Left>
                    </CardItem>
                </Card>
            </View>
        )
    }
}

const mapStateToProps = ({ post }) => {
    return {
        ...post.editPost,
        loading: post.editPostLoading
    }
}

export default connect(mapStateToProps, { onEditPostCaptionChange, saveEditPost })(EditPost);
