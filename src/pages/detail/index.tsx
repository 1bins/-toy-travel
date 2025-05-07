import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import style from './detail.module.scss';
import classNames from "classnames/bind";
import axiosDefault from "@/lib/axios.ts";
import {PlaceDetailInfo} from "@/components/types.ts";
import Button from "@/components/button";
import IMAGES from "@/lib/images.ts";
import {useDispatch, useSelector} from "react-redux";
import {addPlace, removePlace} from "@/store/likedSlice.ts";
import {RootState} from "@/store";
import {Place} from "@/components/types.ts";

const cx = classNames.bind(style);
const {commonImages} = IMAGES;

const Detail = () => {
  // ** hooks
  const dispatch = useDispatch();
  const {contentId, contentTypeId} = useParams();
  const [data, setData] = useState<PlaceDetailInfo | null>(null);

  // ** variables
  const { likedPlaces } = useSelector((state: RootState) => state.liked);
  const isLike = likedPlaces.some((place: Place) => {
    return place.contentid === data?.contentid
  });
  const toggleLike = () => {
    if (!data) return;

    if (isLike) {
      dispatch(removePlace(data.contentid));
    } else {
      dispatch(addPlace({title: data.title, firstimage: data.firstimage, addr1: data.addr1, contentid: data.contentid, contenttypeid: data.contenttypeid}));
    }
  }

  useEffect(() => {
    const getDetailPage = async () => {
      try {
        const response = await axiosDefault.get('detailCommon1', {
          params: {
            contentTypeId,
            contentId,
            defaultYN: "Y",
            firstImageYN: "Y",
            addrinfoYN: "Y",
            catcodeYN: "Y",
            mapinfoYN: "Y",
            overviewYN: "Y",
          }
        })

        const data = response.data.response.body.items.item[0];
        setData(data);

      } catch (err) {
        // TODO:: 에러 처리
        console.log(err);
      }
    }

    getDetailPage();
  }, [contentId, contentTypeId]);

  return data ? (
    <div className={cx('inner')}>
      <div className={cx('upper-box')}>
        <p className={cx('address')}>{data.addr1}</p>
        <p className={cx('title')}>{data.title}</p>
        <Button
          type={"button"}
          shape={["addMyList", isLike ? "" : "active"]}
          onClick={toggleLike}
        >{isLike ? <><img src={commonImages.icon_check} alt="저장된 아이콘"/>저장된 나의 일정</> : "나의 일정에 추가하기"}</Button>
      </div>
      <div className={cx('img-box')}>
        {data.firstimage ?
          <img src={data.firstimage} className={cx('--full')} alt={`${data.title} 이미지`}/> :
          <img src={commonImages.image_error} className={cx('--full')} alt={"오류 이미지"}/>
        }
      </div>
      <div className={cx('cont-box')}>
        <p className={cx('description')}>{data.overview}</p>
      </div>
    </div>
  ) :
  (
    <div>
      없는 페이지 입니다.
    </div>
  )
}

export default Detail;