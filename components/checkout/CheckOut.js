import React, { Component } from 'react';
import { Container, Row, Col, ListGroup, Image, Button } from 'react-bootstrap';
import ListItem from './ListItem';
import PaymentDetails from './PaymentDetails';

const CheckOut = () => {
    return (
        <Container>
            <h3>Payment Details</h3>
            <Row>
                <Col>
                    <PaymentDetails />
                </Col>
                <Col className="">
                    <h5>Items</h5>
                    <ListItem />
                </Col>
                {/* <Col>
                    <h5 className=""> Sub-Total</h5>
                </Col> */}

            </Row>
            <Row className="">
                <div className="ml-auto"> <span>Total 900</span></div>
            </Row>
            <Row className=" mt-3" >
                <div className="ml-auto"><Button>Place Order</Button></div>
            </Row>
        </Container>)
};


export default CheckOut;