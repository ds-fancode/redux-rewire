// import logo from "./logo.svg";
import "./App.css";
import HomeScreen from "./homeScreen/homeScreen.view";
import { configureStore, RewireProvider } from "redux-rewire";
import reduxLogger from "redux-logger";
import React from "react";
function App() {
  const store = configureStore({}, undefined, {
    middlewares: [reduxLogger],
  });
  return (
    <React.StrictMode>
      <div className="App">
        <RewireProvider store={store}>
          <header className="App-header">
            <span>{`Sample TO-DO App using `}</span>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              redux-rewire
            </a>
          </header>
          <HomeScreen />
        </RewireProvider>
      </div>
    </React.StrictMode>
  );
}

export default App;
