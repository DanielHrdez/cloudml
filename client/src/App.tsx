import { Component } from "solid-js";
import Cost from "./components/Cost";
import Error from "./components/Error";
import Servive from "./components/Service";
import "./App.module.css";

const App: Component = () => {
  return (
    <div class="flex flex-col sm:flex-row h-screen">
      <Servive title="Cost Prediction">
        <Cost />
      </Servive>
      <Servive title="Error Prediction">
        <Error />
      </Servive>
    </div>
  );
};

export default App;
