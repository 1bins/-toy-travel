import style from './modal.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(style);

interface Props {
  children: React.ReactNode;
}

const Modal = ({children}: Props) => {
  return(
    <div className={cx('inner')}>
      <div className={cx('inner-box')}>
        {children}
      </div>
    </div>
  )
}

export default Modal;