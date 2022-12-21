// import logo from "./logo.svg";
import "./App.css";
import HomeScreen from "./homeScreen/homeScreen.view";
import { configureStore, Provider } from "redux-rewire";
function App() {
  const store = configureStore({}, undefined, {
    debug: true,
  });
  return (
    <div className="App">
      <Provider store={store}>
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
      </Provider>
    </div>
  );
}

export default App;
