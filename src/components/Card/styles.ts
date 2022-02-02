import styled from 'styled-components';

export const AllCards = styled.div`
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
    text-decoration: none;
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
