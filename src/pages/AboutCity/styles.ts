import styled from 'styled-components';

export const MaricaBackground = styled.div`
  .picture {
    position: relative;
    height: 80vh;
    background-image: url(https://app-marica-fotos.s3-sa-east-1.amazonaws.com/marica-about.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    background-position: center top;
  }
  .picture::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    box-sizing: border-box;
    background: linear-gradient(
      rgba(245, 245, 245, 0) 0%,
      rgb(245, 245, 245) 100%
    );
  }

  .mainText {
    background-color: rgb(255, 255, 255);
    border-radius: 5px;
    box-shadow: rgb(0 0 0 / 30%) 0px 1px 5px;
    transform: translateY(-200px);
  }

  .main {
    background-color: rgb(245, 245, 245);
  }

  img {
    max-width: 100%;
    height: auto;
  }
`;
