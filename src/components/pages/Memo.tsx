import { DeleteOutlined, StarBorderOutlined } from '@mui/icons-material';
import { Box, IconButton, TextField } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { memoApi } from '../../api/memoApi';
import { MemoType } from '../../types/memo.type';

export const Memo: FC = () => {
  const { memoId } = useParams();
  const [memoTitle, setMemoTitle] = useState('');
  const [memoDescription, setMemoDescription] = useState('');

  useEffect(() => {
    (async () => {
      if (!memoId) return;
      try {
        const { title, description } = (await memoApi.getOne(memoId)).data.memo;
        setMemoTitle(title);
        setMemoDescription(description);
      } catch (error) {
        alert(error);
      }
    })();
  }, [memoId]);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%'
        }}
      >
        <IconButton>
          <StarBorderOutlined />
        </IconButton>
        <IconButton color="error">
          <DeleteOutlined />
        </IconButton>
      </Box>
      <Box sx={{ padding: '10px 50px' }}>
        <TextField
          value={memoTitle}
          onChange={(event) => setMemoTitle(event.target.value)}
          placeholder="無題"
          variant="outlined"
          fullWidth
          sx={{
            '.MuiOutlinedInput-input': { padding: 0, border: 'none' },
            '.MuiOutlinedInput-notchedOutline': { border: 'none' },
            '.MuiOutlinedInput-root': { fontSize: '2rem', fontWeight: 700 }
          }}
        />
        <TextField
          value={memoDescription}
          onChange={(event) => setMemoDescription(event.target.value)}
          placeholder="追加"
          variant="outlined"
          fullWidth
          sx={{
            '.MuiOutlinedInput-input': { padding: 0, border: 'none' },
            '.MuiOutlinedInput-notchedOutline': { border: 'none' },
            '.MuiOutlinedInput-root': { fontSize: '1rem' }
          }}
        />
      </Box>
    </>
  );
};
