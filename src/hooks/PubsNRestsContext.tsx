import {
  createContext,
  useCallback,
  useState,
  useContext,
  useMemo,
} from 'react';
import { CategoryType } from '../@types/Category';
import { PubNRestType } from '../@types/PubNRest';
import { Api } from '../services/Api';

// Aqui é definida a Interface com os tipos de dados de tudo que será disponibilizado "para fora" do Provider
interface IPubsNRestsContextProps {
  // pubNRest: PubNRestType | null;
  pubsNRests: PubNRestType[];
  categories: CategoryType[];
  isLoading: boolean;
  errorMessage: string | null;
  searchText: string;
  setSearchText(text: string): void;
  // setPubNRest: (pubNRest: PubNRestType | null) => void;
  // getPubNRest: (id: number) => Promise<void>;
  getPubsNRests: (text?: string) => Promise<void>;
}

// Aqui é definido o Context (não precisa entender, é sempre exatamente assim)
export const PubsNRestsContext = createContext<IPubsNRestsContextProps>(
  {} as IPubsNRestsContextProps
);

// O useBanners() é o que você vai chamar dentro dos componentes pra acessar o conteúdo interno do Provider. Exemplo:
/*
  const { banners, getBanners } = useBanners();
*/
export const usePubsNRests = (): IPubsNRestsContextProps => {
  const context = useContext(PubsNRestsContext);

  if (!context) {
    throw new Error('usePubsNRests must be within PubsNRestsProvider');
  }

  return context;
};

// Aqui são definidas as variáveis de State e as funções do Provider

export const PubsNRestsProvider: React.FC = ({ children }) => {
  // const [pubNRest, setPubNRest] = useState<PubNRestType | null>(null);
  const [pubsNRests, setPubsNRests] = useState<PubNRestType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [alreadyGot, setAlreadyGot] = useState(false);
  const [searchText, setSearchText] = useState('');

  const getPubsNRests = useCallback(async (): Promise<void> => {
    if (!alreadyGot) {
      setLoading(true);
      setErrorMessage(null);
      try {
        const response = await Api.get(`/bares-e-restaurantes`);

        if (Array.isArray(response?.data?.collection)) {
          setPubsNRests(response?.data?.collection);
          setCategories(response?.data?.categorias);
          setAlreadyGot(true);
        } else {
          setPubsNRests([]);
          setCategories([]);
          setErrorMessage('Error to get Pubs and Restaurants.');
        }
      } catch (e) {
        if (e instanceof Error) setErrorMessage(e.message);
      } finally {
        setLoading(false);
      }
    }
  }, [alreadyGot]);

  // Aqui são definidas quais informações estarão disponíveis "para fora" do Provider
  const providerValue = useMemo(
    () => ({
      // pubNRest,
      pubsNRests,
      categories,
      searchText,
      isLoading,
      errorMessage,
      setCategories,
      setSearchText,
      // getPubNRest,
      getPubsNRests,
    }),
    [
      // pubNRest,
      pubsNRests,
      searchText,
      categories,
      isLoading,
      errorMessage,
      setSearchText,
      // getPubNRest,
      getPubsNRests,
    ]
  );

  return (
    <PubsNRestsContext.Provider value={providerValue}>
      {children}
    </PubsNRestsContext.Provider>
  );
};
