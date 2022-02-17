/* eslint-disable camelcase */
import { AddressType } from './Address';
import { CategoryType } from './Category';
import { GeneralInfoType } from './GeneralInfo';
import { ImageType } from './Image';
import { NetworkType } from './Network';
import { OpeningTimeType } from './OpeningTime';
import { PhoneType } from './Phone';

export type HotelType = {
  id: number;
  nome: string;
  email?: string;
  site?: string;
  quartos?: number;
  leitos?: number;
  cafe_manha?: boolean;
  cafe_hospedes?: boolean;
  almoco?: boolean;
  almoco_hospedes?: boolean;
  jantar?: boolean;
  jantar_hospedes?: boolean;
  descricao_t: string;
  addresses: AddressType[];
  images?: ImageType[];
  horario_funcionamento?: OpeningTimeType[];
  phones: PhoneType[];
  categorias: CategoryType[];
  estruturas: GeneralInfoType[];
  formas_pagamento?: GeneralInfoType[];
  redes: NetworkType[];
  restricoes: GeneralInfoType[];
  statusCode?: number;
};
