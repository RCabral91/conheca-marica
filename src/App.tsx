import { BannersProvider } from './hooks/BannerContext';
import { CommercesProvider } from './hooks/CommerceContext';
import { EventsPlacesProvider } from './hooks/EventsPlaces';
import { HotelsProvider } from './hooks/HotelsContext';
import { PubsNRestsProvider } from './hooks/PubsNRestsContext';
import { SpotsProvider } from './hooks/SpotsContext';
import { Routes } from './Routes';
import { GlobalStyle } from './styles/global';

const App: React.FC = () => {
  return (
    <>
      <BannersProvider>
        <HotelsProvider>
          <SpotsProvider>
            <PubsNRestsProvider>
              <CommercesProvider>
                <EventsPlacesProvider>
                  <Routes />
                </EventsPlacesProvider>
              </CommercesProvider>
            </PubsNRestsProvider>
          </SpotsProvider>
        </HotelsProvider>
      </BannersProvider>
      <GlobalStyle />
    </>
  );
};

export default App;
