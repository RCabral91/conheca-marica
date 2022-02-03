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
  // commerce: CommerceType | null;
  commerces: CommerceType[];
  categories: CategoryType[];
  isLoading: boolean;
  errorMessage: string | null;
  searchText: string;
  setSearchText(text: string): void;
  // setCommerce: (commerce: CommerceType | null) => void;
  // getCommerce: (id: number) => Promise<void>;
  getCommerces: () => Promise<void>;
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
  // const [commerce, setCommerce] = useState<CommerceType | null>(null);
  const [commerces, setCommerces] = useState<CommerceType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [alreadyGot, setAlreadyGot] = useState(false);
  const [searchText, setSearchText] = useState('');

  const getCommerces = useCallback(async (): Promise<void> => {
    if (!alreadyGot) {
      setLoading(true);
      setErrorMessage(null);
      try {
        const response = await Api.get(`/comercio-local`);

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
      // commerce,
      commerces,
      categories,
      searchText,
      isLoading,
      errorMessage,
      // setCategories,
      setSearchText,
      // getCommerce,
      getCommerces,
    }),
    [
      // commerce,
      commerces,
      searchText,
      categories,
      isLoading,
      errorMessage,

      setSearchText,
      // getCommerce,
      getCommerces,
    ]
  );

  return (
    <CommercesContext.Provider value={providerValue}>
      {children}
    </CommercesContext.Provider>
  );
};
