import { Flex } from '@chakra-ui/react';

import { Route, Routes } from 'react-router-dom';
import Userpage from './pages/Userpage';
import Postpage from './pages/Postpage';

import NewPost from './component/NewPost';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Search from './component/Search';

const App = () => {
  return (
    <>
      <Flex flexDirection="column" overflow="auto" className="max-h-screen">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/">
              <Route path=":username">
                <Route index element={<Userpage />} />
              </Route>
              <Route path="search" element={<Search />}></Route>

              <Route path=":username/newpost" element={<NewPost />}></Route>
            </Route>

            <Route path="login" element={<Login />} />
            <Route
              path="/:username/post/:postId"
              element={<Postpage />}
            ></Route>
          </Route>
        </Routes>
      </Flex>
    </>
  );
};

export default App;
