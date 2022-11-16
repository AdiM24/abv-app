import React, { ReactNode } from 'react';

import MuiButton from '@mui/material/Button';
import { SxProps, Theme } from '@mui/material';

interface Props {
  disabled?: boolean;
  onClick?: () => void;
  title: string;
  variant?: 'contained' | 'text' | 'outlined';
  size?: 'medium' | 'large' | 'small' | undefined;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  color?: 'secondary' | 'primary' | 'warning' | 'info' | 'default' | 'success' | 'inherit' | 'error';
  sx?: SxProps<Theme> | undefined;
  type?: 'submit' | 'button' | 'reset'
}

const Button: React.FC<Props> = (props: Props): React.ReactElement => (
  <MuiButton
    variant={props.variant || 'contained'}
    color="primary"
    disabled={props.disabled || false}
    onClick={props.onClick}
    size={props.size || undefined}
    sx={props.sx}
    type={props.type || 'button'}
  >
    {props.title}
  </MuiButton>
);

export default Button;
