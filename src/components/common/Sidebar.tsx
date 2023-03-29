import { AddBoxOutlined, LogoutOutlined } from '@mui/icons-material';
import { Box, Drawer, IconButton, List, ListItemButton, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable, OnDragEndResponder } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { authApi } from '../../api/authApi';
import { memoApi } from '../../api/memoApi';
import { assets } from '../../assets';
import { setMemos } from '../../redux/features/memosSlice';
import { RootState } from '../../redux/store';
import { MemoType } from '../../types/memo.type';

export const Sidebar: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.value);
  const memos = useSelector((state: RootState) => state.memos.value);

  const { memoId } = useParams();
  const [activeMemoIndex, setActiveMemoIndex] = useState(0);

  const logout = async () => {
    await authApi.logout();
    navigate('/login');
  };

  useEffect(() => {
    if (!memoId || !memos) return;
    setActiveMemoIndex(memos.findIndex((memo) => memo.id === parseInt(memoId)));
  }, [navigate]);

  const addMemo = async () => {
    try {
      const newMemo = (await memoApi.create()).data.memo;
      const newMemos = memos ? [...memos] : [];
      dispatch(setMemos([...newMemos, newMemo]));
      navigate(`/memo/${newMemo.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const reorderClientMemos = (memos: Array<MemoType>, startIndex: number, endIndex: number) => {
    const newMemos = [...memos].map((memo) => {
      if (memo.position === startIndex) return { ...memo, position: endIndex };
      if (memo.position === endIndex) return { ...memo, position: startIndex };
      return { ...memo };
    });
    newMemos.sort((a, b) => a.position - b.position);
    return newMemos;
  };
  const reorderServerMemos = async (
    memos: Array<MemoType>,
    startIndex: number,
    endIndex: number
  ) => {
    const startMemo = memos.find((memo) => memo.position === startIndex);
    const endMemo = memos.find((memo) => memo.position === endIndex);
    if (!startMemo || !endMemo) return;
    try {
      const res = await memoApi.updatePosition({
        memos: [
          {
            id: startMemo.id,
            position: endIndex
          },
          {
            id: endMemo.id,
            position: startIndex
          }
        ]
      });
      const sortedMemo = res.data.memos;
      return sortedMemo;
    } catch (error) {
      console.log(error);
    }
  };

  const handleDragEnd: OnDragEndResponder = async (result) => {
    if (!memos || !result.destination) return;
    const clientMemos = reorderClientMemos(memos, result.source.index, result.destination.index);
    dispatch(setMemos(clientMemos));

    const serverMemos = await reorderServerMemos(
      memos,
      result.source.index,
      result.destination.index
    );
    dispatch(setMemos(serverMemos));
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
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="memoDroppable" direction="vertical">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {memos?.map((memo, index) => (
                  <Draggable key={memo.id} index={index} draggableId={String(memo.id)}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps}>
                        <div {...provided.dragHandleProps}>
                          <ListItemButton
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
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </List>
    </Drawer>
  );
};
