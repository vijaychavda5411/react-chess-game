import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chessgame from "./pages/Chessgame";
import Bot from "./pages/Bot";

function App(){
  return(
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/game" element={<Chessgame />} />
      <Route path="/bot" element={<Bot />} />
    </Routes>
  );
}
export default App;