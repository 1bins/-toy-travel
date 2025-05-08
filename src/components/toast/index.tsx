import style from './toast.module.scss';
import classNames from "classnames/bind";
import {useEffect} from "react";
import { useLocation } from 'react-router-dom';

const cx = classNames.bind(style);

interface Props {
  message: string;
  isOpen: boolean;
  onClose: () => void;
}

const Toast = (
  { message,
    isOpen,
    onClose }
  : Props) => {
  // ** hooks
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const contentTypeId = query.get('contentTypeId');

  // ** variables
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen &&
        <div
          className={cx(['inner', contentTypeId === "32" ? "hotel" : ""])}>
            <p>{message}</p>
        </div>
      }
    </>
  )
}

export default Toast;