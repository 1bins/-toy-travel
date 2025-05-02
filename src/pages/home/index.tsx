import {useEffect, useState} from "react";
import style from "./home.module.scss";
import classNames from "classnames/bind";
import Intro from "@/components/Intro";
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import HomeContent from "@/components/home/HomeContent.tsx";
// import HomeAlert from "@/components/home/HomeAlert.tsx";
// import axiosDefault from "../../lib/axios.ts";

const cx = classNames.bind(style);

const Home = () => {
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

    /*
    const onChangePage = (pageNum: number, totalCount: number) => {
        let totalPage = Math.ceil(totalCount / 10);
        if (pageNum >= totalPage) {
            return;
        }
        setPageNum(pageNum + 1);
    }
    */

    /*
    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await axiosDefault.get("areaCode1", {
                    params: {
                        // areaCode: 31,
                        numOfRows: 10,
                        pageNo: pageNum,
                    }
                })
                console.log(response.data);
            } catch(err) {
                console.log(err);
            }
        }

        fetchData();
    }, [pageNum]);
    */

    return(
        <div className={cx('inner')}>
            {!isIntro && <Intro/>}
            {/* 컨텐츠 없을 때 */}
            {/*<HomeAlert/>*/}
            <HomeContent />
        </div>
    )
}

export default Home;