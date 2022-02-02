import { BrowserRouter, Routes as Switch, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import Hotels from './pages/Hotels';
import TouristHotspot from './pages/TouristHotspot';
import TouristHotspots from './pages/TouristHotspots';

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="/pontos-turisticos" element={<TouristHotspots />} />
        <Route path="/pontos-turisticos/:id" element={<TouristHotspot />} />
        <Route path="/hoteis-e-pousadas" element={<Hotels />} />
        <Route path="/hoteis-e-pousadas/:id" element={<Hotels />} />
      </Switch>
    </BrowserRouter>
  );
};
