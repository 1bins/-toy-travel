import {useEffect, useState} from "react";
import style from "./home.module.scss";
import classNames from "classnames/bind";
import Intro from "@/components/Intro";
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import HomeContent from "@/components/home/HomeContent.tsx";
import HomeAlert from "@/components/home/HomeAlert.tsx";

const cx = classNames.bind(style);

const Home = () => {
    // ** hooks
    const [isIntro, setIsIntro] = useState<boolean>(false);

    // ** store
    const { name } = useSelector((state: RootState) => state.user);
    const { likedPlaces } = useSelector((state: RootState) => state.liked);

    // ** variables
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user || name) {
            setIsIntro(true);
        }
    }, [name]);

    return(
        <div className={cx('inner')}>
            {!isIntro ?
              <Intro/>
              :
              likedPlaces.length > 0 ?
                <HomeContent/>
              :
                <HomeAlert/>
            }
        </div>
    )
}

export default Home;