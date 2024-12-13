import { useToast } from '@chakra-ui/react';
import { isPending } from '@reduxjs/toolkit';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const baseUrl = import.meta.env.VITE_API_URL;

export const useComment = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const { mutate: newComment, isPending } = useMutation({
    mutationFn: async ({ commentText, postId, userId }) => {
      const resp = await fetch(`${baseUrl}/post/${postId}/comment/${userId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ commentText }),
      });
      if (!resp.ok) {
        throw new Error('Something Went Wrong');
      }

      const data = await resp.json();
      return data;
    },
    onSuccess: (data) => {
      toast({
        title: 'Commented',
        duration: 2000,
        isClosable: true,
        status: 'success',
      });
      queryClient.invalidateQueries([`${data?.postId}`]);
    },
    onError: () => {
      toast({
        title: 'Not Commented',
        duration: 2000,
        isClosable: true,
        status: 'error',
      });
    },
  });

  return { isPending, newComment };
};

export const usePostInfo = (postId) => {
  const toast = useToast();
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ['PostInfo', postId],
    queryFn: async () => {
      const resp = await fetch(`${baseUrl}/post/${postId}`, {
        credentials: 'include',
        method: 'GET',
      });

      if (!resp.ok) {
        throw new Error('Something Went Wrong');
      }

      const data = await resp.json();
      return data?.post;
    },
    onError: () => {
      toast({
        title: 'Not Able to Get Post',
        duration: 2000,
        isClosable: true,
        status: 'error',
      });
      navigate('/');
    },
  });
  return { data, isLoading };
};

export const usePost = (userData) => {
  const { data, isLoading } = useQuery({
    queryKey: ['allPosts', userData],
    queryFn: async () => {
      const queryParams = new URLSearchParams({
        userData: JSON.stringify(userData),
      });
      const res = await fetch(
        `${baseUrl}/post/allPost?${queryParams.toString()}`,
        {
          method: 'GET',
          credentials: 'include',
        }
      );

      if (!res.ok) {
        throw new Error('Error In Response Get Posts');
      }

      const data = await res.json();
      return data;
    },
  });

  return { data, isLoading };
};

export const useLike = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const { mutate: like, isPending } = useMutation({
    mutationFn: async ({ postId, userId }) => {
      const resp = await fetch(
        `${baseUrl}/user/post/${postId}/like/${userId}`,
        {
          credentials: 'include',
          method: 'PUT',
        }
      );

      if (!resp.ok) {
        throw new Error('Not Abled to liked');
      }

      const data = await resp.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['allPosts']);
    },
    onError: () => {
      toast({
        title: 'Not Able to Like Post',
        duration: 2000,
        isClosable: true,
        status: 'error',
      });
    },
  });

  return { like, isPending };
};
