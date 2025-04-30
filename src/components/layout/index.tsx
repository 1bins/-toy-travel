import style from "./layout.module.scss";
import classNames from "classnames/bind";
import {Outlet} from "react-router-dom";

const cx = classNames.bind(style);

const Layout = () => {
    return(
        <main>
        <div className={cx('main')}>
            {/* TODO:: 헤더 들어갈 자리 */}
            <Outlet/>
        </div>
        </main>
    )
}

export default Layout;