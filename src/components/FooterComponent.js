import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class Footer extends Component {
    render() {
        return (
            <>
                <div className="footer">
                    <div className="container">
                        <div className="row justify-content-center">             
                            <div className="col-4 offset-1 col-sm-2">
                                <h5>Links</h5>
                                <ul className="list-unstyled">
                                    <li><Link to="/home" className="footer__nav">Home</Link></li>
                                    <li><Link to="/aboutus" className="footer__nav">About</Link></li>
                                    <li> <Link to="/menu" className="footer__nav">Menu </Link></li>
                                    <li><Link to="/contactus" className="footer__nav">Contact</Link></li>
                                </ul>
                            </div>
                            <div className="col-7 col-sm-5">
                                <h5>Our Address</h5>
                                <address className="footer__info">
                                Street name<br />
                                Major Area, city<br />
                                Country<br />
                                <i className="fa fa-phone fa-lg"></i>: +051 1234567<br />
                                <i className="fa fa-fax fa-lg"></i>: +123 743287<br />
                                <i className="fa fa-envelope fa-lg"></i>: <a href="mailto:mrnischal9@gmail.com" className="footer__nav">
                                    Mrnischal9@gmail.com</a>
                                </address>
                            </div>
                            <div className="col-12 col-sm-4 align-self-center">
                                <div className="text-center">
                                    <a className="btn btn-social-icon btn-google" href="http://google.com/+"><i className="fa fa-google-plus"></i></a>
                                    <a className="btn btn-social-icon btn-facebook" href="http://www.facebook.com/profile.php?id="><i className="fa fa-facebook"></i></a>
                                    <a className="btn btn-social-icon btn-linkedin" href="http://www.linkedin.com/in/"><i className="fa fa-linkedin"></i></a>
                                    <a className="btn btn-social-icon btn-twitter" href="http://twitter.com/"><i className="fa fa-twitter"></i></a>
                                    <a className="btn btn-social-icon btn-google" href="http://youtube.com/"><i className="fa fa-youtube"></i></a>
                                    <a className="btn btn-social-icon" href="mailto:Mrnischal9@gmail.com"><i className="fa fa-envelope-o"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center">             
                            <div className="col-auto">
                                <p>© Copyright 2020  Restaurants' Name</p>
                            </div>
                        </div>
                    </div>
                </div>  
            </>
        )
    }
}

export default Footer;
