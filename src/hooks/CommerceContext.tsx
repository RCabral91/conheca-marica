import {
  createContext,
  useCallback,
  useState,
  useContext,
  useMemo,
} from 'react';
import { CategoryType } from '../@types/Category';
import { CommerceType } from '../@types/Commerce';
import { Api } from '../services/Api';

// Aqui é definida a Interface com os tipos de dados de tudo que será disponibilizado "para fora" do Provider
interface ICommercesContextProps {
  commerce: CommerceType | null;
  commerces: CommerceType[];
  category?: CategoryType | null;
  categories: CategoryType[];
  isLoading: boolean;
  errorMessage: string | null;
  setCommerce: (commerce: CommerceType | null) => void;
  getCommerce: (id: number) => Promise<void>;
  getCommerces: (text?: string) => Promise<void>;
  getCommercesByCategory: (id: number) => Promise<void>;
}

// Aqui é definido o Context (não precisa entender, é sempre exatamente assim)
export const CommercesContext = createContext<ICommercesContextProps>(
  {} as ICommercesContextProps
);

// O useBanners() é o que você vai chamar dentro dos componentes pra acessar o conteúdo interno do Provider. Exemplo:
/*
  const { banners, getBanners } = useBanners();
*/
export const useCommerces = (): ICommercesContextProps => {
  const context = useContext(CommercesContext);

  if (!context) {
    throw new Error('useCommerces must be within CommercesProvider');
  }

  return context;
};

// Aqui são definidas as variáveis de State e as funções do Provider
export const CommercesProvider: React.FC = ({ children }) => {
  const [commerce, setCommerce] = useState<CommerceType | null>(null);
  const [commerces, setCommerces] = useState<CommerceType[]>([]);
  const [category, setCategory] = useState<CategoryType | null>(null);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [alreadyGot, setAlreadyGot] = useState(false);

  const getCommercesByCategory = useCallback(
    async (id): Promise<void> => {
      setLoading(true);
      Api.get(`/comercios/categorias/${id}`)
        .then(response => {
          setCommerces(response.data.collection);
          const categoryToFind = categories.find(c => c.id === id);
          setCategory(categoryToFind ?? null);
          setAlreadyGot(false);
        })
        .catch(() => {
          setCommerces([]);
          setCategory(null);
        })
        .finally(() => setLoading(false));
    },
    [categories]
  );

  const getCommerce = useCallback(async (id): Promise<void> => {
    setLoading(true);
    Api.get(`/comercios/${id}`)
      .then(response => setCommerce(response.data.item))
      .catch(() => setCommerce(null))
      .finally(() => setLoading(false));
  }, []);

  const getCommerces = useCallback(
    async (searchText = ''): Promise<void> => {
      if (!alreadyGot || searchText.length > 0) {
        setLoading(true);
        setErrorMessage(null);

        const url = searchText
          ? `/comercios/busca?busca=${searchText}`
          : '/comercios';
        try {
          const response = await Api.get(url);
          if (!searchText) {
            setCategories(response.data.categorias);
          }
          setCommerces(response.data.collection);
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
      commerce,
      commerces,
      category,
      categories,
      isLoading,
      errorMessage,
      setCategory,
      setCommerce,
      getCommerce,
      getCommercesByCategory,
      getCommerces,
    }),
    [
      commerce,
      commerces,
      category,
      categories,
      isLoading,
      errorMessage,
      setCategory,
      setCommerce,
      getCommercesByCategory,
      getCommerce,
      getCommerces,
    ]
  );

  return (
    <CommercesContext.Provider value={providerValue}>
      {children}
    </CommercesContext.Provider>
  );
};
