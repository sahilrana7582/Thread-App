import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { loginReducer } from '../../features/slices/authSlice';

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

      return res.json();
    },
    enabled: false,
    onSuccess: (data) => {
      dispatch(loginReducer(data));
    },
  });

  useEffect(() => {
    if (!user) {
      refetch();
    }
  }, [user, refetch, dispatch]);
};
