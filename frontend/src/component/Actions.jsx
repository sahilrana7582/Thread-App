import { Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { AiOutlineComment } from 'react-icons/ai';
import { RiSendPlaneFill } from 'react-icons/ri';

const Actions = ({ likes, comments }) => {
  const [like, setLike] = useState(true);
  const onLikeClick = () => {
    setLike(!like);
  };

  return (
    <Flex gap={8} alignItems="center">
      <Flex gap={2}>
        <AiFillHeart
          size={25}
          color={` ${like ? 'red' : ''}`}
          onClick={onLikeClick}
          cursor="pointer"
        />
        {likes == '0' || '' ? '' : likes}
      </Flex>

      <Flex gap={2}>
        <AiOutlineComment size={25} />
        {comments == '0' || '' ? '' : likes}
      </Flex>
      <Flex gap={2}>
        <RiSendPlaneFill size={25} />
      </Flex>
    </Flex>
  );
};

export default Actions;
