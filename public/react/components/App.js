import React, { useState, useEffect } from 'react';
import { ItemsList } from './ItemList';
import apiURL from '../api.js';

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
    
    return(
        <>
            <h1>Inventory Items</h1>
        </>
    )
}