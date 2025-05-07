import style from './HomeAlert.module.scss';
import classNames from "classnames/bind";
import Button from "@/components/button";
import IMAGES from "@/lib/images.ts";
import {useNavigate} from "react-router-dom";

const cx = classNames.bind(style);

const HomeAlert = () => {
  const {mainImages} = IMAGES;
  const navigate = useNavigate();

  return(
    <div className={cx('inner')}>
      <div className={cx('img-box')}>
        <img src={mainImages.none_content} alt="여행어때 캐릭터 이미지" className={cx('--full')}/>
      </div>
      <div className={cx('cont-box')}>
        <p className={cx('alert')}>앗! 즐겨찾기 목적지가 없어요...
          <br/>아래 버튼을 통해 새로운 목적지를 찾아볼까요?</p>
        <Button
          type={"button"}
          onClick={() => {navigate("/search?contentTypeId=12")}}
        >추가하기</Button>
      </div>
    </div>
  )
}

export default HomeAlert;