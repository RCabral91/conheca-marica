import {
  createContext,
  useCallback,
  useState,
  useContext,
  useMemo,
} from 'react';
import { CategoryType } from '../@types/Category';
import { HotelType } from '../@types/Hotel';
import { Api } from '../services/Api';

// Aqui é definida a Interface com os tipos de dados de tudo que será disponibilizado "para fora" do Provider
interface IHotelsContextProps {
  hotel: HotelType | null;
  hotels: HotelType[];
  categories: CategoryType[];
  isLoading: boolean;
  errorMessage: string | null;
  setHotel: (hotel: HotelType | null) => void;
  getHotel: (id: number) => Promise<void>;
  getHotels: (text?: string) => Promise<void>;
}

// Aqui é definido o Context (não precisa entender, é sempre exatamente assim)
export const HotelsContext = createContext<IHotelsContextProps>(
  {} as IHotelsContextProps
);

// O useBanners() é o que você vai chamar dentro dos componentes pra acessar o conteúdo interno do Provider. Exemplo:
/*
  const { banners, getBanners } = useBanners();
*/
export const useHotels = (): IHotelsContextProps => {
  const context = useContext(HotelsContext);

  if (!context) {
    throw new Error('useHotels must be within HotelsProvider');
  }

  return context;
};

// Aqui são definidas as variáveis de State e as funções do Provider

export const HotelsProvider: React.FC = ({ children }) => {
  const [hotel, setHotel] = useState<HotelType | null>(null);
  const [hotels, setHotels] = useState<HotelType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [alreadyGot, setAlreadyGot] = useState(false);

  const getHotel = useCallback(async (id): Promise<void> => {
    setLoading(true);
    Api.get(`/hoteis-e-pousadas/${id}`)
      .then(response => setHotel(response.data.item))
      .catch(() => setHotel(null))
      .finally(() => setLoading(false));
  }, []);

  const getHotels = useCallback(
    async (searchText = ''): Promise<void> => {
      if (!alreadyGot || searchText.length > 0) {
        setLoading(true);
        setErrorMessage(null);

        const url = searchText
          ? `/hoteis-e-pousadas/busca?busca=${searchText}`
          : '/hoteis-e-pousadas';
        try {
          const response = await Api.get(url);
          if (!searchText) {
            setCategories(response.data.categorias);
          }
          setHotels(response.data.collection);
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
      hotel,
      hotels,
      categories,
      isLoading,
      errorMessage,
      setCategories,
      setHotel,
      getHotel,
      getHotels,
    }),
    [
      hotel,
      hotels,
      categories,
      isLoading,
      errorMessage,
      setCategories,
      setHotel,
      getHotel,
      getHotels,
    ]
  );

  return (
    <HotelsContext.Provider value={providerValue}>
      {children}
    </HotelsContext.Provider>
  );
};
