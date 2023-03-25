import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { memoApi } from '../../api/memoApi';

export const Home: FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const createMemo = async () => {
    try {
      setLoading(true);
      const { memo } = (await memoApi.create()).data;
      navigate(`/memo/${memo.id}`);
    } catch (error) {
      console.log(error);
      alert(error);
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
