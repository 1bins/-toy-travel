import style from "./Intro.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

const Intro = () => {
    return (
        <section id="intro" className={cx('intro')}>
            <div className={cx('inner')}>
                <div className="character-box">
                    <img src="@/assets/images/intro/character.png" alt="여행어때 캐릭터 이미지"/>
                </div>
            </div>
        </section>
    )
}

export default Intro;