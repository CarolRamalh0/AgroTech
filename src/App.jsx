import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Culturas from "./pages/Culturas";
import Plantacoes from "./pages/Plantacoes";
import Sobre from "./pages/Sobre";
import NaoEncontrada from "./pages/NaoEncontrada";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="culturas" element={<Culturas />} />
        <Route path="plantacoes" element={<Plantacoes />} />
        <Route path="sobre" element={<Sobre />} />
        <Route path="*" element={<NaoEncontrada />} />
      </Route>
    </Routes>
  );
}