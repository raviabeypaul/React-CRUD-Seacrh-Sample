import { useEffect, useRef } from "react"
import { ReservationDto } from "../dtos/Reservation"
import * as JsSearch from 'js-search';
import { useAppDispatch, useSelector } from "../store";
import { addToCart, removeFromCart, updateCart } from "../store/slices/Reservation";
var get = require('lodash.get');


export const useReservationSource  = ()=>{
    const search =  useRef (new JsSearch.Search('id'));
    const localReservations = useSelector((state)=>state.cart.reservations)
    const dispatch = useAppDispatch()

    const init = ()=>{
        initIndex()
        search.current.addDocuments(localReservations)
    }


    const initIndex = ()=>{
        search.current.addIndex('roomSize')
        search.current.addIndex('email')
        search.current.addIndex('phone')
        search.current.addIndex('firstName')
        search.current.addIndex('lastName')
        search.current.addIndex(['addressLocation','zipCode'])
        search.current.addIndex(['addressLocation','state'])
        search.current.addIndex(['addressLocation','city'])
    }
    const addData = (reservation : ReservationDto)=>{
        let id = Date.now().toString()
        reservation.id = id;
        dispatch(addToCart(reservation))
        search.current.addDocument(reservation)
    }

    const removeReservation = (reservation : ReservationDto)=>{
        dispatch(removeFromCart(reservation))
    }

    const searchReservationByText = (text : string)=>{
        let results : any = search.current.search(text);
        return results
    }

    const searchByKey = (key : string, value : string)=>{
        const searchResults : ReservationDto[] = []
        localReservations.forEach((reservation)=>{
            const result : string = get(reservation, key)
            if(result.toLocaleLowerCase().includes(value.toLocaleLowerCase())){
                searchResults.push(reservation)
            }
        })
        console.log(searchResults)
        return searchResults;
    }

    const updateReservation = (reservation : ReservationDto)=>{
          dispatch(updateCart(reservation))
    }

    useEffect(()=>{
        init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return {
        addData : addData,
        removeReservation : removeReservation,
        searchReservationByText : searchReservationByText,
        updateReservation : updateReservation,
        reservations : localReservations,
        searchByKey : searchByKey
    }

}