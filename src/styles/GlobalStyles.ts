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
    color: #333;
    overflow-x: hidden;
  }

  #root {
    width: 100%;
    min-height: 100vh;
  }

  input, button, textarea, select {
    font-family: inherit;
    font-size: 14px;
    border: none;
    outline: none;
  }

  button {
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    background: none;
    border: none;
    padding: 0;
    width: auto;
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`; 