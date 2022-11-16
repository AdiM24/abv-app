import React, { PropsWithChildren, ReactNode } from 'react';

import MuiIconButton from '@mui/material/IconButton';

interface Props {
  icon: any;
  color?: 'secondary' | 'primary' | 'warning' | 'info' | 'default' | 'success' | 'inherit' | 'error';
  disabled?: boolean;
  onClick: () => void;
}

const IconButton: React.FC<Props> = (props: PropsWithChildren<Props>): React.ReactElement => (
  <MuiIconButton color={props.color || 'primary'} disabled={props.disabled || false} onClick={props.onClick}>
    {props.icon}
  </MuiIconButton>
);

export { IconButton };
