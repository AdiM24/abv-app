import { Box } from "@mui/material";
import { FC, ReactElement, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import LoginImage from '../../assets/accounting.webp';
import LoginForm, { User } from "../../components/LoginForm";
import useAuth from "../../context/AuthContext";

const LoginPage: FC<any> = (): ReactElement => {
    const auth = useAuth();

    const onUserInput = (user: User) => {
        auth.login(user);
    };

    const location = useLocation();

    useEffect(() => {
        if (location.state?.error) {
            console.log('here');
            toast.error(location.state?.error, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            if (auth.error) {
                toast.error(auth.error, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        }
    }, [auth.error, location.state])

    return (
        <Box style={{ height: '100%', overflowY: 'hidden' }}>
            <Box className='login-page-container' style={{
                display: 'flex',
                height: '100%',
            }}>

                <Box className='login-form-container' style={{
                    width: '30%',
                    margin: '3rem',
                }}>
                    <h2>[LOGO] ABV</h2>
                    <Box style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        height: '100%',
                    }}>
                        <h3>Please enter your credentials</h3>
                        <LoginForm onUserInput={onUserInput} />
                    </Box>
                </Box>
                <Box style={{
                    width: '70%',
                }} className='login-form-image-container'>
                    <img style={{ width: '100%', height: '100%' }} src={LoginImage} alt='Accounting' />
                </Box>
            </Box>
        </Box>
    );

}

export default LoginPage;