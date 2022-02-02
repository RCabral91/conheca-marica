import {
  createContext,
  useCallback,
  useState,
  useContext,
  useMemo,
} from 'react';
import { BannerType } from '../@types/Banner';
import { Api } from '../services/Api';

// Aqui é definida a Interface com os tipos de dados de tudo que será disponibilizado "para fora" do Provider
interface IBannersContextProps {
  banners: BannerType[];
  isLoading: boolean;
  hasError: boolean;
  getBanners: () => Promise<void>;
}

// Aqui é definido o Context (não precisa entender, é sempre exatamente assim)
export const BannersContext = createContext<IBannersContextProps>(
  {} as IBannersContextProps
);

// O useBanners() é o que você vai chamar dentro dos componentes pra acessar o conteúdo interno do Provider. Exemplo:
/*
  const { banners, getBanners } = useBanners();
*/
export const useBanners = (): IBannersContextProps => {
  const context = useContext(BannersContext);

  if (!context) {
    throw new Error('useBanners must be within BannersProvider');
  }

  return context;
};

// Aqui são definidas as variáveis de State e as funções do Provider
export const BannersProvider: React.FC = ({ children }) => {
  const [banners, setBanners] = useState<BannerType[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [hasError, setError] = useState(false);
  const [alreadyGot, setAlreadyGot] = useState(false);

  const getBanners = useCallback(async (): Promise<void> => {
    if (!alreadyGot) {
      setLoading(true);
      setError(false);

      Api.get(`/banners`)
        .then(response => {
          setAlreadyGot(true);
          setBanners(response.data);
        })
        .catch(() => {
          setBanners([]);
          setError(true);
        })
        .finally(() => setLoading(false));
    }
  }, [alreadyGot]);

  // const deleteBanner = () =>

  // Aqui são definidas quais informações estarão disponíveis "para fora" do Provider
  const providerValue = useMemo(
    () => ({
      banners,
      isLoading,
      hasError,
      getBanners,
    }),
    [banners, isLoading, hasError, getBanners]
  );

  return (
    <BannersContext.Provider value={providerValue}>
      {children}
    </BannersContext.Provider>
  );
};
