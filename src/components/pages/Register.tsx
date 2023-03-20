import { Box, Button, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Link } from 'react-router-dom';

export const Register = () => (
  <>
    <Box component="form">
      <TextField fullWidth id="username" name="username" label="お名前" margin="normal" required />
      <TextField
        fullWidth
        id="password"
        name="password"
        label="パスワード"
        margin="normal"
        type="password"
        required
      />
      <TextField
        fullWidth
        id="confirmPassword"
        name="confirmPassword"
        label="確認用パスワード"
        margin="normal"
        type="password"
        required
      />
      <LoadingButton
        sx={{ marginTop: 3, marginBottom: 2 }}
        fullWidth
        type="submit"
        loading={false}
        color="primary"
        variant="outlined"
      >
        アカウント作成
      </LoadingButton>
    </Box>
    <Button component={Link} to="/login">
      すでにアカウントを持っていますか？ログイン
    </Button>
  </>
);
