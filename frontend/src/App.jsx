import { Button, Flex } from '@chakra-ui/react';
import React from 'react';
import { Container } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import Userpage from './pages/Userpage';
import Postpage from './pages/Postpage';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
      <Container maxW="620px">
        <Header />
        <Flex flexDirection="column" overflow="auto" className="max-h-screen">
          <Routes>
            <Route path="/:username" element={<Userpage />} />
            <Route path="/:username/post/:id" element={<Postpage />} />
          </Routes>
        </Flex>
        <Footer />
      </Container>
    </>
  );
};

export default App;
