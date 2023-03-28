import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';
import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { memoApi } from '../../api/memoApi';
import { setMemos } from '../../redux/features/memosSlice';
import { RootState } from '../../redux/store';

export const Home: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const memos = useSelector((state: RootState) => state.memos.value);
  const [loading, setLoading] = useState(false);

  const createMemo = async () => {
    try {
      setLoading(true);
      const newMemo = (await memoApi.create()).data.memo;
      const newMemos = memos ? [...memos] : [];
      dispatch(setMemos([...newMemos, newMemo]));
      navigate(`/memo/${newMemo.id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <LoadingButton variant="outlined" onClick={createMemo} loading={loading}>
        最初のメモを作成
      </LoadingButton>
    </Box>
  );
};
