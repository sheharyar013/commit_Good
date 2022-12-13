import React from "react";
import { Routes } from "./routes";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "./app/store";

// import { Routes } from './views/preLaunch/routes'

function App() {
  return (
    <>
      <ToastContainer position="top-center" hideProgressBar />
      <Provider store={store}>
        <Routes />
      </Provider>
    </>
  );
}

export default App;
