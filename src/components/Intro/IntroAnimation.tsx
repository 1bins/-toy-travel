import style from "./Intro.module.scss";
import classNames from "classnames/bind";
import IMAGES from "@/lib/images.ts";

const cx = classNames.bind(style);
const { introImages } = IMAGES;

interface Props {
  onStart: () => void;
}

const IntroAnimation = ({ onStart }: Props) => {
  return (
    <div className={cx('intro__background-box')}>
      <div className={cx('character-box')}>
        <img src={introImages.character} className={cx('--full')} alt="여행어때 캐릭터 이미지"/>
      </div>
      <div className={cx('button-box')}>
        <button
          type="button"
          onClick={onStart}
        >
          <img src={introImages.btnText} className={cx('--full')} alt="여행어때 시작하기 텍스트"/>
        </button>
      </div>
    </div>
  )
}

export default IntroAnimation;