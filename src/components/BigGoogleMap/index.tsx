import GoogleMapReact from 'google-map-react';
import { useMemo, useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { MdArrowBack } from 'react-icons/md';
import { CommerceType } from '../../@types/Commerce';
import { EventType } from '../../@types/Event';
import { EventSpaceType } from '../../@types/EventSpace';
import { HotelType } from '../../@types/Hotel';
import { PubNRestType } from '../../@types/PubNRest';
import { SpotType } from '../../@types/Spot';
import CommerceCard from '../CommerceCard';
import EventCard from '../EventCard';
import EventSpaceCard from '../EventSpaceCard';
import HotelCard from '../HotelCard';
import PubNRestCard from '../PubNRestCard';
import SpotCard from '../SpotCard';
import { CardMarker, LocationPoint, MapTitle, Wrapper } from './styles';

interface IBigMapProps {
  items:
    | SpotType[]
    | HotelType[]
    | PubNRestType[]
    | CommerceType[]
    | EventSpaceType[]
    | EventType[];
  title: string;
  backTo: string;
  type: 'spot' | 'hotel' | 'event' | 'pubNRest' | 'commerce' | 'eventSpace';
}

interface IMapMarkerProps {
  lat: number;
  lng: number;
  item:
    | SpotType
    | HotelType
    | EventType
    | PubNRestType
    | CommerceType
    | EventSpaceType;
  showCard: boolean;
  onPinClick: () => void;
  type: 'spot' | 'hotel' | 'event' | 'pubNRest' | 'commerce' | 'eventSpace';
}

const MapMarker: React.FC<IMapMarkerProps> = ({
  item,
  type,
  showCard,
  onPinClick,
}) => {
  const card = useMemo(() => {
    switch (type) {
      case 'spot':
        return <SpotCard spot={item as SpotType} />;
        break;
      case 'hotel':
        return <HotelCard hotel={item as HotelType} />;
        break;
      case 'event':
        return <EventCard event={item as EventType} />;
        break;
      case 'pubNRest':
        return <PubNRestCard pubNRest={item as PubNRestType} />;
        break;
      case 'commerce':
        return <CommerceCard commerce={item as CommerceType} />;
        break;
      case 'eventSpace':
        return <EventSpaceCard eventSpace={item as EventSpaceType} />;
        break;
      default:
        return null;
    }
  }, [item, type]);

  return (
    <Wrapper>
      {showCard && item && <CardMarker>{card}</CardMarker>}
      <LocationPoint type="button" onClick={onPinClick}>
        <FaMapMarkerAlt color="red" className="fs-2" />
      </LocationPoint>
    </Wrapper>
  );
};

const BigGoogleMap: React.FC<IBigMapProps> = ({
  items,
  title,
  type,
  backTo,
}) => {
  const [activeAddress, setActiveAddress] = useState<number | null>(null);
  return (
    <div>
      <MapTitle
        className="d-flex text-decoration-none align-items-center"
        to={backTo}
      >
        <MdArrowBack className="fs-6 text-dark" />
        <div>
          <h6 className="ms-2 m-0 text-dark">{title}</h6>
        </div>
      </MapTitle>

      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: `${process.env.REACT_APP_GOOGLE_KEY}`,
          }}
          yesIWantToUseGoogleMapApiInternals
          defaultZoom={13}
          defaultCenter={{
            lat: -22.9180269,
            lng: -42.8207682,
          }}
          onClick={() => setActiveAddress(null)}
        >
          {items?.map(item =>
            item?.enderecos?.map(address => {
              return (
                <MapMarker
                  lat={address.lat}
                  lng={address.lng}
                  key={address.id}
                  item={item}
                  type={type}
                  showCard={address.id === activeAddress}
                  onPinClick={() =>
                    setActiveAddress(
                      address.id === activeAddress ? null : address.id
                    )
                  }
                />
              );
            })
          )}
        </GoogleMapReact>
      </div>
    </div>
  );
};

export default BigGoogleMap;
