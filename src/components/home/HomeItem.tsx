import style from './HomeItem.module.scss';
import classNames from 'classnames/bind';
import {Place} from "@/components/types.ts";
import IMAGES from "@/lib/images.ts";
import {useNavigate} from "react-router-dom";

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
        {firstimage ?
          <img src={firstimage} alt={`${title} 이미지`} className={cx('--full')}/>
          :
          <img src={commonImages.image_error} className={cx('--full')} alt={"오류 이미지"}/>}
      </div>
      <div className={cx('cont-box')}>
        <p className={cx('title')}>{title}</p>
        <p className={cx('address')}>{addr1}</p>
      </div>
    </article>
  )
}

export default HomeItem;