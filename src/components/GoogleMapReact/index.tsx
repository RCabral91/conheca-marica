import GoogleMapReact from 'google-map-react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { AddressType } from '../../@types/Address';

interface IframeMapsProps {
  address: AddressType[];
}

interface IAnyReactComponentProps {
  lat: number;
  lng: number;
}

const AnyReactComponent: React.FC<IAnyReactComponentProps> = () => (
  <div className="fs-3 text-danger">
    <FaMapMarkerAlt />
  </div>
);

const IframeMaps: React.FC<IframeMapsProps> = ({ address }) => {
  return (
    <div>
      <div className="mt-5">
        <h4 className="fw-bold">Localização</h4>
        <div style={{ height: '35vh', width: '100%' }}>
          <GoogleMapReact
            key={address[0].id}
            bootstrapURLKeys={{
              key: `${process.env.REACT_APP_GOOGLE_KEY}`,
            }}
            defaultCenter={{
              lng: address[0].lng,
              lat: address[0].lat,
            }}
            defaultZoom={15}
            yesIWantToUseGoogleMapApiInternals
          >
            <AnyReactComponent lng={address[0].lng} lat={address[0].lat} />
          </GoogleMapReact>
        </div>
      </div>
    </div>
  );
};

export default IframeMaps;
