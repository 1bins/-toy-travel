import style from './skeleton.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(style);

interface Props {
  header?: boolean;
}

const Skeleton = ({header}: Props) => {
  return (
    <div className={cx('inner')}>
      {header && (<div className={cx('skeleton', 'skeleton-header')}></div>)}
      <div className={cx('skeleton', 'skeleton-image')}></div>
      <div className={cx('skeleton', 'skeleton-content')}></div>
    </div>
  )
}

export default Skeleton;