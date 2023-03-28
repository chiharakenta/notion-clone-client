import { Box, Button, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Link, useNavigate } from 'react-router-dom';
import { FC, FormEventHandler, useState } from 'react';
import { authApi } from '../../api/authApi';
import { RegisterApi } from '../../types/api.type';

export const Register: FC = () => {
  const navigate = useNavigate();

  // フォーム入力値
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // エラーメッセージ
  const [usernameErrorText, setUsernameErrorText] = useState('');
  const [passwordErrorText, setPasswordErrorText] = useState('');
  const [confirmErrorText, setConfirmErrorText] = useState('');

  // API通信中かどうか
  const [loading, setLoading] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setUsernameErrorText('');
    setPasswordErrorText('');
    setConfirmErrorText('');

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
    if (confirmPassword === '') {
      hasError = true;
      setConfirmErrorText('確認用パスワードを入力してください。');
    }
    if (password !== confirmPassword) {
      hasError = true;
      setConfirmErrorText('パスワードと確認用パスワードが異なります。');
    }
    if (hasError) return;

    // 新規登録APIを叩く
    setLoading(true);
    authApi
      .register({ username, password, confirmPassword })
      .then((res) => {
        setLoading(false);
        console.log('新規登録に成功しました。');
        navigate('/');
      })
      .catch((error: RegisterApi.Response.Error) => {
        error.data.errors.forEach((error) => {
          if (error.param === 'username') setUsernameErrorText(error.msg);
          if (error.param === 'password') setPasswordErrorText(error.msg);
          if (error.param === 'confirmPassword') setConfirmErrorText(error.msg);
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
        <TextField
          fullWidth
          id="confirmPassword"
          name="confirmPassword"
          label="確認用パスワード"
          margin="normal"
          type="password"
          required
          onChange={(event) => setConfirmPassword(event.target.value)}
          helperText={confirmErrorText}
          error={confirmErrorText !== ''}
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
          アカウント作成
        </LoadingButton>
      </Box>
      <Button component={Link} to="/login">
        すでにアカウントを持っていますか？ログイン
      </Button>
    </>
  );
};
