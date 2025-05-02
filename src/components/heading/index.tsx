import style from './heading.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(style);

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const H3 = ({ children, className }: Props) => {
  return (
    <h3 className={cx('h3', className)}>{children}</h3>
  )
};