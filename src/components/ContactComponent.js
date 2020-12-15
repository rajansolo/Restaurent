import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Col, Label, Button, Row } from 'reactstrap';
import { Form, Control, Errors , actions} from 'react-redux-form';
import { Link } from 'react-router-dom';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => /[0-9]{10}/i.test(val);
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);


class Contact extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    handleSubmit(value) {
        // console.log(`The current state is ${JSON.stringify(value)}`)
        // alert(`The current state is ${JSON.stringify(value)}`)
        alert(this.props.postFeedback(value.firstname, value.lastname, value.telnum, value.email,value.agree, value.contactType, value.message));
        this.props.resetFeedbackForm(); 
    }

    render() {
        return(
            <div className="contactus">
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>Contact Us </h3>
                            <hr />
                        </div>                
                    </div>
                        <div className="row row-content">
                            <div className="col-12">
                            <h3>Location Information</h3>
                            </div>
                            <div className="col-12 col-sm-4 offset-sm-1">
                                    <h5>Our Address</h5>
                                    <address className="footer__info">
                                    Street name<br />
                                    Major area, City<br />
                                    Country<br />
                                    <i className="fa fa-phone"></i>  +852 1234 5678<br />
                                    <i className="fa fa-fax"></i>  +852 8765 4321<br />
                                    <i className="fa fa-envelope"></i>  <a href="mailto:Mrnischal9@gmail.com" className="footer__nav">Mrnischal9@gmail.com</a>
                                    </address>
                            </div>
                            {/* <div className="col-12 col-sm-6 offset-sm-1">
                                <h5>Map of our Location</h5>
                            </div> */}
                            <div className="col-12 col-sm-11 offset-sm-1">
                                <div className="btn-group" role="group">
                                    <a role="button" className="btn btn-secondary mr-1" href="tel:+9779806852202"><i className="fa fa-phone"></i> Call</a>
                                    <a role="button" className="btn btn-secondary mr-1" href="/"><i className="fa fa-skype"></i> Skype</a>
                                    <a role="button" className="btn btn-secondary" href="mailto:Mrnischal9@gmail.com"><i className="fa fa-envelope-o"></i> Email</a>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <h3> Your Feedback</h3>
                            </div>
                            <div className="col-md-9 col-12">
                            <Form  model="feedback" onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Label htmlFor="firstname" md={2}>First Name</Label>
                                    <Col md={10}>
                                        <Control.text model=".firstname" id="firstname" name="firstname"
                                        className="form-control"
                                        placeholder="Firstname" 
                                        validators={{required, maxLength: maxLength(15), minLength: minLength(2)}}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".firstname"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Firstname should be more than 2 characters',
                                                maxLength: 'firstname should not contain more than 15 characters'
                                            }}

                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="lastname" md={2}>Last Name</Label>
                                    <Col md={10}>
                                        <Control.text model=".lastname" id="lastname" name="lastname"
                                        className="form-control"
                                        placeholder="Lastname"
                                        validators={{required, maxLength: maxLength(15), minLength: minLength(2)}}
                                        />
                                    <Errors
                                        className="text-danger"
                                        model=".lastname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'lastname should be more than 2 characters',
                                            maxLength: 'lastname should not contain more than 15 characters'
                                        }}
                                    />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="telnum" md={2}>Tel. Number</Label>
                                    <Col md={10}>
                                        <Control.text model=".telnum" id="telnum" name="telnum" 
                                        className="form-control"
                                        placeholder="Contact number" 
                                        validators={{isNumber, required}}
                                        />
                                    <Errors
                                        className="text-danger"
                                        model=".telnum"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            isNumber: 'Contact information should be a number and should be of 10 digits'
                                        }}
                                    />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="email" md={2}>Email</Label>
                                    <Col md={10}>
                                        <Control.text model=".email" id="email" name="email"
                                        className="form-control"
                                        placeholder="Email"
                                        validators={{validEmail, required}}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".email"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                validEmail: 'Invalid Email'
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={{size: 6, offset:2}}>
                                        <div className="form-check">
                                            <Label check>
                                                <Control.checkbox model=".agree" name="agree"
                                                /> {' '}
                                                    <strong>Can we contact you </strong>
                                            </Label>
                                        </div>
                                    </Col>
                                    <Col md={{size:3, offset: 1}}>
                                        <Control.select model=".contactType" name="contactType" className="form-control">
                                            <option>Tel.</option>
                                            <option>Email</option>
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label md={2} htmlFor="message">Your Feedback</Label>
                                    <Col md={10}>
                                        <Control.textarea model=".message" id="message" name="message"
                                        className="form-control"
                                        rows="12"
                                        /> 
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                <Col md={{size:10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                        Send Feedback
                                    </Button>
                                </Col>
                                </Row>
                            </Form>
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
    
    }
    
export default Contact;