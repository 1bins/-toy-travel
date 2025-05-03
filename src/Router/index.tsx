import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "@/components/layout";
import Home from "@/pages/home";
import Search from "@/pages/search";

const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home />} />
                    <Route path={"/search"} element={<Search />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;