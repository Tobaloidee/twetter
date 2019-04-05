// Imports
import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

// Components
import { Navbar } from "./components/layouts/Navbar";

// Store
import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
