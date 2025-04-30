import style from "./layout.module.scss";
import classNames from "classnames/bind";
import {Outlet} from "react-router-dom";
import Header from "@/components/header";

const cx = classNames.bind(style);

const Layout = () => {
    return(
        <main>
        <div className={cx('main')}>
            <Header/>
            <Outlet/>
        </div>
        </main>
    )
}

export default Layout;