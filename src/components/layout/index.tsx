import React, { ReactNode } from 'react';
import Navbar from './navbar';
import styled from 'styled-components';

type LayoutProps = {
  children: ReactNode;
};
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutMain>
      <Background />
      <Container>
        <Navbar />
        <ChildrenContainer>{children}</ChildrenContainer>
      </Container>
    </LayoutMain>
  );
};
export default Layout;

const LayoutMain = styled.main`
  min-height: 100svh;
`;
const Container = styled.div`
  height: 100svh;
  margin: auto;
  max-width: 800px;
  padding-top: 72px;
`;
const ChildrenContainer = styled.div`
  background: rgba(0, 0, 0, 0.8);
  border-left: 1px solid rgba(255, 255, 255, 0.3);
  border-right: 1px solid rgba(255, 255, 255, 0.3);
  min-height: 100%;
  padding: 16px;
`;
const Background = styled.div`
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.8)),
    url(/assets/planet-1.jpg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: -10;
`;
