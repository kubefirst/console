import React, { FunctionComponent } from 'react';
import ModalMui from '@mui/material/Modal';
import Box from '@mui/material/Box';

export { Close } from './Modal.styled';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  borderRadius: '8px',
  outline: 'none',
  zIndex: 1202,
};

export interface IModalProps {
  backgroundColor?: string;
  boxShadow?: boolean;
  children: React.ReactElement;
  isOpen: boolean;
  onCloseModal?: () => void;
  padding?: number;
  styleOverrides?: React.CSSProperties;
}

const Modal: FunctionComponent<IModalProps> = ({
  backgroundColor = 'white',
  boxShadow = true,
  children,
  isOpen,
  onCloseModal,
  padding = 4,
  styleOverrides = {},
}) => (
  <ModalMui
    open={isOpen}
    onClose={onCloseModal}
    aria-labelledby="modal-title"
    aria-describedby="modal-description"
    sx={{ zIndex: 1201 }}
  >
    <Box
      sx={{
        ...style,
        p: padding,
        backgroundColor,
        boxShadow: boxShadow ? 24 : 0,
        ...styleOverrides,
      }}
    >
      {children}
    </Box>
  </ModalMui>
);

export default Modal;
