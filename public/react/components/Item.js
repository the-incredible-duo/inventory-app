import React from "react";
import Card from 'react-bootstrap/Card';
import {  useState, useEffect } from "react";
import { router } from "./server/routes/sauces.js";


export const Item = (props) => {
    const { item } = props;
    const[title, setTitle] = useState(props.items.title);
    const[image, setImage] = useState(props.items.event);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);    // Calls the current event handler
      }
    
      const handleImageChange = (event) => {
        setImage(event.target.value);
      }
    
      const handleSubmit = (event) => {   // Fetch request to update item when form is submitted
        event.preventDefault();
        fetch(`${apiURL}/items/${props.items.id}`, {   // Make fetch request to update the item
          method: `PUT`,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({title, image}),  // Converts values to JSON strings
        })
        .then((response) => response.json())
        .then((updatedItem) => {   // Handle the updated sauce data
          console.log("Item updated", updatedItem);
        })
        .catch((error) => {   // Handle the error if needed
          console.log("Error updating item: ", error);
        });
      }

    return (    // Single item form view
        <>
            <h1>{item.title}</h1>
            <Card style={{width: '18rems'}}/>
            <Card.Img variant='top' src='holder.js/100px180'/>
            <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
            </Card.Body>


            <h3>{props.items.name}</h3>   
            <form onSubmit={handleSubmit}>
                <label>
                Name:
                <input type="text" value={title} onChange={handleTitleChange} />
                </label>
                <label>
                Image URL:
                <input type="text" value={image} onChange={handleImageChange} />
                </label>
                <button onClick={handleSubmit} type="submit">Update</button>
            </form>
            </>
    );
}
	