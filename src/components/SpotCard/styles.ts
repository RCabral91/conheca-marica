import styled from 'styled-components';

export const AllSpotsCards = styled.div`
  a {
    color: var(--primary);
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
    font-weight: 700;
    line-height: 1.2;
  }

  .button {
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    width: fit-content;

    font-weight: 300;
    font-size: 12px;
    color: rgb(255, 255, 255);
    background-color: rgb(45, 103, 127);
    padding: 0px 20px;
    border-radius: 20px;
    border: none;
    white-space: nowrap;
  }

  .button-disabled {
    color: rgb(102, 102, 102);
    background-color: rgb(238, 238, 238);
    border: 1px solid rgb(238, 238, 238);
  }
`;

export const Cover = styled.div`
  width: 100%;
  height: 250px;
  background-size: cover;
`;
