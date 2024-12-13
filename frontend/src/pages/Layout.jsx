import Header from '../component/Header';
import Footer from '../component/Footer';
import { Container } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { useFetchUser } from './useFetchUser';

const Layout = () => {
  useFetchUser();

  return (
    <Container maxW="620px">
      <Header />
      <Outlet />
      <Footer />
    </Container>
  );
};

export default Layout;
