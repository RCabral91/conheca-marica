import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const LocationPoint = styled.button`
  transform: translate(-50%, -20%);
  width: 30px;
  height: 30px;
  border: none;
  background-color: transparent;
`;

export const CardMarker = styled.div`
  width: 400px;
  position: absolute;
  bottom: 45px;
  transform: translateX(-50%);
  z-index: 2;

  &:after {
    content: '';
    position: absolute;
    border-style: solid;
    border-width: 20px 20px 0;
    border-color: #ffffff transparent;
    display: block;
    width: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
`;

export const Wrapper = styled.div`
  position: relative;
`;

export const MapTitle = styled(Link)`
  position: absolute;
  margin-bottom: -80%;
  z-index: 1;
  position: absolute;
  top: 110px;
  left: 15px;
  background-color: rgb(255, 255, 255);
  padding: 15px;
  border-radius: 5px;
  box-shadow: rgb(0 0 0 / 30%) 0px 1px 5px;
  border: none;
`;
