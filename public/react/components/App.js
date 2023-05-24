import React, { useState, useEffect } from 'react';
import { ItemsList } from './ItemList';
import apiURL from '../api.js';
import Card from 'react-bootstrap/Card';

export const App = () => {
    const[items, setItems] = useState([]);
    async function fetchItem(){
        try{
            const response = await fetch(`${apiURL}/items`);
            const itemsData = await response.json();
            setItems(itemsData);
        }catch(err){
            console.log('Oh an error!',err)
        }
    }
    useEffect(() => {
        fetchItem();
    },[]);
    
    function cardItem(){
        return(
            <main>
                <Card style={{width: '18rems'}}/>
                <Card.Img variant='top' src='holder.js/100px180'/>
                <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                </Card.Body>
            </main>
        )
    }
}