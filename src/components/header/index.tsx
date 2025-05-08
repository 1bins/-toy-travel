import style from './header.module.scss';
import classNames from "classnames/bind";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";
import IMAGES from "@/lib/images.ts";
import {removePlaceAll} from "@/store/likedSlice.ts";

const cx = classNames.bind(style);
const { commonImages } = IMAGES;

const Header = () => {
    // ** hooks
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const dispatch = useDispatch();
    const [isIntro, setIsIntro] = useState<boolean>(false);

    // ** store
    const { name } = useSelector((state: RootState) => state.user);
    const isSkip = query.get("skip");
    const user = localStorage.getItem('user');

    // ** variables
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user || name) {
            setIsIntro(true);
        }
    }, [name]);

    useEffect(() => {
        if (!user) {
            navigate("/");
            dispatch(removePlaceAll());
        }
    }, [user]);

    return(
        <header>
            <div className={cx('inner')}>
                <h1>
                    <Link to={isSkip ? "/?skip=1" : "/"}>
                        <img src={isSkip || isIntro ? commonImages.logo : commonImages.logo_intro} alt="여행어때 로고 이미지"/>
                    </Link>
                </h1>
            </div>
        </header>
    )
}

export default Header;