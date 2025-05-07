import style from "./HomeContent.module.scss";
import classNames from "classnames/bind";
import {useNavigate} from "react-router-dom";
import {H3} from "@/components/heading";
import Button from "@/components/button";
import HomeItem from "@/components/home/HomeItem.tsx";
import HomeHotel from "@/components/home/HomeHotel.tsx";
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import {Place} from "@/components/types.ts";
import {useEffect, useState} from "react";

const cx = classNames.bind(style);

const HomeContent = () => {
  // ** hooks
  const navigate = useNavigate();
  const {likedPlaces} = useSelector((state: RootState) => state.liked);
  const [userName, setUserName] = useState<string | null>("");

  useEffect(() => {
    const name = localStorage.getItem("user");
    setUserName(name);
  }, []);

  return(
    <div className={cx('inner')}>
      {/* 여행 목적지 */}
      <div className={cx('attraction')}>
        <H3><b>{userName}</b>님의 여행 목적지</H3>
        <div className={cx('list-box')}>
          {likedPlaces.map((item: Place, idx: number) => <HomeItem key={idx} {...item} />)}
        </div>
        <Button
          type={'button'}
          shape={'with-character'}
          onClick={() => navigate("/search?contentTypeId=12")}
        >목적지 추가하기</Button>
      </div>
      {/* 숙박 목적지 */}
      <div className={cx('hotel')}>
        <H3><b>{userName}</b>님의 숙박 예정</H3>
        <HomeHotel/>
      </div>
    </div>
  )
}

export default HomeContent;