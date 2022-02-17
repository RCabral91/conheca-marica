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
  categories: CategoryType[];
  isLoading: boolean;
  errorMessage: string | null;
  setCommerce: (commerce: CommerceType | null) => void;
  getCommerce: (id: number) => Promise<void>;
  getCommerces: (text?: string) => Promise<void>;
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
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [alreadyGot, setAlreadyGot] = useState(false);

  const getCommerce = useCallback(async (searchText): Promise<void> => {
    let url = `/comercios`;

    if (searchText.length > 0) {
      url += `/busca?busca=${searchText}`;
    }
    Api.get(url)
      .then(response => {
        setCommerces(response.data.collection);

        if (response.data.categorias) {
          setCategories(response.data.categorias);
        }
      })
      .catch(() => {
        setCommerce(commerce);
        setCategories([]);
      })
      .finally();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCommerces = useCallback(async (): Promise<void> => {
    if (!alreadyGot) {
      setLoading(true);
      setErrorMessage(null);
      try {
        const response = await Api.get(`/comercios`);

        if (Array.isArray(response?.data?.collection)) {
          setCommerces(response?.data?.collection);
          setCategories(response?.data?.categorias);
          setAlreadyGot(true);
        } else {
          setCommerces([]);
          setCategories([]);
          setErrorMessage('Error to get commerces.');
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
      commerce,
      commerces,
      categories,
      isLoading,
      errorMessage,
      setCategories,
      setCommerce,
      getCommerce,
      getCommerces,
    }),
    [
      commerce,
      commerces,
      categories,
      isLoading,
      errorMessage,
      setCategories,
      setCommerce,
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
