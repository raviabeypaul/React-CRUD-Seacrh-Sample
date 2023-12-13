import { Route, Routes } from "react-router-dom"
import MasterPage from './../pages/master';
import { Search } from "../pages/search";


export const RouteHandler = ()=>{
    return (<>
    <Routes>
        <Route path={"/React-CRUD-Seacrh-Sample"} element={<MasterPage/>} key={"root"} />
        <Route path={"/"} element={<MasterPage/>} key={"root"} />
        <Route path={"/search"} element={<Search/>} key={"root"} />
    </Routes>
    </>)

}