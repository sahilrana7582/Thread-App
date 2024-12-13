import React from 'react';
import Header from '../component/Header';
import Footer from '../component/Footer';
import { Container } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  console.log('Home');
  return (
    <Container maxW="620px">
      <Header />
      <Outlet />
      <Footer />
    </Container>
  );
};

export default Layout;
