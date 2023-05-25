import React from 'react';
import {  useState, useEffect } from "react";
import { router } from "./server/routes/sauces.js";

export const Item = (props) => {
  const[title, setTitle] = useState(props.sauce.title);
  const[image, setImage] = useState(props.sauce.event);

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

  return (  // Edit form on Single Item View
    <>
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
};

module.exports = Item;
	