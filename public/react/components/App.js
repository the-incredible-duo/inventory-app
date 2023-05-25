import React, { useState, useEffect } from 'react';
import { ItemsList } from './ItemList';
import apiURL from '../api.js';

export const App = () => {
  const [items, setItems] = useState([]);

  async function fetchItems() {
    try {
      const response = await fetch(`${apiURL}/items`);
      const itemsData = await response.json();
      console.log(itemsData);
      setItems(itemsData);
    } catch (err) {
      console.log('Oh, an error!', err);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <main>
      <ItemsList items={items} />
    </main>
  );
}
