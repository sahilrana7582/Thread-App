import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { loginReducer } from '../../features/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const baseUrl = import.meta.env.VITE_API_URL;

export const useFetchUser = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const { refetch } = useQuery({
    queryKey: ['fetchUser'],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/user`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Failed to fetch user');
      }

      const { success, user } = await res.json();
      dispatch(loginReducer(user));
      return success;
    },
    enabled: false,

    staleTime: 0,
  });

  useEffect(() => {
    if (!user) {
      refetch();
    }
  }, [user, refetch, dispatch]);
};
