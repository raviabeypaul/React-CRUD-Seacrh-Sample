import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { ReservationDto } from "../../dtos/Reservation"

import localReservation from './../../data/reservations.json';

interface ReservationsState {
    reservations: ReservationDto[]
}

const initialState = { reservations: localReservation } as ReservationsState
// Slice for Cart Management
const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // Add to Cart , update count if already present
        addToCart: (state, action: PayloadAction<ReservationDto>) => {
            state.reservations.push(action.payload)
        },
        // Remove From Cart , update count if already present
        removeFromCart: (state, action: PayloadAction<ReservationDto>) => {
            state.reservations = state.reservations.filter((value)=>value.id!==action.payload.id)  
        },
        updateCart : (state, action: PayloadAction<ReservationDto>)=>{
            state.reservations = state.reservations.map((value)=>{
                if(value.id ===  action.payload.id){
                    value = action.payload;
                }
                return value;
            })
        },
        // clears the cart
        clearCart: (state) => {
        }
    }
})

export const { addToCart, removeFromCart, updateCart } = CartSlice.actions;
export default CartSlice;