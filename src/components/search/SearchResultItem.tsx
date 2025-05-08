import style from './SearchResultItem.module.scss';
import classNames from "classnames/bind";
import {Place} from "@/components/types.ts";
import IMAGES from "@/lib/images.ts";
import Button from "@/components/button";
import { useNavigate } from "react-router-dom";
import {useToggleLike} from "@/hooks/useToggleLike.ts";

const cx = classNames.bind(style);
const {commonImages} = IMAGES;

interface Props extends Place {
  onLike: (msg: string) => void;
}

const SearchResultItem = (
  {
    title,
    firstimage: image,
    addr1: address,
    contentid,
    contenttypeid,
    onLike
  }: Props) => {
  // ** hooks
  const navigate = useNavigate();

  // ** variables
  const { toggleLike, isLiked } = useToggleLike();
  const onClickLike = (e: React.MouseEvent) => {
    e.stopPropagation();

    toggleLike({
      data: {title, addr1: address, firstimage: image, contentid, contenttypeid},
      showToast: onLike
    });
  }
  const isLike = isLiked(contentid, contenttypeid);

  const onChangePage = (contentid: string, contenttypeid: string) => {
    navigate(`/detail/${contentid}/${contenttypeid}`);
  }

  return (
    <div
      className={cx('inner')}
      onClick={() => onChangePage(contentid, contenttypeid)}
    >
      <div className={cx('img-box')}>
          <img src={image || commonImages.image_error} className={cx('--full')} alt={`${title} 이미지`}/>
      </div>
      <div className={cx('cont-box')}>
        <p className={cx('title')}>{title}</p>
        <p className={cx('address')}>{address}</p>
        <Button
          type={"button"}
          shape={["like", isLike && "isLike"] as string[]}
          onClick={onClickLike}
        >
          <img src={commonImages.icon_like} alt="하트 아이콘 흑백" className={cx('base', '--full')}/>
          <img src={commonImages.icon_like} alt="하트 아이콘" className={cx(['animation', '--full', contenttypeid === "32" && "hotel"])}/>
        </Button>
      </div>
    </div>
  )
}

export default SearchResultItem;