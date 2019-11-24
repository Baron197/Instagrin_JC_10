import { 
    FILL_POST_LIST,
    EMPTY_POST_LIST,
    SELECT_POST_PROFILE,
    DELETE_POST,
    DELETE_POST_SUCCESS,
    SELECT_EXPLORE_POST,
    INIT_EDIT_POST,
    EDIT_POST_CAPTION_CHANGE,
    SAVE_EDIT_POST,
    SAVE_EDIT_POST_SUCCESS,
    SELECT_USER_PROFILE_HOME,
    SELECT_POST_OTHER_PROFILE_HOME,
    SELECT_POST_OTHER_PROFILE_EXPLORE,
    SELECT_USER_PROFILE_EXPLORE,
} from '../actions/types';

const INITIAL_STATE = {
    postList: [],
    selectedPostDetailProfile: null,
    selectExpPost: null,
    editPost: null,
    editPostLoading: false,
    deleteLoading: false,
    deleteError: false,
    selectedProfileUserHome: null,
    selectedProfileUserExplore: null,
    selectedPostDetailOtherProfileHome: null,
    selectedPostDetailOtherProfileExplore: null,
}

export default (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case EMPTY_POST_LIST :
            return { ...state, postList: [] }
        case FILL_POST_LIST :
            return { ...state, postList: [...state.postList, action.payload] }
        case SELECT_POST_PROFILE :
            return { ...state, selectedPostDetailProfile: action.payload }
        case SELECT_EXPLORE_POST :
            return { ...state, selectExpPost: action.payload }
        case DELETE_POST :
            return { ...state, deleteLoading: true }
        case DELETE_POST_SUCCESS :
            return { ...state, deleteLoading: false, selectedPostDetailProfile: null }
        case INIT_EDIT_POST :
            return { ...state, editPost: state.selectedPostDetailProfile }
        case EDIT_POST_CAPTION_CHANGE:
            return { ...state, editPost: {...state.editPost, caption: action.payload } }
        case SAVE_EDIT_POST :
            return { ...state, editPostLoading: true }
        case SAVE_EDIT_POST_SUCCESS :
            return { 
                ...state, 
                editPostLoading: false, 
                editPost: null, 
                selectedPostDetailProfile: { ...state.selectedPostDetailProfile, caption: state.editPost.caption} 
            }
        case SELECT_USER_PROFILE_HOME :
            return { ...state, selectedProfileUserHome: action.payload }
        case SELECT_USER_PROFILE_EXPLORE :
            return { ...state, selectedProfileUserExplore: action.payload }
        case SELECT_POST_OTHER_PROFILE_HOME :
            return { ...state, selectedPostDetailOtherProfileHome: action.payload }
        case SELECT_POST_OTHER_PROFILE_EXPLORE :
            return { ...state, selectedPostDetailOtherProfileExplore: action.payload }
        default :
            return state;
    }
}