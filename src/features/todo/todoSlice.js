import {createSlice} from '@reduxjs/toolkit';

export const todoSlice = createSlice({
    name: 'todo',
    initialState: {
      list: [],
    },
    reducers: {
      addNew: (state, action) => {
        // console.log(state.list)
        // debugger
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        state.list.push(action.payload);
      },
      deleteTodo: (state, action) => {

        state.list.splice(action.payload, 1)
      },
      updateTodo :(state, action)=>{
          let {index,data} = action.payload
        state.list[index] = data
      },

    },
  });

export const { addNew, deleteTodo, updateTodo} = todoSlice.actions;

export const selectTodoList = state => state.todo.list;


export default todoSlice.reducer;


