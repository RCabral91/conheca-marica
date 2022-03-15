import { BrowserRouter, Routes as Switch, Route } from 'react-router-dom';
import { AboutCity } from './pages/AboutCity';
import CategoriesEvents from './pages/CategoriesEvents';
import CategoriesEventsSpaces from './pages/CategoriesEventsSpaces';
import CategoriesHotels from './pages/CategoriesHotels';
import CategoriesPubsNRests from './pages/CategoriesPubsNRests';
import CategoriesSpots from './pages/CategoriesSpots';
import Commerces from './pages/Commerces';
import Events from './pages/Events';
import Event from './pages/Event';
import EventSpace from './pages/EventSpace';

import { Home } from './pages/Home';
import EventsSpaces from './pages/EventsSpaces';
import Hotel from './pages/Hotel';
import Hotels from './pages/Hotels';
import MapOfSpots from './pages/MapOfSpots';
import PubNRest from './pages/PubNRest';
import PubsNRests from './pages/PubsNRests';
import TouristHotspot from './pages/TouristHotspot';
import TouristHotspots from './pages/TouristHotspots';
import MapOfHotels from './pages/MapOfHotels';

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" element={<Home />} />

        {/* Pontos Turísticos */}
        <Route path="/pontos-turisticos" element={<TouristHotspots />} />
        <Route path="/pontos-turisticos/:id" element={<TouristHotspot />} />
        <Route
          path="/pontos-turisticos/:categorias/:id"
          element={<CategoriesSpots />}
        />
        <Route path="/pontos-turisticos/mapa" element={<MapOfSpots />} />

        {/* Hotéis e Pousadas */}
        <Route path="/hoteis-e-pousadas" element={<Hotels />} />
        <Route path="/hoteis-e-pousadas/:id" element={<Hotel />} />
        <Route
          path="/hoteis-e-pousadas/:categorias/:id"
          element={<CategoriesHotels />}
        />
        <Route path="/hoteis-e-pousadas/mapa" element={<MapOfHotels />} />

        {/* Bares e Restaurantes */}
        <Route path="/bares-e-restaurantes" element={<PubsNRests />} />
        <Route path="/bares-e-restaurantes/:id" element={<PubNRest />} />
        <Route
          path="/bares-e-restaurantes/:categorias/:id"
          element={<CategoriesPubsNRests />}
        />

        {/* Commerces */}
        <Route path="/comercio-local" element={<Commerces />} />
        <Route path="/comercio-local/:id" element={<Commerces />} />

        {/* Events Spaces */}
        <Route path="/espacos" element={<EventsSpaces />} />
        <Route path="/espacos/:id" element={<EventSpace />} />
        <Route
          path="/espacos/:categorias/:id"
          element={<CategoriesEventsSpaces />}
        />

        {/* Events */}
        <Route path="/eventos" element={<Events />} />
        <Route path="/eventos/:id" element={<Event />} />
        <Route path="/eventos/:categorias/:id" element={<CategoriesEvents />} />

        {/* About City */}
        <Route path="/sobre" element={<AboutCity />} />
      </Switch>
    </BrowserRouter>
  );
};
