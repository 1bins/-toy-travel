import style from './SearchList.module.scss';
import classNames from "classnames/bind";
import Button from "@/components/button";

const cx = classNames.bind(style);

interface Props<T> {
  list: T[];
  contentTypeId: string | null;
  selectedCode: number;
  getCode: (item: T) => number;
  getName: (item: T) => string;
  onClick: (code: number) => void;
  className?: string;
}

const SearchList = <T,>(
  {
    list,
    contentTypeId,
    selectedCode,
    getCode,
    getName,
    onClick,
    className
  }: Props<T>) => {
  return(
    <div className={cx('list', className)}>
      {list.map((item) => {
        const code = getCode(item);
        const name = getName(item);

        return (
          <Button
            key={code}
            type={"button"}
            shape={["location", selectedCode === code && "selected", contentTypeId === "32" ? "hotel" : ""] as string[]}
            onClick={() => onClick(code)}
          >{name}</Button>
        )
      })}
    </div>
  )
}

export default SearchList;