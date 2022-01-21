import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login/Login";
import SearchPage from "./pages/search-page/SearchPage";
import RequireAuth from "./service/authentication/RequireAuth";
import SearchResultsPage from "./pages/search-results/SearchResultsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <SearchPage />
            </RequireAuth>
          }
        />
        <Route
          path="/search-results"
          element={
            <RequireAuth>
              <SearchResultsPage />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
