/* eslint-disable camelcase */
import { AddressType } from './Address';
import { CategoryType } from './Category';
import { GeneralInfoType } from './GeneralInfo';
import { ImageType } from './Image';
import { NetworkType } from './Network';
import { OpeningTimeType } from './OpeningTime';
import { PhoneType } from './Phone';

export type PubNRestType = {
  id: number;
  capa?: string;
  nome: string;
  email?: string;
  site?: string;
  is_delivery?: boolean;
  descricao_t: string;
  addresses: AddressType[];
  images: ImageType[];
  horario_funcionamento: OpeningTimeType[];
  phones: PhoneType[];
  faixa_preco: number;
  categorias: CategoryType[];
  estruturas: GeneralInfoType[];
  formas_pagamento: GeneralInfoType[];
  redes: NetworkType[];
  restricoes: GeneralInfoType[];
  cozinhas: GeneralInfoType[];
  refeicoes: GeneralInfoType[];
  enderecos: AddressType[];
};
