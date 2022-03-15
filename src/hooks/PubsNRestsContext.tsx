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
  category?: CategoryType | null;
  categories: CategoryType[];
  isLoading: boolean;
  errorMessage: string | null;
  setPubNRest: (pubNRest: PubNRestType | null) => void;
  getPubNRest: (id: number) => Promise<void>;
  getPubsNRests: (text?: string) => Promise<void>;
  getPubsNRestsByCategory: (id: number) => Promise<void>;
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
  const [category, setCategory] = useState<CategoryType | null>(null);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [alreadyGot, setAlreadyGot] = useState(false);

  const getPubsNRestsByCategory = useCallback(
    async (id): Promise<void> => {
      setLoading(true);
      Api.get(`/restaurantes/categorias/${id}`)
        .then(response => {
          setPubsNRests(response.data.collection);
          const categoryToFind = categories.find(c => c.id === id);
          setCategory(categoryToFind ?? null);
          setAlreadyGot(false);
        })
        .catch(() => {
          setPubsNRests([]);
          setCategory(null);
        })
        .finally(() => setLoading(false));
    },
    [categories]
  );

  const getPubNRest = useCallback(async (id): Promise<void> => {
    setLoading(true);
    Api.get(`/restaurantes/${id}`)
      .then(response => setPubNRest(response.data.item))
      .catch(() => setPubNRest(null))
      .finally(() => setLoading(false));
  }, []);

  const getPubsNRests = useCallback(
    async (searchText = ''): Promise<void> => {
      if (!alreadyGot || searchText.length > 0) {
        setLoading(true);
        setErrorMessage(null);

        const url = searchText
          ? `/restaurantes/busca?busca=${searchText}`
          : '/restaurantes';
        try {
          const response = await Api.get(url, {
            params: {
              fields: 'is_delivery',
            },
          });
          if (!searchText) {
            setCategories(response.data.categorias);
          }
          setPubsNRests(response.data.collection);
          setAlreadyGot(true);
        } catch (e) {
          if (e instanceof Error) setErrorMessage(e.message);
        } finally {
          setLoading(false);
        }
      }
    },
    [alreadyGot]
  );

  // Aqui são definidas quais informações estarão disponíveis "para fora" do Provider
  const providerValue = useMemo(
    () => ({
      pubNRest,
      pubsNRests,
      category,
      categories,
      isLoading,
      errorMessage,
      setCategory,
      setPubNRest,
      getPubNRest,
      getPubsNRests,
      getPubsNRestsByCategory,
    }),
    [
      pubNRest,
      pubsNRests,
      category,
      categories,
      isLoading,
      errorMessage,
      setCategory,
      setPubNRest,
      getPubNRest,
      getPubsNRests,
      getPubsNRestsByCategory,
    ]
  );

  return (
    <PubsNRestsContext.Provider value={providerValue}>
      {children}
    </PubsNRestsContext.Provider>
  );
};
