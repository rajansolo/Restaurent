import React from 'react';
import Loading from './LoadingComponent';
import {  Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { baseURL } from '../shared/baseUrl';
import { FadeTransform } from 'react-animation-components'

function RenderMenuItems({dish}){
    return(
    <FadeTransform in 
      transformProps={{
        exitTransform:"scale(0.1) translateY(-10%)"
      }}>
      <Card>
        <Link to={`/menu/${dish.id}`}>
          <CardImg width="100%" height="400px" src={dish.image} alt={dish.name} />
          <CardImgOverlay>
            <CardTitle className="menu__dish__header">{dish.name}</CardTitle>
          </CardImgOverlay>
          </Link>
      </Card>
    </FadeTransform>
   );
  }

function Menu(props) {
    const menu = props.dishes.map((dish) => {
      return (
        <div className="col-md-5" key={dish.id}>
          <RenderMenuItems dish={dish} isLoading={props.isLoading} errMess={props.errMess}/>
        </div>
      );
    });

    if(props.isLoading){
      return(
        <Container>
            <Row>
                <Loading />
            </Row>
        </Container>
      );
      }

    else if(props.errMess) {
      return(
        <Container>
          <Row>
            <h3> {props.errMess} </h3>
          </Row>
        </Container>
      );
    }
    
    else if(props.dishes){
      return (
        <div className="menu">
          <div className="container">
            <div className="row ml-1">
              <Breadcrumb>
                <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                <BreadcrumbItem active> Menu</BreadcrumbItem>
              </Breadcrumb>
            </div>
            <div className="row">
              {menu} 
            </div>
          </div>  
        </div>
      );
    }

    
  else 
  return <div></div>
}

export default Menu;