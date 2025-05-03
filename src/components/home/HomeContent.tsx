import style from "./HomeContent.module.scss";
import classNames from "classnames/bind";
import {useNavigate} from "react-router-dom";
import { H3 } from "@/components/heading";
import Button from "@/components/button";
import HomeItem from "@/components/home/HomeItem.tsx";
import HomeHotel from "@/components/home/HomeHotel.tsx";
import {MockData} from "@/components/types.ts";

const cx = classNames.bind(style);

import {mockup} from "@/mocks/mockup.ts";


const HomeContent = () => {
  // ** hooks
  const navigate = useNavigate();

  return(
    <div className={cx('inner')}>
      {/* 여행 목적지 */}
      <div className={cx('attraction')}>
        <H3><b>홍길동</b>님의 여행 목적지</H3>
        <div className={cx('list-box')}>
          {mockup.map((item: MockData, idx: number) => <HomeItem key={idx} {...item} />)}
        </div>
        <Button
          type={'button'}
          shape={'with-character'}
          onClick={() => navigate("/search")}
        >목적지 추가하기</Button>
      </div>
      {/* 숙박 목적지 */}
      <div className={cx('hotel')}>
        <H3><b>홍길동</b>님의 숙박 예정</H3>
        <HomeHotel/>
      </div>
    </div>
  )
}

export default HomeContent;