import React, { Component } from 'react'; 
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import About from './AboutusComponent';
import Footer from './FooterComponent'
import DishDetails from './DishDetailComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'; 
import { connect } from 'react-redux';
import { postComment, fetchDishes, fetchPromotions, fetchComments, fetchLeaders, postFeedbacks } from '../redux/ActionCreator';  //dispatch
import { actions } from 'react-redux-form'; //form
import { TransitionGroup, CSSTransition  } from 'react-transition-group' //Animation

const mapStateToProps = state => (
 {  
  dishes : state.dishes,
  comments : state.comments,
  leaders : state.leaders,
  promotions : state.promotions,
}
);

const mapDispatchToProps = (dispatch) => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: (isLoading, errMess, dishes) => dispatch(fetchDishes(isLoading, errMess, dishes)),
  fetchPromotions: (isLoading, promotions, errMess) => dispatch(fetchPromotions(isLoading, promotions, errMess)),
  fetchLeaders: (isLoading, errMess, leaders) => dispatch(fetchLeaders(isLoading, errMess, leaders)),
  fetchComments : (comments, errMess) => dispatch(fetchComments(comments, errMess)),
  resetFeedbackForm: () => dispatch(actions.reset('feedback')),
  postFeedbacks: (firstname, lastname, telnum, email, agree, contactType, message) => dispatch(postFeedbacks(firstname, lastname, telnum, email, agree, contactType, message))
})

class Main extends Component {
  
 componentDidMount(){
   this.props.fetchDishes();
   this.props.fetchPromotions();
   this.props.fetchComments();
   this.props.fetchLeaders();
   this.props.postFeedbacks();
 }

  render() {

    const HomePage = () => {
      return(
          <Home 
              dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
              dishesIsLoading={this.props.dishes.isLoading}
              dishesErrMess={this.props.dishes.errMess} 
              promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
              promotionsIsLoading={this.props.promotions.isLoading}
              promotionsErrMess ={this.props.promotions.errMess}
              leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
              leaderIsLoading={this.props.leaders.isLoading}
              leaderErrMess={this.props.leaders.errMess}
          />
      );
    }

    const AboutUS = () =>{
      return(
        <About leaders={this.props.leaders.leaders}
              leaderIsLoading={this.props.leaders.isLoading}
              leaderErrMess={this.props.leaders.errMess}/>
      );
    }

    const DishWithId = ({match}) => {
      return(
          <DishDetails 
            dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
            dishesErrMess={this.props.dishes.errMess}
            dishesIsLoading={this.props.dishes.isLoading} 
            comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
            commentsErrMess={this.props.comments.errMess}            
            postComment = {this.props.postComment} 
            />
      );
    };



    return (
      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={500}>
            <Switch>
              <Route path="/home" component={HomePage} />
              <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes.dishes}
                                                                isLoading={this.props.dishes.isLoading} 
                                                                errMess={this.props.dishes.errMess} />}
                                                                />
              <Route exact path="/aboutus" component={AboutUS} />
              <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm}
                                                              postFeedback={this.props.postFeedbacks}/>} />
              <Route path="/menu/:dishId" component={DishWithId} />
              <Redirect to="/home" />
            </Switch> 
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));