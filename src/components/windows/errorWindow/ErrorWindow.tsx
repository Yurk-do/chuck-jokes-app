import React, { FC } from 'react';
import './errorWindow.css';

type PropsType = {
  closeErrorWindow: () => void;
  mainMessage: string;
  extraMessage: string;
};

const ErrorWindow: FC<PropsType> = ({
  closeErrorWindow,
  mainMessage,
  extraMessage,
}) => {
  return (
    <div className='error-window'>
      <div className='content-container'>
        <p>{mainMessage}</p>
        <p>{extraMessage}</p>
      </div>
      <button className='button-close-error-window' onClick={closeErrorWindow}>
        OK
      </button>
    </div>
  );
};

export default ErrorWindow;
