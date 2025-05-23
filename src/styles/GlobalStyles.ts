import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    height: 100%;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f5f5f5;
    color: #333;
  }

  #root {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  input, button, textarea, select {
    width: 100%;
    font-family: inherit;
    font-size: 14px;
    border: none;
    outline: none;
  }

  button {
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }

  button:hover {
    opacity: 0.8;
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`; 