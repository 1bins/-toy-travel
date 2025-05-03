import {useState} from "react";
import {useDispatch} from "react-redux";
import {setUser} from "@/store/userSlice.ts";

import style from "./Intro.module.scss";
import classNames from "classnames/bind";
import IMAGES from "@/lib/images.ts";

const cx = classNames.bind(style);
const { introImages } = IMAGES;

const IntroForm = () => {
  // ** hooks
  const [userName, setUserName] = useState<string>("");
  const [isPass, setIsPass] = useState<boolean>(false);
  const dispatch = useDispatch();

  // variables
  const onSubmit = () => {
    if (userName.length < 1) {
      alert('[탑승 거부]\nERR:: 정확한 이름을 입력해주세요.');
      return;
    }
    setIsPass(!isPass);

    setTimeout(() => {
      localStorage.setItem('user', userName);
      dispatch(setUser(userName));
    }, 1500)
  };

  const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div className={cx('intro__form-box')}>
      <div className={cx('form-box', {'--isPass': isPass})}>
        <p className={cx('form-title')}>
          {isPass ? (
            <>
              <b>{userName}</b>님, 여정을 시작합니다
            </>
          ) : (
            "떠나고자 하는 당신의 이름을 알려주세요!"
          )}
        </p>
        <div className={cx('input-box')}>
          <input
            type="text"
            placeholder="PASSPORT NAME"
            value={userName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setUserName(e.target.value)}}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(e)}
          />
          <button
            type="button"
            onClick={onSubmit}
          >
            <img src={introImages.airplane} alt="비행기 아이콘"/>
          </button>
        </div>
      </div>
    </div>
  )
}

export default IntroForm;