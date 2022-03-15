/* eslint-disable camelcase */
import { AddressType } from './Address';
import { CategoryType } from './Category';
import { GeneralInfoType } from './GeneralInfo';
import { ImageType } from './Image';
import { NetworkType } from './Network';
import { PhoneType } from './Phone';

export type EventType = {
  id: number;
  nome: string;
  capa?: string;
  site?: string;
  gratuito?: boolean;
  url_ingresso?: string;
  preco_t?: string;
  datahora_inicio: string;
  datahora_inicio_f?: string;
  datahora_fim_f?: string;
  descricao_t?: string;
  addresses: AddressType[];
  images?: ImageType[];
  phones?: PhoneType[];
  categorias: CategoryType[];
  estruturas?: GeneralInfoType[];
  formas_pagamento?: GeneralInfoType[];
  redes?: NetworkType[];
  restricoes?: GeneralInfoType[];
  enderecos: AddressType[];
  email?: string;
};
