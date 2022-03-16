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

  font-size: 12px;

  a {
    text-decoration: none;
    background-color: transparent;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: 16px;
    font-weight: 500;
    line-height: 1.2;
  }

  .color-white {
    background-color: var(--white);
  }

  .button {
    border: 1px solid rgb(110, 189, 0);
    border-radius: 20px;
    color: rgb(110, 189, 0);
    display: inline-block;
    justify-content: center;
    margin: 4px 2px;
    padding: 0px 20px;
    text-align: center;
    -webkit-box-pack: center;
    -webkit-box-align: center;
    white-space: nowrap;
    width: fit-content;
    cursor: pointer;
  }

  .button:hover {
    color: rgb(125, 215, 0);
    border-color: rgb(125, 215, 0);
  }
`;
