import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "@/components/layout";
import Home from "@/pages/home";
import Search from "@/pages/search";
import SearchResult from "@/pages/search/SearchResult.tsx";

const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home />} />
                    <Route path={"/search"} element={<Search />} />
                    <Route path={"/result"} element={<SearchResult />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;