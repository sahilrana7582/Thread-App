import { Button, Flex } from '@chakra-ui/react';
import React from 'react';
import { Container } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import Userpage from './pages/Userpage';
import Postpage from './pages/Postpage';
import Header from './component/Header';
import Footer from './component/Footer';
import NewPost from './component/NewPost';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Login from './pages/Login';

const App = () => {
  return (
    <>
      <Flex flexDirection="column" overflow="auto" className="max-h-screen">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/">
              <Route path=":username" element={<Userpage />}></Route>
              <Route path=":username/newpost" element={<NewPost />}></Route>
            </Route>

            <Route path=":username/post/:id" element={<Postpage />}></Route>
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </Flex>
    </>
  );
};

export default App;
