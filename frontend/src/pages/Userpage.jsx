import React from 'react';
import Userheader from '../component/Userheader';
import Userpost from '../component/Userpost';

const Userpage = () => {
  return (
    <>
      <Userheader />
      <Userpost
        likes={10}
        comments={10}
        postImg="https://bit.ly/dan-abramov"
        postTitle="Let's Talk About The Threads"
      />
      <Userpost
        likes={10}
        comments={10}
        postImg="https://bit.ly/code-beast"
        postTitle="Threads Are Really Good"
      />
      <Userpost
        likes={10}
        comments={0}
        postImg="https://bit.ly/code-beast"
        postTitle="Threads Are Really Good"
      />
    </>
  );
};

export default Userpage;
