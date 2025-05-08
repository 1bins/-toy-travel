import {useState} from "react";
import {useNavigate} from "react-router-dom";
import style from './HomeItem.module.scss';
import classNames from 'classnames/bind';
import {Place} from "@/components/types.ts";
import IMAGES from "@/lib/images.ts";
import Skeleton from "@/components/skeleton";

const cx = classNames.bind(style);
const {commonImages} = IMAGES;

const HomeItem = (
  { title,
    firstimage,
    addr1,
    contentid,
    contenttypeid
  }: Place) => {
  // ** hooks
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // ** variables
  const onChangePage = (contentid: string, contenttypeid: string) => {
    navigate(`/detail/${contentid}/${contenttypeid}`);
  }

  return(
    <article
      className={cx('item')}
      onClick={() => onChangePage(contentid, contenttypeid)}
    >
      <div className={cx('img-box')}>
        {isLoading && <Skeleton content={false} />}
        <img
          src={firstimage || commonImages.image_error}
          alt={`${title} 이미지`}
          className={cx('--full')}
          onLoad={() => setIsLoading(false)}
        />
      </div>
      <div className={cx('cont-box')}>
        <p className={cx('title')}>{title}</p>
        <p className={cx('address')}>{addr1}</p>
      </div>
    </article>
  )
}

export default HomeItem;