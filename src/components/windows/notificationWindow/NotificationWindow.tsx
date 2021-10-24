import { FC } from 'react';
import './notificationWindow.css'

type NotifictationWindowType = {
  notificationMessage: string;
  isError: boolean;
};

const NotificationWindow: FC<NotifictationWindowType> = ({
  notificationMessage,
  isError,
}) => {
  const typeTitle = isError ? 'Ошибка !!!' : 'Поздравляем !!!';
  const windowColor = isError ? 'red' : '';

  return (
    <div className={`notification-window ${windowColor}`}>
      <div className='content-container'>
        <p>{typeTitle}</p>
        <p>{notificationMessage}</p>
      </div>
    </div>
  );
};

export default NotificationWindow;
