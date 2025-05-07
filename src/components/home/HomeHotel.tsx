import style from './HomeHotel.module.scss';
import classNames from "classnames/bind";
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import Button from "@/components/button";
import {useNavigate} from "react-router-dom";

const cx = classNames.bind(style);

const HomeHotel = () => {
  // ** hooks
  const navigate = useNavigate();
  const {likedHotels} = useSelector((state: RootState) => state.liked);

  // ** variables
  const onChangePage = (contentid: string) => {
    navigate(`/detail/${contentid}/32`);
  }

  return(
    <>
      {likedHotels.length > 0 ?
          <div
            className={cx("hotel")}
            onClick={() => onChangePage(likedHotels[0].contentid)}
          >
            <div className={cx('cont-box')}>
              <p className={cx('title')}>{likedHotels[0].title}</p>
              <p className={cx('address')}>{likedHotels[0].addr1}</p>
            </div>
            <div className={cx('img-box')}>
              <img src={likedHotels[0].firstimage} className={cx('--full')} alt={`${likedHotels[0].title} 이미지`}/>
            </div>
          </div>
          :
          <Button
            type={'button'}
            shape={['with-character', 'hotel']}
            onClick={() => navigate("/search?contentTypeId=32")}
          >숙박지 추가하기</Button>
      }
    </>
  )
}

export default HomeHotel;