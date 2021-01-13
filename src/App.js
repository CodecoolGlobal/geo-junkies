import MainComponent from "./components/layout/MainComponent";
import { CityContextProvider } from "./contexts/CityContext";
import { UserContextProvider } from "./contexts/UserContext";
import { HighScoreContextProvider } from "./contexts/HighScoreContext";
import { BrowserRouter as Router } from "react-router-dom";
import "./style/App.css";
import { ActualMapContextProvider } from "./contexts/ActualMapContext";

function App() {
  return (
    <UserContextProvider>
      <CityContextProvider>
        <ActualMapContextProvider>
          <HighScoreContextProvider>
            <Router>
              <MainComponent />
            </Router>
          </HighScoreContextProvider>
        </ActualMapContextProvider>
      </CityContextProvider>
    </UserContextProvider>
  );
}

export default App;
