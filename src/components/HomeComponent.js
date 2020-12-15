import React from 'react';
import Loading from './LoadingComponent';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Container, Row, Jumbotron} from 'reactstrap';
import { FadeTransform } from 'react-animation-components';

function RenderCard({item, isLoading, errMess}) {
    if(isLoading) {
        return(
        <Container>
            <Row>
                <Loading />
            </Row>
        </Container>
        );
    }

    else if(errMess){
        return(
            <Container>
              <Row>
                <h3> {errMess} </h3>
              </Row>
            </Container>
          );
    }
    else if(item!=null) {
        return(
            <FadeTransform in 
                transformProps={{
                    exitTransform:"scale(0.1) translateY(-10%)"
                }}>
                <Card className="home__subcontent">
                    <CardImg height="300px" src={item.image} alt={item.name} />
                    <CardBody style={{color: 'white', background: "#bda6a6"}}>
                    <CardTitle>{item.name}</CardTitle>
                    {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null }
                    <CardText>{item.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        );
    }

    else 
        return <div></div>
}

function Home(props) {
    return(
            <div className="home">
                <div className="home__content">
                    <Jumbotron>
                        <div className="container">
                            <div className="row row-header">
                                <div className="col-12 col-sm-6">
                                    <h1>Restaurants' name</h1>
                                    <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Ac purus in massa egestas mollis varius;
                                        dignissim elementum. Mollis tincidunt mattis hendrerit dolor eros enim, nisi ligula ornare.
                                        Hendrerit parturient habitant pharetra rutrum gravida porttitor eros feugiat. Mollis elit
                                        sodales taciti duis praesent id. Consequat urna vitae morbi nunc congue.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Jumbotron>
                    <div className="row">
                        <div className="col-12 col-md">
                            <RenderCard item={props.dish}
                            isLoading={props.dishesIsLoading} 
                            errMess={props.dishesErrMess}/>
                        </div>
                        <div className="col-12 col-md">
                            <RenderCard item={props.promotion} 
                            isLoading={props.promotionsIsLoading}
                            errMess={props.promotionsErrMess} />
                        </div>
                        <div className="col-12 col-md">
                            <RenderCard item={props.leader} 
                            isLoading={props.leaderIsLoading}
                            errMess={props.leaderErrMess} />
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default Home;