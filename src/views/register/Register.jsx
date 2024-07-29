import React from 'react'
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import { Box, Typography, Avatar, FormControlLabel, Checkbox, Link, Paper, Button, TextField } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Grid from '@mui/material/Unstable_Grid2'
import bgImg from '~/assets/img/bg.jpg'
function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © holaworld 在线聊天'}
            <Link color="inherit" href="https://holaworld.ggff.net">

            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
const Register = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (
        <Container maxWidth="lg" sx={
            {
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }
        }>
            <Card sx={
                {
                    width: '100%'
                }
            }>
                <Grid container sx={
                    {
                        backgroundImage: `url(${bgImg})`,
                        backgroundSize: 'cover'
                    }
                }>
                    <Grid xs={false} sm={4} md={7}></Grid>
                    <Grid xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography variant="h5">
                                账号注册
                            </Typography>

                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="phone"
                                    label="手机号"
                                    name="phone"
                                    autoComplete="phone"
                                    autoFocus
                                />
                                <Grid container>
                                    <Grid xs={8}>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="code"
                                            label="验证码"
                                            name="code"
                                            autoComplete=""
                                        />
                                    </Grid>
                                    <Grid xs={4} sx={
                                        {
                                            display: 'flex',
                                            justifyContent: 'end'
                                        }
                                    }>
                                        <Button
                                            type="submit"
                                            sx={{ height: '56px', marginTop: '16px', marginBottom: '8px' }}
                                            variant='outlined'
                                        >
                                            获取验证码
                                        </Button>
                                    </Grid>
                                </Grid>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="nickname"
                                    label="昵称"
                                    type="nickname"
                                    id="nickanme"
                                    autoComplete="nickname"
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="密码"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    注册
                                </Button>
                                <Grid container>
                                    <Grid xs>
                                        <Link href="#" variant="body2">
                                            忘记密码?
                                        </Link>
                                    </Grid>
                                    <Grid>
                                        <Link href="#" variant="body2">
                                            {"已有账号? 立即登录"}
                                        </Link>
                                    </Grid>
                                </Grid>
                                <Copyright sx={{ mt: 5 }} />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Card>
        </Container>
    )
}
export default Register 