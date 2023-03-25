import { DeleteOutlined, StarBorderOutlined } from '@mui/icons-material';
import { Box, IconButton, TextField } from '@mui/material';
import { ChangeEventHandler, FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { memoApi } from '../../api/memoApi';
import { setMemos } from '../../redux/features/memosSlice';
import { RootState } from '../../redux/store';
import { MemoType } from '../../types/memo.type';

export const Memo: FC = () => {
  const { memoId } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const memos = useSelector((state: RootState) => state.memos.value);

  useEffect(() => {
    (async () => {
      if (!memoId) return;
      try {
        const { title, description } = (await memoApi.getOne(memoId)).data.memo;
        setTitle(title);
        setDescription(description);
      } catch (error) {
        alert(error);
      }
    })();
  }, [memoId]);

  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const timeout = 500;
  const updateTitle: ChangeEventHandler<HTMLInputElement> = async (event) => {
    clearTimeout(timer);
    const newTitle = event.target.value;
    setTitle(newTitle);
    const newTimer = setTimeout(async () => {
      try {
        if (!memoId) return;
        await memoApi.update(memoId, { title: newTitle });
        const newMemos = memos.map((memo) =>
          memo.id === parseInt(memoId)
            ? {
                ...memo,
                title: newTitle
              }
            : memo
        );
        dispatch(setMemos(newMemos));
      } catch (error) {
        alert(error);
      }
    }, timeout);
    setTimer(newTimer);
  };

  const updateDescription: ChangeEventHandler<HTMLInputElement> = async (event) => {
    clearTimeout(timer);
    const newDescription = event.target.value;
    setDescription(newDescription);
    const newTimer = setTimeout(async () => {
      try {
        if (!memoId) return;
        await memoApi.update(memoId, { description: newDescription });
      } catch (error) {
        alert(error);
      }
    }, timeout);
    setTimer(newTimer);
  };

  const deleteMemo = async () => {
    try {
      if (!memoId) return;
      await memoApi.delete(memoId);
      const newMemos = memos.filter((memo) => memo.id !== parseInt(memoId));
      dispatch(setMemos(newMemos));
      if (newMemos.length === 0) {
        navigate('/memo');
      } else {
        navigate(`/memo/${newMemos[0].id}`);
      }
    } catch (error) {
      alert(error);
    }
  };

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
          <DeleteOutlined onClick={deleteMemo} />
        </IconButton>
      </Box>
      <Box sx={{ padding: '10px 50px' }}>
        <TextField
          value={title}
          onChange={updateTitle}
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
          value={description}
          onChange={updateDescription}
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
