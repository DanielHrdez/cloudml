import { Component } from "solid-js";
import Cost from "./components/cost/Cost";
import Error from "./components/error/Error";
import "./App.module.css";

const App: Component = () => {
  return (
    <main
      class="
        flex
        flex-col
        sm:flex-row
        h-screen
        p-2
        gap-2
        bg-gray-800
      "
    >
      <Cost />
      <Error />
    </main>
  );
};

export default App;
