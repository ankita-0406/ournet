import React from 'react';
import { Card } from 'react-bootstrap';
import Masonry from 'react-masonry-component';

const Crd = props => {
    return (
        <Masonry>
            <Card style={{ width: '18rem', border: '3px solid green' }}>
                <Card.Body className="homeArticles">
                    <Card.Title className="articleTitle">{props.content}</Card.Title>
                    <Card.Title className="articleWriter">Michael Brodie</Card.Title>
                    <Card.Title className="timeStamp">May 12, 2017</Card.Title>
                </Card.Body>
            </Card>
        </Masonry>
    );
};

export default Crd;