import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import MapTool from './pages/MapTool';
import CompressTool from './pages/CompressTool';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="map" element={<MapTool />} />
        <Route path="compress" element={<CompressTool />} />
      </Route>
    </Routes>
  );
}

export default App;
