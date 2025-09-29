import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import style from './detail.module.scss';
import classNames from "classnames/bind";
import axiosDefault from "@/lib/axios.ts";
import {PlaceDetailInfo} from "@/components/types.ts";
import Button from "@/components/button";
import IMAGES from "@/lib/images.ts";
import Skeleton from "@/components/skeleton";
import Toast from "@/components/toast";
import {useToast} from "@/hooks/useToast.ts";
import {useToggleLike} from "@/hooks/useToggleLike";

const cx = classNames.bind(style);
const {commonImages} = IMAGES;

const Detail = () => {
  // ** hooks
  const navigate = useNavigate();
  const {contentId, contentTypeId} = useParams();
  const [data, setData] = useState<PlaceDetailInfo | null>(null);

  // ** variables
  const { isOpen, message, showToast, closeToast } = useToast();
  const { toggleLike, isLiked } = useToggleLike();
  const onClickLike = () => {
    if (!data) return;
    toggleLike({ data, showToast });
  }
  const isLike = data ? isLiked(data.contentid, data.contenttypeid) : false;

  useEffect(() => {
    if (!contentId || !contentTypeId) {
      alert('올바른 경로가 아닙니다');
      navigate("/", {replace: true});
      return;
    }

    const getDetailPage = async () => {
      try {
        const response = await axiosDefault.get('/detailCommon2', {
          params: {
            contentId,
          }
        })

        if (!response.data.response) {
          throw new Error('서비스 접속 에러');
        }

        const data = response.data.response.body.items.item[0];
        setData(data);

      } catch (err) {
        // TODO:: 에러 처리
        console.log(err);
        // alert('현재 서비스 이용이 불가능 합니다. \n잠시 후 다시 시도해주세요.');
        alert('국가정보자원관리원 화재로 Open API 서비스가 일시 중지되었습니다.');
        // navigate(`/search?contentTypeId=${contentTypeId}`, {replace: true});
      }
    }

    getDetailPage();
  }, [contentId, contentTypeId]);

  return (
    <div className={cx('inner')}>
      <button
        type="button"
        className={cx('btn-back')}
        onClick={() => {navigate(-1)}}
      >
        <img
          src={commonImages.icon_back}
          alt="뒤로가기 아이콘"
        />
      </button>
      {data ?
        <>
          <div className={cx('upper-box')}>
            <p className={cx('address')}>{data.addr1}</p>
            <p className={cx('title')}>{data.title}</p>
            <Button
              type={"button"}
              shape={["like", isLike && "isLike"] as string[]}
              onClick={onClickLike}
            >
              <img src={commonImages.icon_like} alt="하트 아이콘 흑백" className={cx('base', '--full')}/>
              <img src={commonImages.icon_like} alt="하트 아이콘" className={cx(['animation', '--full', contentTypeId === "32" && "hotel"])}/>
            </Button>
          </div>
          <div className={cx('img-box')}>
            <img src={data.firstimage || commonImages.image_error} className={cx('--full')} alt={`${data.title} 이미지`}/>
          </div>
          <div className={cx('cont-box')}>
            <p className={cx('description')}>{data.overview}</p>
          </div>
        </>
        :
        <Skeleton header={true}/>
      }
      <Toast message={message} isOpen={isOpen} onClose={closeToast} />
    </div>
  )
}

export default Detail;