import {
  createContext,
  useCallback,
  useState,
  useContext,
  useMemo,
} from 'react';
import { CategoryType } from '../@types/Category';
import { EventPlaceType } from '../@types/EventPlace';
import { Api } from '../services/Api';

// Aqui é definida a Interface com os tipos de dados de tudo que será disponibilizado "para fora" do Provider
interface IEventsPlacesContextProps {
  eventPlace: EventPlaceType | null;
  eventsPlaces: EventPlaceType[];
  categories: CategoryType[];
  isLoading: boolean;
  errorMessage: string | null;
  setEventPlace: (eventPlace: EventPlaceType | null) => void;
  getEventPlace: (id: number) => Promise<void>;
  getEventsPlaces: (text?: string) => Promise<void>;
}

// Aqui é definido o Context (não precisa entender, é sempre exatamente assim)
export const EventsPlacesContext = createContext<IEventsPlacesContextProps>(
  {} as IEventsPlacesContextProps
);

// O useBanners() é o que você vai chamar dentro dos componentes pra acessar o conteúdo interno do Provider. Exemplo:

export const useEventsPlaces = (): IEventsPlacesContextProps => {
  const context = useContext(EventsPlacesContext);

  if (!context) {
    throw new Error('useEventsPlaces must be within EventsPlacesProvider');
  }

  return context;
};

// Aqui são definidas as variáveis de State e as funções do Provider

export const EventsPlacesProvider: React.FC = ({ children }) => {
  const [eventPlace, setEventPlace] = useState<EventPlaceType | null>(null);
  const [eventsPlaces, setEventsPlaces] = useState<EventPlaceType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [alreadyGot, setAlreadyGot] = useState(false);

  const getEventPlace = useCallback(async (searchText): Promise<void> => {
    let url = `/espacos`;

    if (searchText.length > 0) {
      url += `/busca?busca=${searchText}`;
    }
    Api.get(url)
      .then(response => {
        setEventsPlaces(response.data.collection);

        if (response.data.categorias) {
          setCategories(response.data.categorias);
        }
      })
      .catch(() => {
        setEventsPlaces([]);
        setCategories([]);
      })
      .finally();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getEventsPlaces = useCallback(async (): Promise<void> => {
    if (!alreadyGot) {
      setLoading(true);
      setErrorMessage(null);
      try {
        const response = await Api.get(`/espacos`);

        if (Array.isArray(response?.data?.collection)) {
          setEventsPlaces(response?.data?.collection);
          setCategories(response?.data?.categorias);
          setAlreadyGot(true);
        } else {
          setEventPlace(null);
          setCategories([]);
          setErrorMessage('Error to get EventsPlaces.');
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
      eventPlace,
      eventsPlaces,
      categories,
      isLoading,
      errorMessage,
      setCategories,
      setEventPlace,
      getEventPlace,
      getEventsPlaces,
    }),
    [
      eventPlace,
      eventsPlaces,
      categories,
      isLoading,
      errorMessage,
      setEventPlace,
      getEventPlace,
      getEventsPlaces,
    ]
  );

  return (
    <EventsPlacesContext.Provider value={providerValue}>
      {children}
    </EventsPlacesContext.Provider>
  );
};
