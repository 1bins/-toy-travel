import {useState} from "react";
import {useDispatch} from "react-redux";
import {setUser} from "@/store/userSlice.ts";
import style from "./Intro.module.scss";
import classNames from "classnames/bind";
import IMAGES from "@/lib/images.ts";

const cx = classNames.bind(style);
const { introImages } = IMAGES;

const Intro = () => {
    // ** hooks
    const [userName, setUserName] = useState<string>("");
    const [isStart, setIsStart] = useState<boolean>(false);
    const [isPass, setIsPass] = useState<boolean>(false);
    const dispatch = useDispatch();

    // ** variables
    const onSubmit = () => {
        if (userName.length < 1) {
            alert('[탑승 거부]\nERR:: 정확한 이름을 입력해주세요.');
            return;
        }
        alert(`[탑승 준비]\n반갑습니다 ${userName}님.\n확인을 누르시면 여행 안내가 시작됩니다.`);
        setIsPass(!isPass);

        setTimeout(() => {
            localStorage.setItem('user', userName);
            dispatch(setUser(userName));
        }, 2000)
    };

    const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onSubmit();
        }
    };

    return (
        <section id="intro" className={cx('intro')}>
            <div className={cx('inner')}>
                {
                    !isStart &&
                    (
                        <div className={cx('intro__background-box')}>
                            <div className={cx('character-box')}>
                                <img src={introImages.character} className={cx('--full')} alt="여행어때 캐릭터 이미지"/>
                            </div>
                            <div className={cx('button-box')}>
                                <button
                                    type="button"
                                    onClick={() => setIsStart(!isStart)}
                                >
                                    <img src={introImages.btnText} className={cx('--full')} alt="여행어때 시작하기 텍스트"/>
                                </button>
                            </div>
                        </div>
                    )
                }
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
                                onKeyDown={(e) => handleKeyDown(e)}
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
            </div>
        </section>
    )
}

export default Intro;