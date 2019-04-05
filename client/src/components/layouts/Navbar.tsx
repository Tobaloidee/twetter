// Imports
import "@vizuaalog/bulmajs/dist/navbar";
import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar is-info">
          <div className="navbar-brand">
            <Link className="navbar-item" to="/">
              <span className="has-text-weight-bold is-size-4">Twetter</span>
            </Link>

            <a
              aria-expanded="false"
              aria-label="menu"
              className="navbar-burger burger"
              data-target="navbar"
              role="button"
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </a>
          </div>

          <div className="navbar-menu" id="navbar">
            <div className="navbar-start">
              <Link className="navbar-item" to="/">
                Home
              </Link>
            </div>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <a className="button is-primary">Sign Up</a>
                <a className="button is-light">Log in</a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
