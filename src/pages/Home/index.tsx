import {useEffect, useState} from "react";
// import axiosDefault from "../../lib/axios.ts";
import Intro from "../Intro";
import {useSelector} from "react-redux";
import {RootState} from "@/store";

const Home = () => {
    // ** hooks
    const [isIntro, setIsIntro] = useState(false);

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
        <div>
            {!isIntro && <Intro/>}
            {/* TODO:: totalCount 가져오기 */}
            {/*<button onClick={() => onChangePage(pageNum, 20)}>다음 페이지</button>*/}
        </div>
    )
}

export default Home;