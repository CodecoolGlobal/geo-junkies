import MainComponent from "./components/layout/MainComponent";
import { CityContextProvider } from "./contexts/CityContext";
import { HighScoreContextProvider } from "./contexts/HighScoreContext";
import { BrowserRouter as Router } from "react-router-dom";
import "./style/App.css";

function App() {
  return (
    <CityContextProvider>
      <HighScoreContextProvider>
        <Router>
          <MainComponent />
        </Router>
      </HighScoreContextProvider>
    </CityContextProvider>
  );
}

export default App;
