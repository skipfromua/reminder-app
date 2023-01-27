import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './styles/App.css'
import Dashboard from "./pages/dashboard/Dashboard";
import Events from "./pages/events/Events";
import Notifications from "./pages/notifications/Notifications";
import PrivateRoute from  "./auth/PrivateRoute"
import PublicRoute from  "./auth/PublicRoute"
import NotFound from './pages/NotFound'
import Login from "./pages/auth/Login";

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
          <Route path="/" element={<Dashboard />} />
          <Route path="/events" element={<Events />} />
          <Route path="/notifications" element={<Notifications />} />
        </Route>
      </Routes>
    </div>
  </Router>
  );
}

export default App;
