import { get } from "../utils/ApiUtils"

export const getProducts = async ()=>{
    let res = await get('https://fakestoreapi.com/products',{});
    return res
}