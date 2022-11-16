import React, { ChangeEventHandler, PropsWithChildren } from 'react';

import MuiTextField from '@mui/material/TextField';
import { SxProps, Theme } from '@mui/material';

interface Props {
  label?: string;
  defaultValue?: string;
  value?: string;
  required?: boolean;
  onChange?: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> | undefined;
  helperText?: string;
  type?:
  | 'button'
  | 'checkbox'
  | 'date'
  | 'email'
  | 'file'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'tel'
  | 'text';
  error?: boolean;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement | HTMLInputElement> | undefined;
  variant?: 'filled' | 'outlined' | 'standard';
  name?: string;
  sx?: SxProps<Theme>
  id?: string;
  refs: any;
}

const TextField: React.FC<Props> = (props: PropsWithChildren<Props>): React.ReactElement => (
  <MuiTextField
    id={props.id}
    fullWidth
    label={props.label}
    value={props.value || ''}
    required={props.required || false}
    // onChange={props.onChange}
    error={props.error || false}
    helperText={props.helperText}
    type={props.type}
    onBlur={props.onBlur}
    variant={props.variant || 'standard'}
    name={props.name}
    InputLabelProps={{
      shrink: true,
    }}
    sx={props.sx}
  />
);

export { TextField };
