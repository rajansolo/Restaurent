import React, { Component } from 'react';
import {  Card, CardImg, CardTitle, CardText, Breadcrumb, BreadcrumbItem, Button,Modal, ModalHeader, ModalBody, Label, Row, Col, Container } from 'reactstrap';
import { LocalForm, Control, Errors } from 'react-redux-form'
import { Link } from 'react-router-dom';
import Loading from './LoadingComponent';
import { baseURL } from '../shared/baseUrl';
import { FadeTransform, Stagger, Fade } from 'react-animation-components'; 

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
  
class CommentForm extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        isModalOpen: false
      }
      this.toggleModal= this.toggleModal.bind(this);
    }

    toggleModal(){
      this.setState({
        isModalOpen : !this.state.isModalOpen
      })
    }

    handleSubmit(values){
      this.props.postComment(this.props.dishId,values.rating, values.fullname, values.comment);
    }


  render(){    
        return (      
          <div className="container">  
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                  <ModalHeader toggle={this.toggleModal}>
                    <h3> Submit Comment </h3>
                  </ModalHeader>
                  <ModalBody>
                    <LocalForm onSubmit={(valueS) => this.handleSubmit(valueS)}>
                      <Row className="form-group">
                        <Label md={12} >Rating</Label>
                        <Col md={12}>
                        <Control.select model=".rating" name="rating" className="form-control">
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </Control.select>
                        </Col>
                      </Row>
                      <Row className="form-group">
                        <Label htmlFor="fullname" md={12}>Your Name</Label>
                        <Col md={12}>
                          <Control.text model=".fullname" name="fullname" id="fullname"
                            placeholder="Your name"
                            className="form-control"
                            validators={{required, maxLength: maxLength(20), minLength: minLength(5)}}
                          />
                          <Errors
                            className="text-danger"
                            model=".fullname"
                            show="touched"
                            messages={{
                              required: 'Required. ',
                              maxLength: 'Your name should contian less than 20 characters',
                              minLength: 'Your name should contain more than 5 characters'
                            }}
                          />
                        </Col>
                      </Row>
                      <Row className="form-group">
                        <Label htmlFor="comment" md={12}>Comment</Label>
                        <Col md={12}>
                          <Control.textarea model=".comment" id="comment" name="comment"
                            className="form-control" 
                            rows="6"
                          />
                        </Col>
                      </Row>
                      <Row className="form-group">
                        <Col md={{size:10}}>
                          <Button type="submit" color="primary" onClick={this.toggleModal}>
                            Submit   
                          </Button>
                        </Col>
                        </Row>
                    </LocalForm>
                  </ModalBody>
                </Modal>
                <Button onClick={this.toggleModal} className="btn btn-light">
                  <span className="fa fa-comment"></span> Submit Comment
                </Button>
            </div>
        );
    }
}


function DishDetails(props) {
  if(props.dishesIsLoading){
    return(
      <Container>
        <Row>
          <Loading />
        </Row>
      </Container>
    );
  }

  else if(props.dishesErrMess){
    return(
      <Container>
      <Row>
        <h3> {props.errMess} </h3>
      </Row>
    </Container>
    );
  }
  
  else if(props.dish !=null)
      return(
          <FadeTransform in>
            <div className="dishdetails">
              <div className="container">
                  <div className="row">
                      <Breadcrumb>
                          <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                          <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                      </Breadcrumb>
                      <div className="col-12">
                          <h3>{props.dish.name}</h3>
                          <hr />
                      </div>                
                  </div>
                  <div className="row mt-2 dishdetails__info">
                      <div className="col-md-6 col-12 dishdetails__dishinfo">
                        <RenderDish dish={props.dish} />
                      </div>
                      <div className="col-md-6 col-12 dishdetails__comments">
                      <RenderComments comments={props.comments}
                          postComment={props.postComment}
                          dishId={props.dish.id}
                          errMess={props.commentsErrMess}/>
                      <CommentForm dishId={props.dish.id} postComment={props.postComment} />
                    </div>
                </div>
              </div>
            </div>
        </FadeTransform>
      );
  else
    return <div></div>
}

function RenderDish({dish}){
  return(
    <Card style={{background: '#bda6a6', border: 'none'}}>
      <CardImg width="100%" height="380px" src={dish.image} alt={dish.name} />
        <CardTitle>{dish.name}</CardTitle>
        <CardText>{dish.description}</CardText>
    </Card>
  );
}

function RenderComments({ comments, errMess }){
  if(errMess){
    return(
      <Container>
        <Row>
          {errMess}
        </Row>
      </Container>
    );
  }

  else if(comments!=null)
    return(
        <ul className="list-unstyled">
          <Stagger in>
            {comments.map((item) => {
              return (
                <Fade in>
                  <div key={item.id}>
                    <li>
                      <blockquote style={{color:'white'}}>{item.comment}</blockquote>
                      <blockquote className="blockquote-footer" style={{color: 'white', opacity: 0.5}}><b>{item.author},
                      {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(item.date)))}</b>
                      </blockquote>
                    </li>
                  </div>
                </Fade>
            ); 
          })}
        </Stagger>
      </ul>
    );
  
  
  else  
    return <div></div>  
}
export default DishDetails;








