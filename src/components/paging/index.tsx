import Button from '@/components/button/index.tsx';
import style from './paging.module.scss';
import classNames from "classnames/bind";
import IMAGES from "@/lib/images.ts";

const cx = classNames.bind(style);
const {commonImages} = IMAGES;

interface Props {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
  groupSize: number;
}

const Paging = (
  {
    currentPage,
    totalPage,
    onPageChange,
    groupSize
  }: Props) => {
  // ** variables
  const currentGroup = Math.floor((currentPage - 1) / groupSize);
  const startPage = currentGroup * groupSize + 1;
  const endPage = Math.min(startPage + groupSize - 1, totalPage);

  const handlePageChange = (page: number) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const handlePrevGroup = () => {
    const prevGroupStart = Math.max(startPage - groupSize, 1);
    handlePageChange(prevGroupStart);
  }

  const handleNextGroup = () => {
    const nextGroupStart = startPage + groupSize;
    if (nextGroupStart <= totalPage) {
      handlePageChange(nextGroupStart);
    }
  }


  return (
    <div className={cx('inner')}>
      {startPage > 1 &&
        <Button type={"button"}
                onClick={handlePrevGroup}
                shape={["btn-paging", "btn-paging-prev"]}
        ><img src={commonImages.icon_paging_arrow} alt="이전 화살표 이미지"/>이전</Button>}

      {Array.from({ length: endPage - startPage + 1 }).map((_, i) => {
        const pageNum = startPage + i;
        return (
          <Button
            key={pageNum}
            type={"button"}
            onClick={() => handlePageChange(pageNum)}
            shape={["btn-paging", pageNum === currentPage ? "active" : ""]}
          >
            {pageNum}
          </Button>
        );
      })}

      {endPage < totalPage &&
        <Button type={"button"}
                onClick={handleNextGroup}
                shape={["btn-paging", "btn-paging-next"]}
        >
          다음<img src={commonImages.icon_paging_arrow} alt="다음 화살표 이미지"/></Button>}
    </div>
  )
}

export default Paging;