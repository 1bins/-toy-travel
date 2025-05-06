import {useState} from "react";
import style from './SearchResultItem.module.scss';
import classNames from "classnames/bind";
import {Place} from "@/components/types.ts";
import IMAGES from "@/lib/images.ts";
import Button from "@/components/button";
import { useNavigate } from "react-router-dom";

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
  const [isLike, setIsLike] = useState<boolean>(false);

  // ** variables
  const addLike = () => {
    setIsLike(!isLike);
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
          onClick={(e) => {
            e.stopPropagation();
            addLike();
          }}
        >
          <img src={commonImages.icon_like} alt="하트 아이콘 흑백" className={cx('base', '--full')}/>
          <img src={commonImages.icon_like} alt="하트 아이콘" className={cx('animation', '--full')}/>
        </Button>
      </div>
    </div>
  )
}

export default SearchResultItem;