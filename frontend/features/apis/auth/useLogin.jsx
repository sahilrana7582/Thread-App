import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { loginReducer } from '../../slices/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const baseUrl = import.meta.env.VITE_API_URL;

export const useLogin = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    mutate: login,
    isError,
    error,
    isPending,
  } = useMutation({
    mutationFn: async (formData) => {
      const resp = await fetch(`${baseUrl}/user/signin`, {
        method: 'POST',
        credentials: 'include',
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
    onSuccess: (data) => {
      const user = data?.user;
      toast({
        title: `Welcome Back! ${user?.username}`,
        duration: 2000,
        status: 'success',
        isClosable: true,
      });
      dispatch(loginReducer(user));
      navigate('/');
    },
    onError: () => {
      toast({
        title: 'Something Went Wrong!',
        duration: 2000,
        status: 'error',
        isClosable: true,
      });
    },
  });

  return { login, isPending, isError, error };
};
