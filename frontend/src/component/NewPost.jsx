import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Input,
  Spinner,
  Text,
  Textarea,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { CiLocationOn } from 'react-icons/ci';
import { BsThreeDots } from 'react-icons/bs';
import { usePost } from '../../features/apis/post/apiPost';
import { redirect, useNavigate } from 'react-router-dom';

const NewPost = () => {
  const [picPreview, setPicPreview] = useState();
  const navigate = useNavigate();
  const toast = useToast();
  const {
    mutate: newPost,
    isSuccess,
    isPending,
    isError,
  } = useMutation({
    mutationFn: usePost,
    onSuccess: () => {
      toast({
        title: 'Post Created.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/');
    },
    onError: (error) => {
      toast({
        title: 'Something Went Wrong.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const { handleSubmit, register, reset } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('title', data.text);
    formData.append('media', data.media[0]);

    await newPost(formData);
  };

  return (
    <VStack border={'1px solid white'} p="5" gap="6">
      <Flex justifyContent="space-between" w="full">
        <Text fontWeight="semibold">Cancel</Text>
        <BsThreeDots />
      </Flex>
      <Flex w="full" className="h-screen" gap={2}>
        <Flex>
          <Avatar size="md" name="Sage" src="https://bit.ly/sage-adebayo" />
        </Flex>
        <Flex flex={1} h="fit-content">
          <Box w="full">
            <Text fontWeight="semibold">sahilrana</Text>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Textarea
                placeholder="What's new?"
                border="none"
                size="sm"
                p={2}
                className="ring-0 resize-none"
                h="fit-content"
                {...register('text', { required: 'Text is required' })} // Validation
              />
              <Divider />

              {picPreview && (
                <Image src={picPreview} borderRadius="md" my="2" />
              )}
              <Divider />
              <Flex p="2" gap={4}>
                <Flex>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const fileReader = new FileReader();
                        fileReader.onloadend = () => {
                          setPicPreview(fileReader.result);
                        };
                        fileReader.readAsDataURL(file);
                      }
                    }}
                    {...register('media')}
                  />
                  <CiLocationOn size={20} cursor="pointer" />
                </Flex>
                <Flex gap={2}>
                  <Button size="sm" onClick={() => reset()}>
                    Cancel
                  </Button>
                  <Button size="sm" type="submit">
                    {isPending ? <Spinner /> : 'Post'}
                  </Button>
                </Flex>
              </Flex>
            </form>
            {/* Form End */}
          </Box>
        </Flex>
      </Flex>
    </VStack>
  );
};

export default NewPost;
