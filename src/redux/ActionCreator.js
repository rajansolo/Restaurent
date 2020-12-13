import * as ActionType from  './ActionTypes';
import { baseURL } from '../shared/baseUrl';

export const addComment = (comment) => (
    {
        type: ActionType.ADD_COMMENT,
        payload : comment
    }
);

export const postComment = (dishId, rating, author, comment) => (dispatch) => {

    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment       
    }

    newComment.date = new Date().toISOString();

    return fetch(baseURL + 'comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            "Content-Type": "application/json"
          },
          credentials: "same-origin"
    })
    .then(response => {
        if(response.ok){
            return response;
        }
        else {
            const error = new Error('Error ' + response.status + ': ' + response.statusText);
            throw error;
        }
    }, 
    error => {
        const errMess = new Error(error.message);
        throw errMess;
    })
    .then(response => response.json())
    .then(comment => dispatch(addComment(comment)))
    .catch(error =>  { console.log('post comments', error.message);
            alert('Your comment could not be posted\nError: '+error.message) });

}

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));

    return fetch(baseURL + 'dishes')
        .then(response => {
            if (response.ok) {
            return response;
            } else {
            const error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
            }
        },
        error => {
                const errmess = new Error(error.message);
                throw errmess;
        })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)))
};

export const dishesLoading = (isLoading) => ({
    type: ActionType.DISHES_LOADING,
});

export const addDishes = (dishes) => ({
    type: ActionType.ADD_DISHES,
    payload: dishes,
});

export const dishesFailed = (errMess) => ({
    type: ActionType.DISHES_FAILED,
    payload: errMess,
});

export const fetchPromotions = () => (dispatch) => {
    dispatch(promotionsLoading(true));
    return fetch(baseURL + 'promotions')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error('Error ' + response.status + ': ' + response.statusText);
        //   error.response = response;
          throw error;
        }
      },
      error => {
            const errMess = new Error(error.message);
            throw errMess;
      })
        .then(response => response.json())
        .then(promos => {
            dispatch(addPromotions(promos))})
        .catch(error => dispatch(promotionsFailed(error.message)))
};

export const promotionsLoading = (isLoading) =>({
    type:ActionType.PROMOTIONS_LOADING,
});

export const addPromotions = (promos) => ({
    type: ActionType.ADD_PROMOTIONS,
    payload: promos,
});

export const promotionsFailed = (errMess) => ({
    type: ActionType.PROMOTIONS_FAILED,
    payload: errMess,
});

export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading(true))

    return fetch(baseURL+ 'leaders')
        .then(response => {
            if(response.ok){
                return response;
            }
            else {
                const error = new Error('Error ' + response.status + ': ' + response.statusText)
                throw error;
            }
        },
        error => {
            const errMess = new Error(error.message);
            throw errMess;
        })
        .then(response => response.json())
        .then(leaders => dispatch(addLeaders(leaders)))
        .catch(error => dispatch(leaderFailed(error.message)))
}

export const leadersLoading = (isLoading) => ({
    type: ActionType.LEADERS_LOADING,
});

export const leaderFailed = (errMess) => ({
    type: ActionType.LEADERS_FAILED,
    payload: errMess,
});

export const addLeaders = (leaders) => ({
    type: ActionType.ADD_LEADERS,
    payload: leaders
})

export const fetchComments = () => (dispatch) => {
    return fetch(baseURL + 'comments')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            const errmess = new Error(error.message);
            throw errmess;
      })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))        
        .catch(error => dispatch(dishesFailed(error.message)))
}

export const addComments = (comments) => ({
    type: ActionType.ADD_COMMENTS,
    payload: comments 
})

export const commentsFailed = (errMess) => ({
    type: ActionType.COMMENTS_FAILED,
    payload: errMess
});

export const addFeedback = (feedback) => ({
    type : ActionType.ADD_FEEDBACK,
    payload: feedback
});

export const postFeedbacks = (firstname, lastname, telnum, email, agree, contactType, message)  => (dispatch) => {

    const newFeedback = {
        firstname: firstname,
        lastname: lastname,
        telnum: telnum,
        email: email,
        agree: agree,
        contactType: contactType,
        message: message,
    }
    // newFeedback.date = new Date().toISOString(); 

    return fetch(baseURL + 'feedback',{
        method: 'POST',
        body: JSON.stringify(newFeedback),
        headers: {
            "Content-Type": "application/json"
          },
          credentials: "same-origin"
    })
    .then(response => {
        if(response.ok){
            return response;
        }
        else {
            const error = new Error('Error ' + response.status + ': ' + response.statusText)
            throw error
        }
    }, error => {
        const errMess = new Error(error.message);
        throw errMess;
    })
    .then(response => response.json())
    .then(feedback => dispatch(addFeedback(feedback)))
    .catch(error =>dispatch(feedbackError(error)))
}

export const feedbackError = (errMess) =>({
    type: ActionType.FEEDBACK_ERROR,
    payload: errMess,
});