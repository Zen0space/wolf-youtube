import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Add a default background color to prevent white flash */
  :root {
    background-color: #1A1F2B;
  }

  html, body {
    width: 100%;
    height: 100%;
    font-family: ${({ theme }) => theme.typography.fontFamily};
    color: ${({ theme }) => theme.colors.text.primary};
    background: ${({ theme }) => theme.colors.background.main};
    overflow-x: hidden;
    transition: background 0.2s ease;
  }

  body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background: radial-gradient(circle at top right, rgba(0, 216, 122, 0.1), transparent 70%);
    z-index: -1;
  }

  #root {
    width: 100%;
    min-height: 100vh;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: ${({ theme }) => theme.typography.weights.bold};
    line-height: 1.2;
  }

  h1 {
    font-size: ${({ theme }) => theme.typography.sizes.h1};
  }

  h2 {
    font-size: ${({ theme }) => theme.typography.sizes.h2};
  }

  h3 {
    font-size: ${({ theme }) => theme.typography.sizes.h3};
  }

  h4 {
    font-size: ${({ theme }) => theme.typography.sizes.h4};
  }

  p {
    font-size: ${({ theme }) => theme.typography.sizes.body};
    line-height: 1.6;
  }

  input, button, textarea, select {
    font-family: inherit;
    font-size: ${({ theme }) => theme.typography.sizes.body};
    border: none;
    outline: none;
  }

  button {
    cursor: pointer;
    transition: ${({ theme }) => theme.transitions.medium};
    background: none;
    border: none;
    padding: 0;
    width: auto;
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.accent};
    transition: ${({ theme }) => theme.transitions.fast};
    
    &:hover {
      color: ${({ theme }) => theme.colors.text.accent};
    }
  }

  /* Wolf External Button Styles */
  .btn-primary {
    background-color: ${({ theme }) => theme.colors.button.primary.bg};
    color: ${({ theme }) => theme.colors.button.primary.text};
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
    border: none;
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    cursor: pointer;
    transition: ${({ theme }) => theme.transitions.fast};
    white-space: nowrap;
    font-size: ${({ theme }) => theme.typography.sizes.small};
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 216, 122, 0.3);
    background-color: ${({ theme }) => theme.colors.button.primary.hover};
  }

  .btn-secondary {
    background-color: ${({ theme }) => theme.colors.button.secondary.bg};
    color: ${({ theme }) => theme.colors.button.secondary.text};
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    cursor: pointer;
    transition: ${({ theme }) => theme.transitions.fast};
    white-space: nowrap;
  }

  .btn-secondary:hover {
    background-color: ${({ theme }) => theme.colors.button.secondary.hover};
  }

  /* Card Styles */
  .card {
    background-color: ${({ theme }) => theme.colors.background.paper};
    border: 1px solid ${({ theme }) => theme.colors.border};
    box-shadow: ${({ theme }) => theme.colors.shadow};
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    transition: ${({ theme }) => theme.transitions.medium};
  }

  .card:hover {
    transform: translateY(-4px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  }
`;