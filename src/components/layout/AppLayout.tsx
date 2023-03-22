import { Box } from '@mui/material';
import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { setUser } from '../../redux/features/userSlice';
import { authUtils } from '../../utils/authUtils';
import { Sidebar } from '../common/Sidebar';

export const AppLayout: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // ページ遷移の度に、JWTトークンを持っているかどうか確認する。
  useEffect(() => {
    (async () => {
      const user = await authUtils.isAuthenticated();
      if (!user) return navigate('/login');
      dispatch(setUser(user));
    })();
  }, [navigate]);

  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, p: 1, width: 'max-content' }}>
          <Outlet />
        </Box>
      </Box>
    </div>
  );
};
