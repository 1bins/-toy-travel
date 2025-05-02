import style from './HomeItem.module.scss';
import classNames from 'classnames/bind';
import {MockData} from "@/components/types.ts";

const cx = classNames.bind(style);

const HomeItem = ({ title, imageUrl }: MockData) => {
  return(
    <article className={cx('item')}>
      <div className={cx('img-box')}>
        <img src={imageUrl} alt={`${title} 이미지`} className={cx('--full')}/>
      </div>
      <div className={cx('cont-box')}>
        <p className={cx('title')}>{title}</p>
        <p className={cx('date')}>
          <span>2025.04.29 ~</span><br/>
          <span>2025.05.01</span>
        </p>
      </div>
    </article>
  )
}

export default HomeItem;