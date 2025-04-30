import {ButtonProps} from "@/components/types.ts";
import style from "./button.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

const Button = ({
    id,
    type,
    shape,
    disabled,
    onClick,
    children
}: ButtonProps) => {
    return(
        <button
            id={id}
            type={type}
            className={cx('button', shape)}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button;