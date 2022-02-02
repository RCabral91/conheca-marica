import styled from 'styled-components';

export const SiteApp = styled.div`
  .positionOver {
    position: relative;
    background-color: rgb(45, 103, 127);
    overflow: hidden;
  }

  .position {
    position: absolute;
    top: 0px;
    right: 0px;
    border-top: 600px solid rgb(255, 255, 255);
    border-left: 300px solid transparent;
    height: 0px;
    width: 500px;
  }

  .font {
    font-size: 60px;
  }

  .font-1 {
    font-size: 22px;
  }

  .image {
    z-index: 1;
  }
`;
