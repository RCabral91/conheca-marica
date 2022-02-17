/* eslint-disable camelcase */
import { AddressType } from './Address';
import { CategoryType } from './Category';
import { ImageType } from './Image';
import { GeneralInfoType } from './GeneralInfo';
import { OpeningTimeType } from './OpeningTime';
import { PhoneType } from './Phone';
import { NetworkType } from './Network';

export type SpotType = {
  id: number;
  nome: string;
  capa?: string;
  categorias: CategoryType[];
  enderecos: AddressType[];
  addresses: AddressType[];
  images?: ImageType[];
  email?: string;
  site?: string;
  gratuito?: number;
  descricao_t?: string;
  preco_t?: string;
  dicas_t: string;
  phones: PhoneType[];
  horario_funcionamento: OpeningTimeType[];
  viajantes: string;
  estruturas: GeneralInfoType[];
  restricoes: GeneralInfoType[];
  formas_pagamento?: GeneralInfoType[];
  redes: NetworkType[];
  statusCode?: number;
};
