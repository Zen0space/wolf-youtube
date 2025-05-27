import React from 'react';
import type { ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

type ButtonVariant = 'primary' | 'secondary' | 'outline';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

interface StyledButtonProps {
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth?: boolean;
}

const getButtonStyles = (variant: ButtonVariant) => {
  switch (variant) {
    case 'primary':
      return css`
        background-color: ${({ theme }) => theme.colors.button.primary.bg};
        color: ${({ theme }) => theme.colors.button.primary.text};
        border: none;

        &:hover {
          background-color: ${({ theme }) => theme.colors.button.primary.hover};
          box-shadow: 0 15px 35px rgba(0, 216, 122, 0.3);
        }
      `;
    case 'secondary':
      return css`
        background-color: ${({ theme }) => theme.colors.button.secondary.bg};
        color: ${({ theme }) => theme.colors.button.secondary.text};
        border: none;

        &:hover {
          background-color: ${({ theme }) => theme.colors.button.secondary.hover};
        }
      `;
    case 'outline':
      return css`
        background-color: transparent;
        color: #ffffff;
        border: 2px solid ${({ theme }) => theme.colors.accent};

        &:hover {
          background-color: rgba(0, 216, 122, 0.05);
          box-shadow: 0 8px 25px rgba(0, 216, 122, 0.2);
        }
      `;
    default:
      return css``;
  }
};

const getButtonSize = (size: ButtonSize) => {
  switch (size) {
    case 'small':
      return css`
        padding: 10px 20px;
        font-size: 0.9rem;
      `;
    case 'medium':
      return css`
        padding: 14px 30px;
        font-size: 1.1rem;
      `;
    case 'large':
      return css`
        padding: 22px 55px;
        font-size: 1.4rem;
      `;
    default:
      return css``;
  }
};

const StyledButton = styled.button<StyledButtonProps>`
  border-radius: ${({ theme }) => theme.borderRadius.large};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.medium};
  margin: 0;
  box-shadow: ${({ theme }) => theme.colors.shadow};
  text-transform: uppercase;
  letter-spacing: 1px;
  display: inline-block;
  text-align: center;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  
  ${({ $variant }) => getButtonStyles($variant)}
  ${({ $size }) => getButtonSize($size)}
  
  &:hover {
    transform: translateY(-4px);
  }
  
  &:active {
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  children,
  ...rest
}) => {
  return (
    <StyledButton 
      $variant={variant} 
      $size={size} 
      $fullWidth={fullWidth} 
      {...rest}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
