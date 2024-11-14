import {
  HashRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import Verify from "./pages/Verify";
import './App.css';
import Wallet from "./pages/Wallet";
import Tronscan from "./pages/Tronscan";
import Solana from "./pages/Solana";

function App() {
  return (
    <div className="app">
      <Router basename="/">
          <Routes>
            <Route
              exact
              path="/"
              element={<Home />}
            />
            <Route exact path="/wallet" element={<Wallet />} />
            <Route exact path="/verify/:id" element={<Verify />} />
            <Route exact path="/tronscan" element={<Tronscan />} />
            <Route exact path="/solana" element={<Solana />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
