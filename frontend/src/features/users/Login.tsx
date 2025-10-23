import {NavLink, useNavigate} from "react-router-dom";
import {Avatar, Box, Button, Link, Stack, TextField, Typography, Alert} from "@mui/material";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectLoginError, selectLoginLoading} from "./usersSlice.ts";
import {type ChangeEvent, type FormEvent, useState} from "react";
import type {LoginMutation} from "../../types";
import {googleLogin, login} from "./usersThunks.ts";
import {type CredentialResponse, GoogleLogin} from "@react-oauth/google";

const Login = () => {
    const dispatch = useAppDispatch();
    const error = useAppSelector(selectLoginError);
    const loading = useAppSelector(selectLoginLoading);
    const navigate = useNavigate();

    const [state, setState] = useState<LoginMutation>({
        username: '',
        password: '',
    });

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setState(prevState => ({...prevState, [name]: value}));
    };

    const onSubmitForm = async (e: FormEvent) => {
        e.preventDefault();

        try{
            await dispatch(login(state)).unwrap();
            navigate("/");
        } catch (e) {
            console.error(e);
        }
    };

    const googleLoginHandler = async (credentialResponse: CredentialResponse) => {
        if(credentialResponse.credential) {
            await dispatch(googleLogin(credentialResponse.credential)).unwrap();
            navigate('/');
        }
    }

    return (
        <Box sx={{marginTop: 8, display: 'flex',flexDirection: 'column', alignItems: 'center'}}>
            <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                <LockOpenIcon/>
            </Avatar>
            <Typography component={'h1'} variant={'h5'}>
                Sign In
            </Typography>
            {error && (
                <Alert severity={'error'} sx={{mt: 3}}>
                    {error.error}
                </Alert>
            )}
            <Box sx={{mt: 3}}>
                <GoogleLogin onSuccess={googleLoginHandler}></GoogleLogin>
            </Box>
            <Box component={'form'} onSubmit={onSubmitForm} sx={{my: 3, maxWidth: '400px', width: '100%'}}>
                <Stack spacing={2}>
                    <TextField
                        required
                        label="Username"
                        name="username"
                        value={state.username}
                        onChange={inputChangeHandler}
                        autoComplete="current-username"
                    />
                    <TextField
                        required
                        type="password"
                        label="Password"
                        name="password"
                        value={state.password}
                        onChange={inputChangeHandler}
                        autoComplete="current-password"
                    />
                    <Button
                        type={'submit'}
                        fullWidth
                        variant="contained"
                        sx={{mb: 2}}
                        disabled={loading}
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </Button>
                </Stack>
            </Box>
            <Link component={NavLink} to={'/register'}>Don't have an account yet? Sign up here</Link>
        </Box>
    );
};

export default Login;