import {
  createContext,
  useCallback,
  useState,
  useContext,
  useMemo,
} from 'react';
import { CategoryType } from '../@types/Category';
import { SpotType } from '../@types/Spot';
import { Api } from '../services/Api';

// Aqui é definida a Interface com os tipos de dados de tudo que será disponibilizado "para fora" do Provider
interface ISpotsContextProps {
  spot: SpotType[];
  spots: SpotType[];
  categories: CategoryType[];
  searchText: string;
  isLoading: boolean;
  hasError: boolean;
  setSearchText(text: string): void;
  getSpot: (id: number) => Promise<void>;
  getSpots: (text?: string) => Promise<void>;
}

// Aqui é definido o Context (não precisa entender, é sempre exatamente assim)
export const SpotsContext = createContext<ISpotsContextProps>(
  {} as ISpotsContextProps
);

// O useBanners() é o que você vai chamar dentro dos componentes pra acessar o conteúdo interno do Provider. Exemplo:
/*
  const { banners, getBanners } = useBanners();
*/
export const useSpots = (): ISpotsContextProps => {
  const context = useContext(SpotsContext);

  if (!context) {
    throw new Error('useSpots must be within SpotsProvider');
  }

  return context;
};

// Aqui são definidas as variáveis de State e as funções do Provider
export const SpotsProvider: React.FC = ({ children }) => {
  const [spot, setSpot] = useState<SpotType[]>([]);
  const [spots, setSpots] = useState<SpotType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [hasError, setError] = useState(false);
  const [alreadyGot, setAlreadyGot] = useState(false);
  const [searchText, setSearchText] = useState('');

  const getSpots = useCallback(async (): Promise<void> => {
    let url = `/pontos`;

    if (searchText.length > 0) {
      url += `/busca?busca=${searchText}`;
    }
    Api.get(url)
      .then(response => {
        setSpots(response.data.collection);

        if (response.data.categorias) {
          setCategories(response.data.categorias);
        }
      })
      .catch(() => {
        setSpots([]);
        setCategories([]);
      })
      .finally();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getSpot = useCallback(async (): Promise<void> => {
    if (!alreadyGot) {
      setLoading(true);
      setError(false);

      Api.get(`/pontos`)
        .then(response => {
          setAlreadyGot(true);
          setSpot(response.data);
        })
        .catch(() => {
          setSpot([]);
          setError(true);
        })
        .finally(() => setLoading(false));
    }
  }, [alreadyGot]);

  // const getSpots = useCallback(async (): Promise<void> => {
  //   if (!alreadyGot) {
  //     setLoading(true);
  //     setError(false);

  //     Api.get(`/pontos`)
  //       .then(response => {
  //         setAlreadyGot(true);
  //         setSpots(response.data.collection);
  //         setCategories(response.data.categorias);
  //       })
  //       .catch(() => {
  //         setSpots([]);
  //         setError(true);
  //       })
  //       .finally(() => setLoading(false));
  //   }
  // }, [alreadyGot]);

  // const getSpots = useCallback(async (): Promise<void> => {
  //   if (!alreadyGot) {
  //     setLoading(true);
  //     setError(false);

  //  Api.get(`/pontos/busca?busca=${searchText}`)
  //  .then(response => {
  //    setSpots(response.data.collection ?? []);
  //  })
  //  .catch(() => {
  //    setSpot();
  //    setError(true);
  //  })
  // }, [alreadyGot]);

  // Aqui são definidas quais informações estarão disponíveis "para fora" do Provider
  const providerValue = useMemo(
    () => ({
      spot,
      spots,
      categories,
      searchText,
      isLoading,
      hasError,
      setCategories,
      setSearchText,
      getSpot,
      getSpots,
    }),
    [
      spot,
      spots,
      searchText,
      categories,
      isLoading,
      hasError,
      setCategories,
      setSearchText,
      getSpot,
      getSpots,
    ]
  );

  return (
    <SpotsContext.Provider value={providerValue}>
      {children}
    </SpotsContext.Provider>
  );
};