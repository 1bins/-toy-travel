import style from './header.module.scss';
import classNames from "classnames/bind";
import {Link} from "react-router-dom";
import {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import IMAGES from "@/lib/images.ts";

const cx = classNames.bind(style);
const { commonImages } = IMAGES;

const Header = () => {
    // ** hooks
    const [isIntro, setIsIntro] = useState<boolean>(false);

    // ** store
    const { name } = useSelector((state: RootState) => state.user);

    // ** variables
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user || name) {
            setIsIntro(true);
        }
    }, [name]);

    return(
        <header>
            <div className={cx('inner')}>
                <h1>
                    <Link to={"/"}>
                        <img src={isIntro ? commonImages.logo : commonImages.logo_intro} alt="여행어때 로고 이미지"/>
                    </Link>
                </h1>
            </div>
        </header>
    )
}

export default Header;