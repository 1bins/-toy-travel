import style from './SearchResult.module.scss';
import classNames from "classnames/bind";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosDefault from "@/lib/axios.ts";
import {PlaceResultInfo} from "@/components/types.ts";
import SearchResultItem from "@/components/search/SearchResultItem.tsx";
import Paging from "@/components/paging";

const cx = classNames.bind(style);

const SearchResult = () => {
  // ** hooks
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [resultData, setResultData] = useState<PlaceResultInfo[]>([]);

  // ** variables
  const areaCode = query.get("areaCode");
  const sigunguCode = query.get("sigunguCode");

  useEffect(() => {
    // TODO:: 코드값 없을때
    if (!areaCode || !sigunguCode) {
      alert('올바른 경로가 아닙니다');
      return;
    }

    const getResult = async () => {
      try {
        const response = await axiosDefault.get('/areaBasedList1', {
          params: {
            areaCode,
            sigunguCode,
            contentTypeId: 12,
            numOfRows: 10,
            pageNo: currentPage,
          }
        });
        const data = response.data.response.body;

        setTotalPage(Math.round(data.totalCount / 10));
        setResultData(data.items.item);
      } catch(err) {
        // TODO:: 에러 처리
        console.log(err);
      }
    }

    getResult();
  }, [areaCode, sigunguCode, currentPage]);

  return (
    <div className={cx('inner')}>
      <div className={cx('result-list')}>
        {resultData.map((item, idx) => <SearchResultItem key={idx} {...item} />)}
      </div>
      <div className={cx('page-list')}>
        <Paging currentPage={currentPage}
                totalPage={totalPage}
                onPageChange={setCurrentPage}
                groupSize={5}
        />
      </div>
    </div>
  )
}

export default SearchResult;