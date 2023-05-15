import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    postId: 0,
    type: null
}

const modalSlice = createSlice({
    name: 'modal',
    initialState: initialState,
    reducers: {
        open: {
            reducer: (state, action) => {
                state.postId = action.payload.postId
                state.type = action.payload.type
            },
            prepare: (id, type) => {
                return {
                    payload: {
                        postId: id,
                        type: type,
                    }
                }
            }
        },
        close: (state) => {
            state.postId = initialState.postId
            state.type = initialState.type
        },
    }
})

export const { open, close } = modalSlice.actions

export default modalSlice.reducer