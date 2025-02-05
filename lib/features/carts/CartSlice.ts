import {createAppSlice} from "@/lib/createAppSlice";
import {PayloadAction} from "@reduxjs/toolkit";

export interface Item {
    count: 0,
    data: ""
}

export interface CartSliceState {
    items: []
}

const initialState: CartSliceState = {
    items: []
};

export const cartSlice = createAppSlice({
    name: "cart",
    initialState,
    reducers: (create) => ({
        addToCart: create.reducer(
            (state, action: PayloadAction<number>) => {
                let obj: Item = {
                    count: 1,
                    data: action.payload
                };
                const Index = state.items.findIndex(item => item.data == obj.data);
                if (Index != -1) {
                    state.items[Index].count += 1;
                } else {
                    state.items.push(obj);
                }


            },
        ),
        removeFromCart: create.reducer(
            (state, action: PayloadAction<number>) => {
                //creat obj and count here
                // state.items = state.items.filter(item => item !== action.payload);
                let obj: Item = {
                    count: 1,
                    data: action.payload
                };
                const Index = state.items.findIndex(item => item.data == obj.data);
                if (Index != -1) {
                    state.items[Index].count -= 1;
                    if (state.items[Index].count == 0) {
                        state.items.splice(Index, 1);
                    }
                } else {
                    state.items.splice(Index, 1);
                }

            },
        ),
        clearCart:create.reducer(
            (state) =>{
                state.items = [];
            }
        )
    }),
    selectors: {
        selectItem: (cart) => cart.items,
    }
});

export const {addToCart, removeFromCart,clearCart} = cartSlice.actions;
export const {selectCount, selectItem} = cartSlice.selectors;