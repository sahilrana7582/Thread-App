import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const baseUrl = import.meta.env.VITE_API_URL;


export const useSignUp = () => {
  const toast = useToast();
  const {
    mutate: signup,
    isError,
    error,
    isPending,
  } = useMutation({
    mutationFn: async (formData) => {
      const resp = await fetch(`${baseUrl}/user/signup`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!resp.ok) {
        throw new Error('Something Went Wrong While Sign Up');
      }

      const data = await resp.json();
      return data;
    },
    onSuccess: () => {
      toast({
        title: 'Account Created',
        duration: 2000,
        status: 'success',
        isClosable: true,
      });
    },
    onError: () => {
      toast({
        title: 'Something Went Wrong',
        duration: 2000,
        status: 'error',
        isClosable: true,
      });
    },
  });

  return { signup, isPending, isError, error };
};
