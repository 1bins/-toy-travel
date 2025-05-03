import {useState} from "react";
import style from './search.module.scss';
import classNames from "classnames/bind";
import SearchList from "@/components/search/SearchList.tsx";
import {H3} from "@/components/heading";
import Button from "@/components/button";
import {Location} from "@/components/types.ts";
import {LocationSigungu} from "@/components/types.ts";
import axiosDefault from "@/lib/axios.ts";
import {LocationList} from "@/lib/location.ts";

const cx = classNames.bind(style);

const Search = () => {
  // ** hooks
  const [clickedLocation, setClickedLocation] = useState<number>(0);
  const [clickedSigungu, setClickedSigungu] = useState<number>(0);
  const [sigunguData, setSigunguData] = useState<LocationSigungu[]>([]);

  // ** variables
  const getSigungu = async (areaCode: number) => {
    try {
      const response = await axiosDefault.get("areaCode1", {
        params: {
          areaCode,
          numOfRows: 31
        }
      })
      setSigunguData(response.data.response.body.items.item);
    } catch (err) {
      // TODO:: 오류 처리
      console.log(err);
    }
  }

  const changeLocation = (code: number) => {
    if (clickedLocation === code) {
      alert("이미 선택된 지역입니다");
      return;
    }
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

  return (
    <div className={cx('inner')}>
      <H3>STEP1. <b>어디로 떠나실 건가요?</b></H3>
      <SearchList<Location>
        list={LocationList}
        selectedCode={clickedLocation}
        getCode={(item) => item.areaCode}
        getName={(item) => item.areaName}
        onClick={changeLocation}
      />
      <SearchList<LocationSigungu>
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
            shape={'with-character'}
          >목적지 검색하기</Button>
        </div>
      }
    </div>
  )
}

export default Search;