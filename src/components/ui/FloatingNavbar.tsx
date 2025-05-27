import React from 'react';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 1200px;
  background-color: rgba(27, 30, 40, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  z-index: 1000;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LogoIcon = styled.img`
  width: 28px;
  height: 28px;
`;

const LogoText = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  color: #ffffff;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 32px;
  margin: 0 auto;
  padding-left: 48px;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: #ffffffcc;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s ease;
  position: relative;
  
  &:hover {
    color: #ffffff;
  }
  
  &.active {
    color: #00D87A;
  }
  
  &.coming-soon {
    cursor: default;
    
    &:hover::after {
      content: 'Coming Soon';
      position: absolute;
      bottom: -30px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 5px 10px;
      border-radius: 4px;
      font-size: 0.8rem;
      white-space: nowrap;
      z-index: 1000;
    }
  }
`;

// Removed unused ContactButton component

const DownloadButton = styled.button`
  background-color: #00d87a;
  color: #ffffff;
  font-size: 0.8rem;
  font-weight: 700;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  letter-spacing: 0.5px;
  
  &:hover {
    background-color: #00c06c;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 216, 122, 0.3);
  }
`;

interface FloatingNavbarProps {
  onDownloadClick?: () => void;
  currentPage?: string;
}

const FloatingNavbar: React.FC<FloatingNavbarProps> = ({ onDownloadClick, currentPage = 'home' }) => {
  return (
    <NavbarContainer>
      <LogoContainer>
        <LogoIcon src="/icon-wolf.png" alt="Wolf" />
        <LogoText>Wolf</LogoText>
      </LogoContainer>
      
      <NavLinks>
        <NavLink href="/" className={currentPage === 'home' ? 'active' : ''}>Home</NavLink>
        <NavLink href="#" onClick={(e) => e.preventDefault()} className={`coming-soon ${currentPage === 'feedback' ? 'active' : ''}`}>Feedback</NavLink>
        <NavLink href="#" onClick={(e) => e.preventDefault()} className={`coming-soon ${currentPage === 'about' ? 'active' : ''}`}>About us</NavLink>
        <NavLink href="#" onClick={(e) => e.preventDefault()} className={`coming-soon ${currentPage === 'products' ? 'active' : ''}`}>Products</NavLink>
      </NavLinks>
      
      <DownloadButton onClick={onDownloadClick}>
        DOWNLOAD
      </DownloadButton>
    </NavbarContainer>
  );
};

export default FloatingNavbar;
