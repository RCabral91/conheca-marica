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
  pubNRest: PubNRestType | null;
  pubsNRests: PubNRestType[];
  categories: CategoryType[];
  isLoading: boolean;
  errorMessage: string | null;
  setPubNRest: (pubNRest: PubNRestType | null) => void;
  getPubNRest: (id: number) => Promise<void>;
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
  const [pubNRest, setPubNRest] = useState<PubNRestType | null>(null);
  const [pubsNRests, setPubsNRests] = useState<PubNRestType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [alreadyGot, setAlreadyGot] = useState(false);

  const getPubNRest = useCallback(async (searchText): Promise<void> => {
    let url = `/restaurantes`;

    if (searchText.length > 0) {
      url += `/busca?busca=${searchText}`;
    }
    Api.get(url)
      .then(response => {
        setPubsNRests(response.data.collection);

        if (response.data.categorias) {
          setCategories(response.data.categorias);
        }
      })
      .catch(() => {
        setPubNRest(pubNRest);
        setCategories([]);
      })
      .finally();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPubsNRests = useCallback(async (): Promise<void> => {
    if (!alreadyGot) {
      setLoading(true);
      setErrorMessage(null);
      try {
        const response = await Api.get(`/restaurantes`);

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
      pubNRest,
      pubsNRests,
      categories,
      isLoading,
      errorMessage,
      setCategories,
      setPubNRest,
      getPubNRest,
      getPubsNRests,
    }),
    [
      pubNRest,
      pubsNRests,
      categories,
      isLoading,
      errorMessage,
      setPubNRest,
      getPubNRest,
      getPubsNRests,
    ]
  );

  return (
    <PubsNRestsContext.Provider value={providerValue}>
      {children}
    </PubsNRestsContext.Provider>
  );
};
