import { SerializedStyles } from '@emotion/react';
import { css, Interpolation } from '@emotion/react';
import { Box } from '@mui/material';
import { Container, SxProps } from '@mui/system';
import { Outlet } from 'react-router-dom';
import notionLogo from '../../assets/images/notion-logo.png';

export const AuthLayout = () => {
  const styles: { box: SxProps; img: SerializedStyles } = {
    box: {
      marginTop: 6,
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column'
    },
    img: css({
      width: 100,
      height: 100,
      marginBottom: 3
    })
  };
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Box sx={styles.box}>
          <img src={notionLogo} alt="" css={styles.img} />
          Notionクローン開発
        </Box>
        <Outlet />
      </Container>
    </div>
  );
};
