// Imports
import React, { Component } from "react";
import { Provider } from "react-redux";

// Store
import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <h1>Hello Twetter!</h1>
        </div>
      </Provider>
    );
  }
}

export default App;
