import React, { FunctionComponent, useRef } from 'react';

import Modal, { Close } from '../Modal/Modal';
import { FLAPPY_TWEET } from '../../constants';

import { ShareInTwitter } from './FlappyKray.styled';

export interface FlappyKrayProps {
  closeModal: () => void;
  isOpen: boolean;
}

const FlappyKray: FunctionComponent<FlappyKrayProps> = ({ closeModal, isOpen }) => {
  const flappyKRayRef = useRef<HTMLIFrameElement>(null);

  return (
    <Modal isOpen={isOpen} backgroundColor="transparent" boxShadow={false}>
      <>
        <iframe
          id="flappy-kray"
          title="Flappy KRay"
          src="https://kray.kubefirst.io"
          ref={flappyKRayRef}
          style={{
            border: 0,
            height: '700px',
            width: '1050px',
          }}
        />
        <ShareInTwitter
          color="secondary"
          fontSize="large"
          onClick={() =>
            window.open(`https://twitter.com/intent/tweet?url=${encodeURI(FLAPPY_TWEET)}`, '_blank')
          }
        />
        <Close onClick={closeModal} color="secondary" fontSize="large" />
      </>
    </Modal>
  );
};

export default FlappyKray;
