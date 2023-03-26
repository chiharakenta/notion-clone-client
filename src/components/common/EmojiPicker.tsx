import { Box, Typography } from '@mui/material';
import Picker from '@emoji-mart/react';
import { FC, useState } from 'react';
import { MemoType } from '../../types/memo.type';
import { EmojiSelectEvent } from '../../types/emoji.type';

type Props = {
  icon: MemoType['icon'];
  onChangeIcon: (icon: MemoType['icon']) => void;
};

export const EmojiPicker: FC<Props> = ({ icon, onChangeIcon }) => {
  const [isShowPicker, setIsShowPicker] = useState(false);

  const togglePicker = () => setIsShowPicker(!isShowPicker);

  const selectEmoji = (event: EmojiSelectEvent) => {
    const emojiCodes = event.unified.split('-');
    const codesArray: Array<number> = [];
    emojiCodes.forEach((emojiCode) => codesArray.push(Number(`0x${emojiCode}`)));
    const emoji = String.fromCodePoint(...codesArray);
    onChangeIcon(emoji);
    setIsShowPicker(false);
  };

  return (
    <Box>
      <Typography
        variant="h3"
        fontWeight={700}
        sx={{ cursor: 'pointer', display: 'inline-block' }}
        onClick={togglePicker}
      >
        {icon}
      </Typography>
      <Box sx={{ display: isShowPicker ? 'block' : 'none', position: 'absolute', zIndex: 9999 }}>
        <Picker onEmojiSelect={(event: EmojiSelectEvent) => selectEmoji(event)} />
      </Box>
    </Box>
  );
};
