import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './styles/App.css'
import Dashboard from "./pages/dashboard/Dashboard";
import Events from "./pages/events/Events";
import PrivateRoute from  "./auth/PrivateRoute"
import PublicRoute from  "./auth/PublicRoute"
import NotFound from './pages/NotFound'
import Login from "./pages/auth/Login";
import Details from "./pages/events/eventsDetails/Details";

const App = () => {
  return (
    <Router>
    <div>
      <Routes>
        <Route element={<NotFound />} path="*" />
        <Route element={<PublicRoute />}>
          <Route element={<Login />} path="/auth/login" />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route element={<Dashboard />} path="/" />
          <Route element={<Events />} path="/events" />
          <Route element={<Details />} path="/events/:eventId/*" />
        </Route>
      </Routes>
    </div>
  </Router>
  );
}

export default App;
