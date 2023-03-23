import { AddBoxOutlined, LogoutOutlined } from '@mui/icons-material';
import { Box, Drawer, IconButton, List, ListItemButton, Typography } from '@mui/material';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { memoApi } from '../../api/memoApi';
import { assets } from '../../assets';
import { RootState } from '../../redux/store';

export const Sidebar: FC = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.value);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    (async () => {
      try {
        const { memos } = (await memoApi.getAll()).data;
        console.log(memos);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    })();
  }, []);

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
              <AddBoxOutlined fontSize="small" />
            </IconButton>
          </Box>
        </ListItemButton>
        <ListItemButton sx={{ pl: 2.5 }} component={Link} to="/memo/1234">
          <Typography>📝無題</Typography>
        </ListItemButton>
        <ListItemButton sx={{ pl: 2.5 }} component={Link} to="/memo/1234">
          <Typography>📝無題</Typography>
        </ListItemButton>
        <ListItemButton sx={{ pl: 2.5 }} component={Link} to="/memo/1234">
          <Typography>📝無題</Typography>
        </ListItemButton>
      </List>
    </Drawer>
  );
};
