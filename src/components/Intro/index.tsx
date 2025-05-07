import {useState} from "react";
import style from "./Intro.module.scss";
import classNames from "classnames/bind";
import IntroAnimation from "@/components/Intro/IntroAnimation.tsx";
import IntroForm from "@/components/Intro/IntroForm.tsx";
import {useNavigate} from "react-router-dom";

const cx = classNames.bind(style);

const Intro = () => {
  // ** hooks
  const navigate = useNavigate();
  const [isStart, setIsStart] = useState<boolean>(false);

  // ** variables
  const onStart = () => {
    setIsStart(!isStart);
    navigate("/?skip=1");
  }
  return (
    <section id="intro" className={cx('intro')}>
      <div className={cx('inner')}>
        { !isStart ?
          <IntroAnimation
            onStart={onStart}
          /> :
          <IntroForm />}
      </div>
    </section>
  )
}

export default Intro;