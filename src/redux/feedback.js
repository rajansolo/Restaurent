import * as ActionTypes from './ActionTypes';

export const Feedbacks = (state ={
    errMess : null,
    feedback : []
    }, 
    action) => {
    switch(action.type){
        case ActionTypes.ADD_FEEDBACK:
            return { ...state, errMess: null, feedback: action.paylod };
        
        case ActionTypes.FEEDBACK_ERROR:
            return { ...state, errMess:action.payload, feedback:[] }

        default: 
            return state;
    }
}