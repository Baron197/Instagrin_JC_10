import firebase from '@firebase/app';
import '@firebase/database';
import _ from 'lodash';
import { 
    EMPTY_POST_LIST,
    FILL_POST_LIST,
    SELECT_POST_PROFILE,
    DELETE_POST,
    DELETE_POST_SUCCESS,
    SELECT_EXPLORE_POST,
    INIT_EDIT_POST,
    EDIT_POST_CAPTION_CHANGE,
    SAVE_EDIT_POST,
    SAVE_EDIT_POST_SUCCESS,
    SELECT_POST_OTHER_PROFILE_HOME,
    SELECT_POST_OTHER_PROFILE_EXPLORE,
    SELECT_USER_PROFILE_HOME,
    SELECT_USER_PROFILE_EXPLORE
} from './types';

export const getListPost = () => {
    return (dispatch) => {
        console.log('Masuk')
        var firebaseDatabase = firebase.database()
       firebaseDatabase.ref(`/posts`)
        .on('value', (snapshot) => {
            console.log(snapshot.val())
            dispatch({
                type: EMPTY_POST_LIST
            })
            _.map(snapshot.val(), async (val, id) => {
                var snapshot = await firebaseDatabase.ref(`/users/${val.userId}`).once('child_added')
                var value = snapshot.val()
                console.log(value)
                dispatch({
                    type: FILL_POST_LIST,
                    payload: { 
                        ...val, 
                        id, 
                        username: value.displayName, 
                        userPhoto: value.photoURL 
                    }
                })
            });
        })   

    }
}

export const selectProfilePost = (post) => {
    return {
        type: SELECT_POST_PROFILE,
        payload: post
    }
}

export const deletePost = (postId) => {
    return (dispatch) => {
        dispatch({ type: DELETE_POST })
        firebase.database().ref(`/posts/${postId}`)
            .remove()
            .then(() => {
                dispatch({
                    type: DELETE_POST_SUCCESS
                })
            })
    }
}

export const selectExpPost = (selectedPost) => {
    return {
        type: SELECT_EXPLORE_POST,
        payload: selectedPost
    }
}

export const editPostInit = () => {
    return {
        type: INIT_EDIT_POST
    }
}

export const onEditPostCaptionChange = (text) => {
    return {
        type: EDIT_POST_CAPTION_CHANGE,
        payload: text
    }
}

export const saveEditPost = (post,id) => {
    return async (dispatch) => {
        dispatch({ type: SAVE_EDIT_POST })
        try {
            await firebase.database().ref(`/posts/${id}`)
                .set(post)
            dispatch({ type: SAVE_EDIT_POST_SUCCESS })
        } catch(err) {

        }     
    }
}

export const selectUserProfileHome = (user) => {
    return {
        type: SELECT_USER_PROFILE_HOME,
        payload: user
    }
}

export const selectUserProfileExplore = (user) => {
    return {
        type: SELECT_USER_PROFILE_EXPLORE,
        payload: user
    }
}

export const selectOtherProfilePostHome = (post) => {
    return {
        type: SELECT_POST_OTHER_PROFILE_HOME,
        payload: post
    }
}

export const selectOtherProfilePostExplore = (post) => {
    return {
        type: SELECT_POST_OTHER_PROFILE_EXPLORE,
        payload: post
    }
}

// axios.get('url').then(res => { console.log(res.data)}).catch(err => {})
// try {
//     var res = await axios.get('url')
// } catch(err) {

// }
