import styled from 'styled-components';

export const Menu = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 300px;
  height: 100vh;
  padding: 30px 0 90px;
  overflow: auto;
  z-index: 2;
  background: var(--black90);

  li {
    margin-top: 30px;
    list-style-type: none;
    align-items: center;
  }

  a {
    text-decoration: none;
    font-size: 20px;
    color: white;
  }

  button {
    position: absolute;
    right: 15px;
    top: 15px;
    border: 0;
    width: 1px;
  }

  transform: translateX(-300px);
  -webkit-transition: transform 0.5s 0s ease;
  -moz-transition: transform 0.5s 0s ease;
  -o-transition: transform 0.5s 0s ease;
  transition: transform 0.5s 0s ease;

  &.show {
    transform: translateX(0);
  }
`;

export const Container = styled.header`
  background: var(--primary);
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
`;

export const Content = styled.div`
  margin: 0 auto;
  padding: 1rem 1rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    width: 490px;
  }

  @media (max-width: 991px) {
    .sm-logo {
      max-width: 300px;
    }
  }

  .mobileImg {
    width: 120px;
  }

  button {
    font-size: 1rem;
    color: var(--white);
    background-color: transparent;
    border: 0;
    padding: 0;
    border-radius: 0.25rem;
    height: 3rem;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  }
`;
