import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import style from './search.module.scss';
import classNames from "classnames/bind";
import SearchList from "@/components/search/SearchList.tsx";
import {H3} from "@/components/heading";
import Button from "@/components/button";
import {Location} from "@/components/types.ts";
import {LocationSigungu} from "@/components/types.ts";
import Modal from "@/components/modal";
import axiosDefault from "@/lib/axios.ts";
import {LocationList} from "@/lib/location.ts";
import IMAGES from "@/lib/images.ts";

const cx = classNames.bind(style);

const Search = () => {
  // ** hooks
  const navigate = useNavigate();
  const location = useLocation();
  const resultAreaCode = location.state?.areaCode;
  const query = new URLSearchParams(location.search);
  const [isLoading, setIsLoading] = useState(false);
  const [clickedLocation, setClickedLocation] = useState<number>(parseInt(resultAreaCode) || 0);
  const [clickedSigungu, setClickedSigungu] = useState<number>(0);
  const [sigunguData, setSigunguData] = useState<LocationSigungu[]>([]);

  // ** variables
  const {modalImages} = IMAGES;
  const contentTypeId = query.get("contentTypeId");
  const getSigungu = async (areaCode: number) => {
    try {
      const response = await axiosDefault.get("areaCode1", {
        params: {
          areaCode,
          numOfRows: 31
        }
      })

      if (!response.data.response) {
        throw new Error('서비스 접속 에러');
      }

      setSigunguData(response.data.response.body.items.item);
    } catch (err) {
      console.log(err);
      alert('현재 서비스 이용이 불가능 합니다. \n잠시 후 다시 시도해주세요.');
      setClickedLocation(0);
    } finally {
      setIsLoading(false);
    }
  }

  const changeLocation = (code: number) => {
    if (clickedLocation === code) {
      alert("이미 선택된 지역입니다");
      return;
    }
    setIsLoading(true);
    setClickedSigungu(0);
    getSigungu(code);
    setClickedLocation(code);
  }

  const changeSigungu = (code: number) => {
    if (clickedSigungu === code) {
      alert("이미 선택된 지역입니다");
      return;
    }
    setClickedSigungu(code);
  }

  useEffect(() => {
    if (typeof resultAreaCode === "string") {
      setIsLoading(true);
      getSigungu(parseInt(resultAreaCode));
    }
  }, [resultAreaCode]);

  return (
    <div className={cx('inner')}>
      {isLoading &&
        <Modal>
            <img src={modalImages.loading} alt="로딩 이미지"/>
        </Modal>}
      <H3>STEP1. <b>어디로 떠나실 건가요?</b></H3>
      <SearchList<Location>
        contentTypeId={contentTypeId}
        list={LocationList}
        selectedCode={clickedLocation}
        getCode={(item) => item.areaCode}
        getName={(item) => item.areaName}
        onClick={changeLocation}
      />
      <SearchList<LocationSigungu>
        contentTypeId={contentTypeId}
        list={sigunguData}
        selectedCode={clickedSigungu}
        getCode={(item) => parseInt(item.code)}
        getName={(item) => item.name}
        onClick={changeSigungu}
        className={"list-sigungu"}
      />
      {
        clickedSigungu !== 0 &&
        <div className={cx('btn-box')}>
          <Button
            type={'button'}
            shape={['with-character', contentTypeId === "12" ? "" : "hotel"]}
            onClick={() => {navigate(`/result?areaCode=${clickedLocation}&sigunguCode=${clickedSigungu}&contentTypeId=${contentTypeId}`)}}
          >{contentTypeId === "12" ? "목적지" : "숙박지"} 검색하기</Button>
        </div>
      }
    </div>
  )
}

export default Search;