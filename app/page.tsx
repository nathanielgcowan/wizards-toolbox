"use client";
import React from "react";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const [state, useState] = React.useState([]);
  const [newItem, useNewItem] = React.useState({ id: "", value: 0 });

  function addItem() {
    useState([...state, { ...newItem, id: uuidv4() }]);
    console.log("Item added:");
  }
  function editItem(e) {
    console.log(e);
    const newState = state.map((e, i) => (i === e ? e + 1 : e));
    useState(newState);
    console.log("Item edited");
  }
  function deleteItem(id) {
    const newState = state.filter((e) => e.id !== id);
    useState(newState);
  }
  console.log(state);
  return (
    <>
      <h1>Welcome to a Next Js app.</h1>
      <button onClick={addItem}>Add Item</button>
      {state.map((e, i) => {
        // a unique key is required here
        return (
          <>
            <p key={e.id}>{e.value}</p>
            <button onClick={() => editItem(e)}>Edit Item</button>
            <button onClick={() => deleteItem(e.id)}>Delete Item</button>
          </>
        );
      })}
    </>
  );
}
