import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --primary: rgb(45, 103, 127);
    --secondary: rgb(110, 189, 0);
    --black90: rgba(0, 0, 0, 0.9); 
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    @media (max-width: 1080px) {
      font-size: 93.75%;
    }

    @media (max-width: 720px) {
      font-size: 87.5%;
    }
  }

  body {
   background: var(--light);
   line-height: 1.5;
   -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
  } 

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 700;
  }

  button {
    cursor: pointer;
    .button-secondary.button-outline {
    color: rgb(110, 189, 0);
    border: 1px solid rgb(110, 189, 0);
    background-color: transparent;
    }
  }


  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }

  // Bootstrap overrides

  .btn {
    border-radius: 50px;
    padding-left: 25px;
    padding-right: 25px;
  }

  .btn-primary {
    background-color: var(--primary);
    border-color: var(--primary);

    &:hover {
    background-color: red;
    border-color: red;
    }
  }

  .btn-secondary {
    background-color: var(--secondary);
    border-color: var(--secondary);
  }
`;
