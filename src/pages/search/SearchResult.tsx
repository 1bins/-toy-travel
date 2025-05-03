import style from './SearchResult.module.scss';
import classNames from "classnames/bind";
import {useLocation} from "react-router-dom";
import {useEffect} from "react";

const cx = classNames.bind(style);

const SearchResult = () => {
  // ** hooks
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  // ** variables
  const areaCode = query.get("areaCode");
  const sigunguCode = query.get("sigunguCode");

  useEffect(() => {
    
  }, [areaCode, sigunguCode]);

  return (
    <div className={cx('inner')}>결과페이지</div>
  )
}

export default SearchResult;