import { Box } from '@mui/material';
import { FC, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { authUtils } from '../../utils/authUtils';
import { Sidebar } from '../common/Sidebar';

export const AppLayout: FC = () => {
  const navigate = useNavigate();
  // ページ遷移の度に、JWTトークンを持っているかどうか確認する。
  useEffect(() => {
    (async () => {
      const user = await authUtils.isAuthenticated();
      if (!user) navigate('/login');
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
