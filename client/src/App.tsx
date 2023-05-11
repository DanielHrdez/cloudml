import { Component } from "solid-js";
import Cost from "./components/cost/Cost";
import Error from "./components/error/Error";
import "./App.module.css";

const App: Component = () => {
  return (
    <div class="flex flex-col sm:flex-row h-screen">
      <Cost />
      <Error />
    </div>
  );
};

export default App;
