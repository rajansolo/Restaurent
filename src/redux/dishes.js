import * as ActionTypes from './ActionTypes'

export const Dishes = ( state = {
    isLoading : true, 
    dishes : [], 
    errMess : null
}, action) => {
    switch(action.type){
        case  ActionTypes.ADD_DISHES:
            return {...state, isLoading: false,  errMess:null, dishes: action.payload };

        case ActionTypes.DISHES_FAILED:
            return {...state, isLoading: false, errMess: action.payload, dishes:[]};

        case ActionTypes.DISHES_LOADING:
            return  {...state, isLoading: true, dishes: [], errMess: null };

        default : 
            return state;
    }
}