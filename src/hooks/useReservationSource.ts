import { useEffect } from "react"
import { ReservationDto } from "../dtos/Reservation"
import { useAppDispatch, useSelector } from "../store";
import { addDocumentsToCart, addToCart, removeFromCart, updateCart } from "../store/slices/Reservation";
import { get, post, put } from "../utils/ApiUtils";
import { ServerResponseDto } from "../dtos/ServerResponseDto";
var _get = require('lodash.get');


export const useReservationSource  = ()=>{
    
    const localReservations  = useSelector<ReservationDto[]>((state)=>state.cart.reservations)
    const dispatch = useAppDispatch()

    const init = ()=>{
        initData()
        
    }


    const initData = async ()=>{
        let res : ServerResponseDto = await get('http://ec2-3-82-108-46.compute-1.amazonaws.com:8080/', {
            
          })
        if(res.httpStatusCode === 200){
            let newReservation= res.result;
            dispatch(addDocumentsToCart(newReservation))
        }
    }
    const addData = async (reservation : ReservationDto)=>{
        let id = Date.now().toString()
        reservation.id = id;
        let res : ServerResponseDto = await post('http://ec2-3-82-108-46.compute-1.amazonaws.com:8080/', {
            "Content-Type": "application/json"
          }, reservation)
        if(res.httpStatusCode === 200){
            let newReservation= res.result;
            dispatch(addToCart(newReservation))
        }else{
            throw Error("Failed in add reservation")
        }
        
    }

    const removeReservation = (reservation : ReservationDto)=>{
        dispatch(removeFromCart(reservation))
    }


    const searchByKey = (key : string, value : string)=>{
        const searchResults : ReservationDto[] = []
        localReservations.forEach((reservation)=>{
            const result : string = _get(reservation, key)
            if(result.toLocaleLowerCase().includes(value.toLocaleLowerCase())){
                searchResults.push(reservation)
            }
        })
        console.log(searchResults)
        return searchResults;
    }

    const updateReservation = async (reservation : ReservationDto)=>{
        let res : ServerResponseDto = await put('http://ec2-3-82-108-46.compute-1.amazonaws.com:8080/', {
            "Content-Type": "application/json"
          }, reservation)
        if(res.httpStatusCode === 200){
            let newReservation= res.result;
            dispatch(updateCart(newReservation))
        }
    }

    useEffect(()=>{
        init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return {
        addData : addData,
        removeReservation : removeReservation,
        updateReservation : updateReservation,
        reservations : localReservations,
        searchByKey : searchByKey
    }

}