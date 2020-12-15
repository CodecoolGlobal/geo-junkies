import MainComponent from "./components/MainComponent";
import { CityContextProvider } from "./contexts/CityContext";
import { HighScoreContextProvider } from "./contexts/HighScoreContext";
import { BrowserRouter as Router } from "react-router-dom";

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
