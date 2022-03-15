import {
  createContext,
  useCallback,
  useState,
  useContext,
  useMemo,
} from 'react';
import { Api } from '../services/Api';

// Aqui é definida a Interface com os tipos de dados de tudo que será disponibilizado "para fora" do Provider
interface IAboutCityContextProps {
  aboutCity: string;
  isLoading: boolean;
  getAboutCity: () => Promise<void>;
}

// Aqui é definido o Context (não precisa entender, é sempre exatamente assim)
export const AboutCityContext = createContext<IAboutCityContextProps>(
  {} as IAboutCityContextProps
);

// O useBanners() é o que você vai chamar dentro dos componentes pra acessar o conteúdo interno do Provider. Exemplo:
/*
  const { banners, getBanners } = useBanners();
*/
export const useAboutCity = (): IAboutCityContextProps => {
  const context = useContext(AboutCityContext);

  if (!context) {
    throw new Error('useBanners must be within BannersProvider');
  }

  return context;
};

// Aqui são definidas as variáveis de State e as funções do Provider
export const AboutCityProvider: React.FC = ({ children }) => {
  const [aboutCity, setAboutCity] = useState('');
  const [isLoading, setLoading] = useState(true);

  const getAboutCity = useCallback(async (): Promise<void> => {
    setLoading(true);

    Api.get('/apps/get')
      .then(response => {
        setAboutCity(response?.data?.sobre?.content);
      })
      .catch()
      .finally(() => setLoading(false));
  }, []);

  // Aqui são definidas quais informações estarão disponíveis "para fora" do Provider
  const providerValue = useMemo(
    () => ({
      aboutCity,
      isLoading,
      getAboutCity,
    }),
    [aboutCity, isLoading, getAboutCity]
  );

  return (
    <AboutCityContext.Provider value={providerValue}>
      {children}
    </AboutCityContext.Provider>
  );
};

// Agora é só chamar esse provider em volta do Routes:

/*
  <BannersProvider>
      <Routes />
  </BannersProvider>
*/
