import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { FC, ReactElement } from "react";
import { useForm } from 'react-hook-form';
import Button from "./Button";

export interface User {
  email: string;
  password: string;
}

interface Props {
  onUserInput: (user: User) => void;
}

const LoginForm: FC<Props> = (props): ReactElement => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onUserInput = (data: any) => {
    props.onUserInput(data);
  };

  return (
    <>
      <form className="user-form-container" onSubmit={handleSubmit(onUserInput)}>

        <TextField
          sx={{ width: '100%', my: '1rem' }}
          label='E-mail'
          variant='outlined'
          helperText={errors.email ? 'Invalid e-mail address' : ''}
          error={!!errors.email}
          inputProps={{ ...register('email', { required: true, pattern: /^\S+@\S+$/i }) }} />

        <TextField
          sx={{ width: '100%', my: '1rem' }}
          label='Password'
          variant='outlined'
          type='password'
          error={!!errors.password}
          helperText={errors.password ? 'Password is required' : ''}
          inputProps={{ ...register('password', { required: true }) }} />

        <Button color='primary' sx={{ width: '100%', mt: '1rem' }} type='submit' title='Submit' />

        <Box style={{ paddingTop: '1rem' }}>
          <a href="#" style={{ marginTop: '1rem' }}>
            Forgot your password?
          </a>
        </Box>
      </form>

    </>
  )
}

export default LoginForm;
