import { BannersProvider } from './hooks/BannerContext';
import { HotelsProvider } from './hooks/HotelsContext';
import { SpotsProvider } from './hooks/SpotsContext';
import { Routes } from './Routes';

import { GlobalStyle } from './styles/global';

const App: React.FC = () => {
  return (
    <>
      <BannersProvider>
        <HotelsProvider>
          <SpotsProvider>
            <Routes />
          </SpotsProvider>
        </HotelsProvider>
      </BannersProvider>
      <GlobalStyle />
    </>
  );
};

export default App;
