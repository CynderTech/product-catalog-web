import React, { Component } from 'react';
import { Container, Dropdown, ListGroup, Row } from 'react-bootstrap';

const PaymentDetails = () => {
    return (
        <Container>
            <ListGroup variant="flush">
                <ListGroup.Item>Name</ListGroup.Item>
                <ListGroup.Item>Lastname</ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <span>Option</span>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-2" active>Debit</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Credit</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Row>
                </ListGroup.Item>
            </ListGroup>
        </Container>
    )
};

export default PaymentDetails;