import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <div className="h-screen w-screen">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute />} />
      </Routes>
    </div>
  );
}

export default App;
