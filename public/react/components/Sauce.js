import React from 'react';
import {  useState, useEffect } from "react";
import { router } from "./server/routes/sauces.js";

export const Sauce = (props) => {
  const[name, setName] = useState(props.sauce.name);
  const[image, setImage] = useState(props.sauce.event);

  const handleNameChange = (event) => {
    setName(event.target.value);    // Calls the current event handler
  }

  const handleImageChange = (event) => {
    setImage(event.target.value);
  }

  const handleSubmit = (event) => {   // Fetch request to update item when form is submitted
    event.preventDefault();
    fetch(`${apiURL}/sauces/${props.sauce.id}`, {   // Make fetch request to update the item
      method: `PUT`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name, image}),  // Converts values to JSON strings
    })
    .then((response) => response.json())
    .then((updatedSauce) => {   // Handle the updated sauce data
      console.log("Item updated", updatedSauce);
    })
    .catch((error) => {   // Handle the error if needed
      console.log("Error updating item: ", error);
    });
  }

  return (  // Edit form on Single Item View
    <>
      <h3>{props.sauce.name}</h3>
      <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" value={name} onChange={handleNameChange} />
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

module.exports = Sauce;
	