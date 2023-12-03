export interface Product {
    id : string;
    title : string;
    description : string;
    price : string;
    category : string;
    image : string;
    count : number;
    rating : {
        rate : number;
        count : number;
    }
}