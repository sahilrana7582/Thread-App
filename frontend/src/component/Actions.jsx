import {
  Button,
  Divider,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
} from '@chakra-ui/react';
import { useComment, useLike } from '../../features/apis/post/useImpression';
import { useState } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { AiOutlineComment } from 'react-icons/ai';
import { RiSendPlaneFill } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { BsFillSendFill } from 'react-icons/bs';

const Actions = ({ likeArray, likes, comments, postId }) => {
  const [openComment, setOpenComment] = useState(false);
  const { like } = useLike();

  const user = useSelector((state) => state.user.user);
  const onLikeClick = async () => {
    await like({ postId: postId, userId: user?._id });
  };

  const { newComment, isPending } = useComment();
  const [commentText, setCommentText] = useState('');
  const handleNewComment = async () => {
    await newComment({
      commentText: commentText,
      postId: postId,
      userId: user?._id,
    });
    setCommentText('');
  };
  return (
    <>
      <Flex gap={8} alignItems="center">
        <Flex gap={2}>
          <AiFillHeart
            size={25}
            color={`${likeArray.includes(user?._id) ? 'red' : ''}`}
            onClick={onLikeClick}
            cursor="pointer"
          />
          {likes == '0' || '' ? '' : likes}
        </Flex>

        <Flex gap={2}>
          <AiOutlineComment
            size={25}
            onClick={() => setOpenComment((prev) => !prev)}
            className="hover:cursor-pointer"
          />
          {comments == '0' || '' ? '' : comments}
        </Flex>
        <Flex gap={2}>
          <RiSendPlaneFill size={25} />
        </Flex>
      </Flex>

      {openComment && (
        <>
          <Divider />
          <InputGroup size="md">
            <Input
              placeholder="Comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={handleNewComment}
                isDisabled={commentText === ''}
              >
                {isPending ? <Spinner /> : <BsFillSendFill />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </>
      )}
    </>
  );
};

export default Actions;
