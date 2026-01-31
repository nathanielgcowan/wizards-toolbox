"use client";
import React from "react";

export default function Home() {
  const [state, useState] = React.useState([]);

  function addItem() {
    const nextItem = state.length;
    useState([...state, nextItem]);
    console.log("Item added:", nextItem);
  }
  function editItem() {
    const newState = state.map((e, i) => (i === 0 ? e + 1 : e));
    useState(newState);
    console.log("Item edited");
  }
  function deleteItem() {
    const newState = state.slice(0, -1);
    useState(newState);
    console.log("Item removed");
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
            <p key={i}>Item {e}</p>
            <button onClick={deleteItem}>Delete Item</button>
          </>
        );
      })}
    </>
  );
}
