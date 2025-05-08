import style from './SearchResult.module.scss';
import classNames from "classnames/bind";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosDefault from "@/lib/axios.ts";
import {PlaceResultInfo} from "@/components/types.ts";
import SearchResultItem from "@/components/search/SearchResultItem.tsx";
import Paging from "@/components/paging";
import Skeleton from "@/components/skeleton";
import Button from "@/components/button";
import Toast from "@/components/toast";
import {useToast} from "@/hooks/useToast.ts";


const cx = classNames.bind(style);

const SearchResult = () => {
  // ** hooks
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [resultData, setResultData] = useState<PlaceResultInfo[]>([]);

  // ** variables
  const { isOpen, message, showToast, closeToast } = useToast();
  const areaCode = query.get("areaCode");
  const sigunguCode = query.get("sigunguCode");
  const contentTypeId = query.get("contentTypeId");
  const address = resultData[0]?.addr1 || "";

  useEffect(() => {
    if (!areaCode || !sigunguCode) {
      alert('올바른 경로가 아닙니다');
      navigate(`/search?contentTypeId=${contentTypeId}`, {replace: true});
      return;
    }

    const getResult = async () => {
      try {
        const response = await axiosDefault.get('/areaBasedList1', {
          params: {
            areaCode,
            sigunguCode,
            contentTypeId,
            numOfRows: 10,
            pageNo: currentPage,
          }
        });

        if (!response.data.response) {
          throw new Error('서비스 접속 에러');
        }

        const data = response.data.response.body;

        if (data.totalCount === 0) {
          alert('조회된 항목이 없습니다.');
          navigate(-1);
        } else {
          setTotalPage(Math.round(data.totalCount / 10));
          setIsLoading(false);
          setResultData(data.items.item);
        }
      } catch(err) {
        console.log(err);
        alert('현재 서비스 이용이 불가능 합니다. \n잠시 후 다시 시도해주세요.');
        navigate(`/search?contentTypeId=${contentTypeId}`, {replace: true});
      }
    }

    getResult();
  }, [areaCode, sigunguCode, currentPage]);

  return (
    <div className={cx('inner')}>
      <div className={cx('inner-title')}>
        <p className={cx('result-title')}>
          {contentTypeId === "12" ? "관광 목적지 검색" : "숙박지 검색"}
        </p>
        <div className={cx('info-box')}>
          <p className={cx('place')}>📌 {`${address?.split(" ")[0] || ""} ${address?.split(" ")[1] || ""}`}</p>
          <Button
            type={"button"}
            shape={"location"}
            onClick={() => navigate(`/search?contentTypeId=${contentTypeId}`, {state: {areaCode}})}
          >다른 지역 선택하기</Button>
        </div>
      </div>
      {
        isLoading ?
          (
            Array.from({ length: 10 }).map((_, idx: number) => (
              <Skeleton key={idx} />
            ))
          )
          :
          <>
            <div className={cx('result-list')}>
              {resultData.map((item, idx) => (
                <SearchResultItem
                  key={idx}
                  {...item}
                  onLike={(msg) => showToast(msg)}
                />
              ))}
            </div>
            <div className={cx('page-list')}>
              <Paging
                currentPage={currentPage}
                totalPage={totalPage}
                onPageChange={setCurrentPage}
                groupSize={5}
              />
            </div>
          </>
        }
        <Toast message={message} isOpen={isOpen} onClose={closeToast} />
    </div>
  )
}

export default SearchResult;