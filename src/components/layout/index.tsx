import style from "./layout.module.scss";
import classNames from "classnames/bind";
import {Outlet} from "react-router-dom";

const cx = classNames.bind(style);

const Layout = () => {
    return(
        <main>
        <div className={cx('main')}>
            메인페이지
            <Outlet/>
        </div>
        </main>
    )
}

export default Layout;