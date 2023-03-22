import { Box, Button, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Link, useNavigate } from 'react-router-dom';
import { FC, FormEventHandler, useState } from 'react';
import { authApi } from '../../api/authApi';
import { LoginApi } from '../../types/api.type';

export const Login: FC = () => {
  const navigate = useNavigate();

  // フォーム入力値
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // エラーメッセージ
  const [usernameErrorText, setUsernameErrorText] = useState('');
  const [passwordErrorText, setPasswordErrorText] = useState('');

  // API通信中かどうか
  const [loading, setLoading] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setUsernameErrorText('');
    setPasswordErrorText('');

    // バリデーションチェック
    let hasError = false;
    if (username === '') {
      hasError = true;
      setUsernameErrorText('名前を入力してください。');
    }
    if (password === '') {
      hasError = true;
      setPasswordErrorText('パスワードを入力してください。');
    }
    if (hasError) return;

    // 新規登録APIを叩く
    setLoading(true);
    authApi
      .login({ username, password })
      .then((res) => {
        setLoading(false);
        // Memo: ローカルストレージへのトークン保存は脆弱性があるので、要修正
        console.log('ログインに成功しました。');
        localStorage.setItem('token', res.data.token);
        navigate('/');
      })
      .catch((error: LoginApi.Response.Error) => {
        error.data.errors.forEach((error) => {
          if (error.param === 'username') setUsernameErrorText(error.msg);
          if (error.param === 'password') setPasswordErrorText(error.msg);
        });
        setLoading(false);
      });
  };
  return (
    <>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          id="username"
          name="username"
          label="お名前"
          margin="normal"
          required
          onChange={(event) => setUsername(event.target.value)}
          helperText={usernameErrorText}
          error={usernameErrorText !== ''}
          disabled={loading}
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
          helperText={passwordErrorText}
          error={passwordErrorText !== ''}
          disabled={loading}
        />
        <LoadingButton
          sx={{ marginTop: 3, marginBottom: 2 }}
          fullWidth
          type="submit"
          loading={loading}
          color="primary"
          variant="outlined"
        >
          ログイン
        </LoadingButton>
      </Box>
      <Button component={Link} to="/register">
        アカウントを持っていませんか？ログイン
      </Button>
    </>
  );
};
