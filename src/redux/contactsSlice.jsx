import { createSlice } from "@reduxjs/toolkit";
import { addContacts, deleteContacts, fetchContacts } from "../redux/operations";

  const contactsInitialState = {
    contacts: [],
    isLoading: false,
    error: null,
  };
  
  const handlePending = (state) => {
    state.isLoading = true;
  };
  
  const handleRejected = (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  };
  
  const contactsSlice = createSlice({
    name: "contacts",
    initialState: contactsInitialState,
    extraReducers: (builder) => {
      builder
        .addCase(fetchContacts.pending, handlePending)
        .addCase(fetchContacts.fulfilled, (state, action) => {
          state.isLoading = false;
          state.error = null;
          state.contacts = action.payload;
        })
        .addCase(fetchContacts.rejected, handleRejected)
        .addCase(addContacts.pending, handlePending)
        .addCase(addContacts.fulfilled, (state, action) => {
          state.isLoading = false;
          state.error = null;
          state.contacts.push(action.payload);
        })
        .addCase(addContacts.rejected, handleRejected)
        .addCase(deleteContacts.pending, handlePending)
        .addCase(deleteContacts.fulfilled, (state, action) => {
          state.isLoading = false;
          state.error = null;
          const index = state.contacts.findIndex(
            (item) => item.id === action.payload.id
          );
          if (index > -1) {
            state.contacts.splice(index, 1);
          }
        })
        .addCase(deleteContacts.rejected, handleRejected);
    },
  });
  
   // const contactsSlice = createSlice({
  //   name: "contacts",
  //   initialState: contactsInitialState,
  //   reducers: {
  //     addContacts: {
  //       reducer(state, action) {
  //         state.contacts.push(action.payload);
  //       },
  //   },
  //     deleteContacts(state, action) {
  //       state.contacts = state.contacts.filter(item => item.id !== action.payload);
  //     },
  //   },
  // });
  
  export const contactsReducer = contactsSlice.reducer;