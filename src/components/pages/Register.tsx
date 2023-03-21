import { Box, Button, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Link } from 'react-router-dom';
import { FormEventHandler, useState } from 'react';
import { authApi } from '../../api/authApi';
import { isAxiosError } from 'axios';
import { RegisterApi } from '../../types/api.type';

export const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    // 新規登録APIを叩く
    authApi
      .register({ username, password, confirmPassword })
      .then((res) => {
        // Memo: ローカルストレージへのトークン保存は脆弱性があるので、要修正
        console.log('新規登録に成功しました。');
        localStorage.setItem('token', res.data.token);
      })
      .catch((error: RegisterApi.Response.Error) => {
        const errorMessages = error.data.errors;
        console.log(errorMessages);
      });
  };
  return (
    <>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          id="username"
          name="username"
          label="お名前"
          margin="normal"
          required
          onChange={(event) => setUsername(event.target.value)}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="パスワード"
          margin="normal"
          type="password"
          required
          onChange={(event) => setPassword(event.target.value)}
        />
        <TextField
          fullWidth
          id="confirmPassword"
          name="confirmPassword"
          label="確認用パスワード"
          margin="normal"
          type="password"
          required
          onChange={(event) => setConfirmPassword(event.target.value)}
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
};
