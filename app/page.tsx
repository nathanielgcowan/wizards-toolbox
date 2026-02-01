"use client";
import React from "react";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const [state, useState] = React.useState(() => {
    const saved = window.localStorage.getItem("myAppData");
    if (saved) {
      return JSON.parse(saved);
    } else {
      return [];
    }
  });
  const [newItem, useNewItem] = React.useState({
    id: "",
    checked: false,
    value: 0,
  });

  React.useEffect(() => { 
    useNewItem({
      id: "",
      checked: false,
      value: Math.floor(Math.random() * 100) + 1,
    });
  }, [state]);

  React.useEffect(() => {
    try {
      window.localStorage.setItem("myAppData", JSON.stringify(state));
    } catch (e) {
      console.error("Failed to save to localStorage:", e);
    }
  }, [state]);

  function addItem() {
    useState([...state, { ...newItem, id: uuidv4() }]);
    console.log("Item added:");
  }
  function editItem(e) {
    const newState = state.map((item) =>
      item.id === e.id ? { ...item, checked: !item.checked } : item,
    );
    useState(newState);
  }
  function deleteItem(id) {
    const newState = state.filter((e) => e.id !== id);
    useState(newState);
  }
  // console.log(state);
  return (
    <>
      <h1>Welcome to a Next Js app.</h1>
      <button onClick={addItem}>Add Item</button>
      {state.map((e, i) => {
        // a unique key is required here
        return (
          <p key={e.id}>
            <>{e.value}</>
            <input
              type="checkbox"
              checked={e.checked}
              onChange={() => editItem(e)}
            />
            <button onClick={() => deleteItem(e.id)}>Delete Item</button>
          </p>
        );
      })}
    </>
  );
}
