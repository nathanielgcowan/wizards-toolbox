"use client";
import React from "react";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const [data, setData] = React.useState(null);
  const [rubyList, setRubyList] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [state, setState] = React.useState(() => {
    const saved = window.localStorage.getItem("myAppData");
    if (saved) {
      return JSON.parse(saved);
    } else {
      return [];
    }
  });
  const [newItem, setNewItem] = React.useState({
    id: "",
    checked: false,
    value: 0,
  });

  React.useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon")
      .then((res) => res.json())
      .then((data) => {
        setData(data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  React.useEffect(() => {
    try {
      window.localStorage.setItem("myAppData", JSON.stringify(state));
    } catch (e) {
      console.error("Failed to save to localStorage:", e);
    }
  }, [state]);

  function addItem() {
    setState([...state, { ...newItem, id: uuidv4() }]);
    console.log("Item added:");
  }
  function editItem(e) {
    const newState = state.map((item) =>
      item.id === e.id ? { ...item, checked: !item.checked } : item,
    );
    setState(newState);
  }
  function deleteItem(id) {
    const newState = state.filter((e) => e.id !== id);
    setState(newState);
  }
  function getPokemon() {
    console.log("Pokemon saved!");
    fetch("http://localhost:3001/pokemons")
      .then((res) => res.json())
      .then((data) => {
        console.log("Saved Pokemon:", data);
        setRubyList(data);
      })
      .catch((error) => {
        console.error("Error fetching saved Pokemon:", error);
      });
  }
  function capturePokemon(pokemon) {
    console.log("Capturing Pokemon:", pokemon);
    fetch("http://localhost:3001/pokemons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pokemon),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Pokemon captured:", data);
        getPokemon();
      })
      .catch((error) => {
        console.error("Error capturing Pokemon:", error);
      });
  }
  // console.log(data);
  return (
    <>
      <h2>
        <strong>The Wild</strong>
      </h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        data.map((e) => (
          <p key={e.name}>
            {e.name}
            {""}
            <button onClick={() => capturePokemon(e)}>Capture</button>
          </p>
        ))
      )}

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

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <button onClick={getPokemon}>
          <h2>
            <strong>Caught Pokemon:</strong>
          </h2>
        </button>
      )}
      {rubyList.length > 0 && (
        <div>
          {rubyList.map((pokemon) => (
            <p key={pokemon.id}>{pokemon.name}</p>
          ))}
        </div>
      )}
    </>
  );
}
