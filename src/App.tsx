import { AboutCityProvider } from './hooks/AboutCity';
import { BannersProvider } from './hooks/BannerContext';
import { CommercesProvider } from './hooks/CommerceContext';
import { EventsProvider } from './hooks/EventsContext';
import { EventsSpacesProvider } from './hooks/EventsSpaces';
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
                <AboutCityProvider>
                  <EventsSpacesProvider>
                    <EventsProvider>
                      <Routes />
                    </EventsProvider>
                  </EventsSpacesProvider>
                </AboutCityProvider>
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
