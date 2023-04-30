import type { Component } from "solid-js";
import { createSignal } from "solid-js";

import logo from "./logo.svg";
import styles from "./App.module.css";

async function getCostPrediction(time: number, capacity: number) {
  let cost: number = 0;
  await fetch(
    `http://127.0.0.1:5000/api/cost/time=${time}&capacity=${capacity}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      cost = data;
    });
  const costRounded = Math.round(cost * 100) / 100;
  return `AWS process for ${
    time / 60
  } minutes with a max ${capacity} workers will cost: ${costRounded}€`;
}

const App: Component = () => {
  const [cost, setCost] = createSignal("");
  getCostPrediction(3600, 100).then((result) => {
    setCost(result);
  });
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <img src={logo} class={styles.logo} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          class={styles.link}
          href="https://github.com/solidjs/solid"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Solid
        </a>
        <div>{cost}</div>
      </header>
    </div>
  );
};

export default App;
