import React from "react";
import Card from 'react-bootstrap/Card';

export const Item = (props) => {
    const { item } = props;
    return <>
        <h1>{item.title}</h1>
        <Card style={{width: '18rems'}}/>
        <Card.Img variant='top' src='holder.js/100px180'/>
        <Card.Body>
            <Card.Title>{item.title}</Card.Title>
            <Card.Text>{item.description}</Card.Text>
        </Card.Body>
        <h1>Hello!</h1>
    </>
}
	