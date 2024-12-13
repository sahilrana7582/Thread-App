import { useToast } from '@chakra-ui/react';
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
