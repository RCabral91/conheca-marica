import {
  createContext,
  useCallback,
  useState,
  useContext,
  useMemo,
} from 'react';
import { CategoryType } from '../@types/Category';
import { EventSpaceType } from '../@types/EventSpace';
import { Api } from '../services/Api';

// Aqui é definida a Interface com os tipos de dados de tudo que será disponibilizado "para fora" do Provider
interface IEventsSpacesContextProps {
  eventSpace: EventSpaceType | null;
  eventsSpaces: EventSpaceType[];
  category?: CategoryType | null;
  categories: CategoryType[];
  isLoading: boolean;
  errorMessage: string | null;
  setEventSpace: (eventSpace: EventSpaceType | null) => void;
  getEventSpace: (id: number) => Promise<void>;
  getEventsSpaces: (text?: string) => Promise<void>;
  getEventsSpacesByCategory: (id: number) => Promise<void>;
}

// Aqui é definido o Context (não precisa entender, é sempre exatamente assim)
export const EventsSpacesContext = createContext<IEventsSpacesContextProps>(
  {} as IEventsSpacesContextProps
);

// O useBanners() é o que você vai chamar dentro dos componentes pra acessar o conteúdo interno do Provider. Exemplo:
/*
  const { banners, getBanners } = useBanners();
*/
export const useEventsSpaces = (): IEventsSpacesContextProps => {
  const context = useContext(EventsSpacesContext);

  if (!context) {
    throw new Error('useEventsSpaces must be within EventsSpacesProvider');
  }

  return context;
};

// Aqui são definidas as variáveis de State e as funções do Provider
export const EventsSpacesProvider: React.FC = ({ children }) => {
  const [eventSpace, setEventSpace] = useState<EventSpaceType | null>(null);
  const [eventsSpaces, setEventsSpaces] = useState<EventSpaceType[]>([]);
  const [category, setCategory] = useState<CategoryType | null>(null);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [alreadyGot, setAlreadyGot] = useState(false);

  const getEventsSpacesByCategory = useCallback(
    async (id): Promise<void> => {
      setLoading(true);
      Api.get(`/espacos/categorias/${id}`)
        .then(response => {
          setEventsSpaces(response.data.collection);
          const categoryToFind = categories.find(c => c.id === id);
          setCategory(categoryToFind ?? null);
          setAlreadyGot(false);
        })
        .catch(() => {
          setEventsSpaces([]);
          setCategory(null);
        })
        .finally(() => setLoading(false));
    },
    [categories]
  );

  const getEventSpace = useCallback(async (id): Promise<void> => {
    setLoading(true);
    Api.get(`/espacos/${id}`)
      .then(response => setEventSpace(response.data.item))
      .catch(() => setEventSpace(null))
      .finally(() => setLoading(false));
  }, []);

  const getEventsSpaces = useCallback(
    async (searchText = ''): Promise<void> => {
      if (!alreadyGot || searchText.length > 0) {
        setLoading(true);
        setErrorMessage(null);

        const url = searchText
          ? `/espacos/busca?busca=${searchText}`
          : '/espacos';
        try {
          const response = await Api.get(url);
          if (!searchText) {
            setCategories(response.data.categorias);
          }
          setEventsSpaces(response.data.collection);
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
      eventSpace,
      eventsSpaces,
      category,
      categories,
      isLoading,
      errorMessage,
      setCategory,
      getEventsSpacesByCategory,
      setEventSpace,
      getEventSpace,
      getEventsSpaces,
    }),
    [
      eventSpace,
      eventsSpaces,
      category,
      categories,
      isLoading,
      errorMessage,
      setCategory,
      getEventsSpacesByCategory,
      setEventSpace,
      getEventSpace,
      getEventsSpaces,
    ]
  );

  return (
    <EventsSpacesContext.Provider value={providerValue}>
      {children}
    </EventsSpacesContext.Provider>
  );
};
