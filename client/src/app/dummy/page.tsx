'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/hello') // Replace with your backend URL
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error('Error fetching items:', err));
  }, []);

  console.log(items);

  return (
    <div>
      <h1>Items</h1>
    </div>
  );
}