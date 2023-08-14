import { Component } from "solid-js";
import Cost from "./components/cost/Cost";
import Error from "./components/error/Error";
import "./App.module.css";

const App: Component = () => {
  return (
    <main
      class="
        min-h-screen
        flex
        flex-col
        sm:flex-row
        p-2
        gap-2
      "
    >
      <Cost />
      <Error />
    </main>
  );
};

export default App;
