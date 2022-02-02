import { AddressType } from './Address';
import { CategoryType } from './Category';

export type SpotType = {
  nome: string;
  id: number;
  capa?: string;
  categorias: CategoryType[];
  enderecos: AddressType[];
};
