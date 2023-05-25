import React, { useState, useEffect } from "react";
import { ItemsList } from "./ItemList";
import apiURL from "../api.js";
import Card from "react-bootstrap/Card";

export const App = () => {
  const [items, setItems] = useState([]);
  async function fetchItem() {
    try {
      const response = await fetch(`${apiURL}/items`);
      const itemsData = await response.json();
      console.log(itemsData);
      setItems(itemsData);
    } catch (err) {
      console.log("Oh an error!", err);
    }
  }
  useEffect(() => {
    fetchItem();
  }, []);

  return (
    <main>
      <ItemsList items={items} />
    </main>
  );
};
