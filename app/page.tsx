"use client";
import React from "react";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const [state, useState] = React.useState([]);

  function addItem() {
    useState([
      ...state,
      {
        id: uuidv4(),
        value: 0,
      },
    ]);
    console.log("Item added:");
  }
  function editItem(e) {
    console.log(e);
    const newState = state.map((e, i) => (i === e ? e + 1 : e));
    useState(newState);
    console.log("Item edited");
  }
  function deleteItem(e) {
    // const newState = state.slice(0, -1);
    const newState = state.filter((_, i) => i !== e);
    useState(newState);
    console.log(e);
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
            <button onClick={() => editItem(i)}>Edit Item</button>
            <button onClick={() => deleteItem(i)}>Delete Item</button>
          </>
        );
      })}
    </>
  );
}
