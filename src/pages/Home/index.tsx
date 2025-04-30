import {useEffect, useState} from "react";
import axiosDefault from "../../lib/axios.ts";
import Intro from "../Intro";

const Home = () => {
    const [pageNum, setPageNum] = useState(1);

    const onChangePage = (pageNum: number, totalCount: number) => {
        let totalPage = Math.ceil(totalCount / 10);
        if (pageNum >= totalPage) {
            return;
        }
        setPageNum(pageNum + 1);
    }

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
            <Intro/>
            {/* TODO:: totalCount 가져오기 */}
            <button onClick={() => onChangePage(pageNum, 20)}>다음 페이지</button>
        </div>
    )
}

export default Home;