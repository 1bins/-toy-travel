import style from './HomeHotel.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(style);

const HomeHotel = () => {
  return(
    <div className={cx("hotel")}>
      <div className={cx('cont-box')}>
        <p className={cx('title')}>경주 파인데이 게스트하우스</p>
        <p className={cx('address')}>경상북도 경주시 원화로 178-3 (인왕동)</p>
        <p className={cx('date')}>
          <span>2025.04.29 ~ </span>
          <span>2025.05.01</span>
        </p>
      </div>
      <div className={cx('img-box')}>
        <img src="http://tong.visitkorea.or.kr/cms/resource/97/2548197_image2_1.jpg" className={cx('--full')} alt="호텔 이미지"/>
      </div>
    </div>
  )
}

export default HomeHotel;