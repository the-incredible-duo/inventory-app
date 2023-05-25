import React, { useState } from "react";
import Card from 'react-bootstrap/Card';
import apiURL from '../api.js';

export const Item = (props) => {
  const { item } = props;
  const [title, setTitle] = useState(item.title);
  const [image, setImage] = useState(item.image);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  }

  const handleImageChange = (event) => {
    setImage(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${apiURL}/items/${item.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, image }),
    })
      .then((response) => response.json())
      .then((updatedItem) => {
        console.log("Item updated", updatedItem);
      })
      .catch((error) => {
        console.log("Error updating item:", error);
      });
  }

  return (
    <>
      <h1>{item.title}</h1>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={item.image} alt={item.title} />
        <Card.Body>
          <Card.Title>{item.title}</Card.Title>
          <Card.Text>{item.description}</Card.Text>
        </Card.Body>
      </Card>

      <h3>{item.name}</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={title} onChange={handleTitleChange} />
        </label>
        <label>
          Image URL:
          <input type="text" value={image} onChange={handleImageChange} />
        </label>
        <button type="submit">Update</button>
      </form>
    </>
  );
}
