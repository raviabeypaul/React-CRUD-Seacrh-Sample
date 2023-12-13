import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { ReservationDto } from "../../dtos/Reservation"

interface ReservationsState {
    reservations: ReservationDto[]
}

const initialState = { reservations: [] } as ReservationsState
// Slice for Cart Management
const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // Add to Cart , update count if already present
        addToCart: (state, action: PayloadAction<ReservationDto>) => {
            state.reservations.push(action.payload)
        },
        addDocumentsToCart: (state, action: PayloadAction<ReservationDto[]>) => {
            state.reservations = [...action.payload]
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
    },
    extraReducers: (builder) => {
        builder.addCase('persist/REHYDRATE', (state, action) => {
            state.reservations = []
        },
        );
      },
})

export const { addToCart, removeFromCart, updateCart, addDocumentsToCart } = CartSlice.actions;
export default CartSlice;