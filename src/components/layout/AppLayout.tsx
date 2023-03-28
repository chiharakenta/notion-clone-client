import { Box } from '@mui/material';
import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { memoApi } from '../../api/memoApi';
import { setMemos } from '../../redux/features/memosSlice';
import { setUser } from '../../redux/features/userSlice';
import { authUtils } from '../../utils/authUtils';
import { Sidebar } from '../common/Sidebar';

export const AppLayout: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // ページ遷移の度に、JWTトークンを持っているかどうか確認する。
  useEffect(() => {
    const authenticate = async () => {
      const user = await authUtils.isAuthenticated();
      if (!user) return navigate('/login');
      dispatch(setUser(user));
      await getMemos();
    };
    authenticate();
  }, [navigate]);

  const isMemoPage = useParams().memoId;
  const getMemos = async () => {
    if (isMemoPage) return;
    try {
      const { memos } = (await memoApi.getAll()).data;
      dispatch(setMemos(memos));
      if (memos[0]) {
        navigate(`/memo/${memos[0].id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
