import { Box } from '@mui/material';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { memoApi } from '../../api/memoApi';
import { setMemos } from '../../redux/features/memosSlice';
import { setUser } from '../../redux/features/userSlice';
import { RootState } from '../../redux/store';
import { authUtils } from '../../utils/authUtils';
import { Sidebar } from '../common/Sidebar';

export const AppLayout: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const memos = useSelector((state: RootState) => state.memos.value);
  // ページ遷移の度に、JWTトークンを持っているかどうか確認する。
  useEffect(() => {
    const authenticate = async () => {
      const user = await authUtils.isAuthenticated();
      if (!user) return navigate('/login');
      dispatch(setUser(user));
      if (!memos) await getMemos();
    };
    authenticate();
  }, [navigate]);

  const getMemos = async () => {
    try {
      const newMemos = (await memoApi.getAll()).data.memos;
      dispatch(setMemos(newMemos));
      if (newMemos[0]) {
        navigate(`/memo/${newMemos[0].id}`);
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
