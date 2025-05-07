import style from './SearchResultItem.module.scss';
import classNames from "classnames/bind";
import {Place} from "@/components/types.ts";
import IMAGES from "@/lib/images.ts";
import Button from "@/components/button";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";
import {addPlace, removePlace} from "@/store/likedSlice.ts";

const cx = classNames.bind(style);
const {commonImages} = IMAGES;

const SearchResultItem = (
  {
    title,
    firstimage: image,
    addr1: address,
    contentid,
    contenttypeid
  }: Place) => {
  // ** hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ** variables
  const { likedPlaces, likedHotels } = useSelector((state: RootState) => state.liked);
  const isLike = contenttypeid === "12"
    ? likedPlaces.some((place: Place) => place.contentid === contentid)
    : likedHotels.some((place: Place) => place.contentid === contentid);
  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isLike) {
      dispatch(removePlace({contentid: contentid, contenttypeid: contenttypeid}));
    } else {
      dispatch(addPlace({title, firstimage: image, addr1: address, contentid, contenttypeid}));
    }
  }

  const onChangePage = (contentid: string, contenttypeid: string) => {
    navigate(`/detail/${contentid}/${contenttypeid}`);
  }

  return (
    <div
      className={cx('inner')}
      onClick={() => onChangePage(contentid, contenttypeid)}
    >
      <div className={cx('img-box')}>
        {image ?
          <img src={image} className={cx('--full')} alt={`${title} 이미지`}/> :
          <img src={commonImages.image_error} className={cx('--full')} alt={`${title} 이미지`}/>
        }
      </div>
      <div className={cx('cont-box')}>
        <p className={cx('title')}>{title}</p>
        <p className={cx('address')}>{address}</p>
        <Button
          type={"button"}
          shape={["like", isLike && "isLike"] as string[]}
          onClick={toggleLike}
        >
          <img src={commonImages.icon_like} alt="하트 아이콘 흑백" className={cx('base', '--full')}/>
          <img src={commonImages.icon_like} alt="하트 아이콘" className={cx(['animation', '--full', contenttypeid === "32" && "hotel"])}/>
        </Button>
      </div>
    </div>
  )
}

export default SearchResultItem;