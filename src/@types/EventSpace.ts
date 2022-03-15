/* eslint-disable camelcase */
import { AddressType } from './Address';
import { CategoryType } from './Category';
import { EquipmentType } from './Equipment';
import { GeneralInfoType } from './GeneralInfo';
import { ImageType } from './Image';
import { NetworkType } from './Network';
import { OpeningTimeType } from './OpeningTime';
import { PhoneType } from './Phone';
import { SpaceType } from './Space';

export type EventSpaceType = {
  id: number;
  capa?: string;
  nome: string;
  email?: string;
  site?: string;
  buffet?: number;
  descricao_t?: string;
  addresses: AddressType[];
  images?: ImageType[];
  horario_funcionamento?: OpeningTimeType[];
  phones: PhoneType[];
  categorias: CategoryType[];
  estruturas: GeneralInfoType[];
  formas_pagamento?: GeneralInfoType[];
  redes: NetworkType[];
  restricoes: GeneralInfoType[];
  equipamentos?: EquipmentType[];
  espacos?: SpaceType[];
  enderecos: AddressType[];
};
