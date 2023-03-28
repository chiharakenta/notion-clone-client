import { AddBoxOutlined, LogoutOutlined } from '@mui/icons-material';
import { Box, Drawer, IconButton, List, ListItemButton, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { memoApi } from '../../api/memoApi';
import { assets } from '../../assets';
import { setMemos } from '../../redux/features/memosSlice';
import { RootState } from '../../redux/store';

export const Sidebar: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.value);
  const memos = useSelector((state: RootState) => state.memos.value);

  const { memoId } = useParams();
  const [activeMemoIndex, setActiveMemoIndex] = useState(0);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    if (!memoId) return;
    setActiveMemoIndex(memos.findIndex((memo) => memo.id === parseInt(memoId)));
  }, [navigate]);

  const addMemo = async () => {
    try {
      const newMemo = (await memoApi.create()).data.memo;
      dispatch(setMemos([...memos, newMemo]));
      navigate(`/memo/${newMemo.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Drawer
      container={window.document.body}
      variant="permanent"
      open={true}
      sx={{ width: 250, height: '100vh' }}
    >
      <List sx={{ width: 250, height: '100vh', backgroundColor: assets.colors.secondary }}>
        <ListItemButton>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '10px'
            }}
          >
            <Typography variant="body2" fontWeight={700}>
              {user && user.username}
            </Typography>
            <IconButton onClick={logout}>
              <LogoutOutlined />
            </IconButton>
          </Box>
        </ListItemButton>
        <ListItemButton>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '10px'
            }}
          >
            <Typography variant="body2" fontWeight={700}>
              お気に入り
            </Typography>
          </Box>
        </ListItemButton>
        <ListItemButton>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Typography variant="body2" fontWeight={700}>
              プライベート
            </Typography>
            <IconButton>
              <AddBoxOutlined fontSize="small" onClick={addMemo} />
            </IconButton>
          </Box>
        </ListItemButton>
        {memos.map((memo, index) => (
          <ListItemButton
            key={memo.id}
            sx={{ pl: 2.5 }}
            component={Link}
            to={`/memo/${memo.id}`}
            selected={index === activeMemoIndex}
          >
            <Typography>
              {memo.icon}
              {memo.title}
            </Typography>
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};
