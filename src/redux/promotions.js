import * as ActionTypes from './ActionTypes';

export const Promotions = (state ={
    isLoading: true,
    promotions: [],
    errMess: null
}, action) => {
    switch(action.type){
        case ActionTypes.PROMOTIONS_LOADING:
            return { ...state, isLoading: true, promotions: [], errMess: null }
        
        case ActionTypes.PROMOTIONS_FAILED:
            return { ...state, isLoading: false, promotions: [], errMess: action.payload }

        case ActionTypes.ADD_PROMOTIONS:
            return {...state, isLoading: false, promotions: action.payload, errMess:null, };

        default:
            return state;
    }
}
