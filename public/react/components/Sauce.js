import React from 'react';
import {  useState, useEffect } from "react";

export const Sauce = (props) => {
  const[name, setName] = useState(props.sauce.name);
  const[image, setImage] = useState(props.sauce.event);

  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  const handleImageChange = (event) => {
    setImage(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${apiURL}/sauces/${props.sauce.id}`, {
      method: `PUT`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name, image}),
    })
    .then((response) => response.json())
    .then((updatedSauce) => {
      console.log("Item updated", updatedSauce);
    })
    .catch((error) => {
      console.log("Error updating item: ", error);
    });
  }

  return (
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
          <button type="submit">Update</button>
        </form>
    </>
  );
};
	