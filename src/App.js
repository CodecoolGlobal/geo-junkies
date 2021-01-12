import MainComponent from "./components/layout/MainComponent";
import { CityContextProvider } from "./contexts/CityContext";
import { UserContextProvider } from "./contexts/UserContext";
import { HighScoreContextProvider } from "./contexts/HighScoreContext";
import { BrowserRouter as Router } from "react-router-dom";
import "./style/App.css";

function App() {
  return (
    <UserContextProvider>
      <CityContextProvider>
        <HighScoreContextProvider>
          <Router>
            <MainComponent />
          </Router>
        </HighScoreContextProvider>
      </CityContextProvider>
    </UserContextProvider>
  );
}

export default App;
