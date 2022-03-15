import {
  createContext,
  useCallback,
  useState,
  useContext,
  useMemo,
} from 'react';
import { CategoryType } from '../@types/Category';
import { EventType } from '../@types/Event';
import { Api } from '../services/Api';

// Aqui é definida a Interface com os tipos de dados de tudo que será disponibilizado "para fora" do Provider
interface IEventsContextProps {
  event: EventType | null;
  events: EventType[];
  category?: CategoryType | null;
  categories: CategoryType[];
  isLoading: boolean;
  errorMessage: string | null;
  setEvent: (event: EventType | null) => void;
  getEvent: (id: number) => Promise<void>;
  getEvents: (text?: string) => Promise<void>;
  getEventsByCategory: (id: number) => Promise<void>;
}

// Aqui é definido o Context (não precisa entender, é sempre exatamente assim)
export const EventsContext = createContext<IEventsContextProps>(
  {} as IEventsContextProps
);

// O useBanners() é o que você vai chamar dentro dos componentes pra acessar o conteúdo interno do Provider. Exemplo:
/*
  const { banners, getBanners } = useBanners();
*/
export const useEvents = (): IEventsContextProps => {
  const context = useContext(EventsContext);

  if (!context) {
    throw new Error('useEvents must be within EventsProvider');
  }

  return context;
};

// Aqui são definidas as variáveis de State e as funções do Provider
export const EventsProvider: React.FC = ({ children }) => {
  const [event, setEvent] = useState<EventType | null>(null);
  const [events, setEvents] = useState<EventType[]>([]);
  const [category, setCategory] = useState<CategoryType | null>(null);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [alreadyGot, setAlreadyGot] = useState(false);

  const getEventsByCategory = useCallback(
    async (id): Promise<void> => {
      setLoading(true);
      Api.get(`/eventos/categorias/${id}`)
        .then(response => {
          setEvents(response.data.collection);
          const categoryToFind = categories.find(c => c.id === id);
          setCategory(categoryToFind ?? null);
          setAlreadyGot(false);
        })
        .catch(() => {
          setEvents([]);
          setCategory(null);
        })
        .finally(() => setLoading(false));
    },
    [categories]
  );

  const getEvent = useCallback(async (id): Promise<void> => {
    setLoading(true);
    Api.get(`/eventos/${id}`)
      .then(response => setEvent(response.data.item))
      .catch(() => setEvent(null))
      .finally(() => setLoading(false));
  }, []);

  const getEvents = useCallback(
    async (searchText = ''): Promise<void> => {
      if (!alreadyGot || searchText.length > 0) {
        setLoading(true);
        setErrorMessage(null);

        const url = searchText
          ? `/eventos/busca?busca=${searchText}`
          : '/eventos';
        try {
          const response = await Api.get(url, {
            params: {
              fields: 'datahora_inicio',
              orderby: 'datahora_inicio',
              order: 'asc',
            },
          });
          if (!searchText) {
            setCategories(response.data.categorias);
          }
          setEvents(response.data.collection);
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
      event,
      events,
      category,
      categories,
      isLoading,
      errorMessage,
      setCategory,
      setEvent,
      getEvent,
      getEvents,
      getEventsByCategory,
    }),
    [
      event,
      events,
      category,
      categories,
      isLoading,
      errorMessage,
      setCategory,
      setEvent,
      getEvent,
      getEvents,
      getEventsByCategory,
    ]
  );

  return (
    <EventsContext.Provider value={providerValue}>
      {children}
    </EventsContext.Provider>
  );
};
