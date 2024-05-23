import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://664e80e6fafad45dfae03b5d.mockapi.io";


// export const fetchTasks = createAsyncThunk(
//     "contacts/fetchAll",
//     // Folosim caracterul "underscore" ca nume al primului parametru
//     // deoarece nu avem nevoie de el în această operație
//     async (_, thunkAPI) => {
//       try {
//         const response = await axios.get("/contacts");
//         // În cazul unei cereri cu succes, vom returna un promise cu date
//         return response.data;
//       } catch (e) {
//         // Dacă cererea eșuează, returnăm un promise care va fi respins 
//         // și va conține textul erorii
//         return thunkAPI.rejectWithValue(e.message);
//       }
//     }
//   );

export const fetchContacts = createAsyncThunk(
    "contacts/fetchAll",
    async(_, thunckAPI) => {
        try{
            const response = await axios.get("/contacts");
            return response.data

        }catch(err){
            return thunckAPI.rejectWithValue(err.message);

        }
    }
);

export const addContacts = createAsyncThunk(
    "contacts/addContacts",
    async ({ name, number }, thunkAPI) => {
      try {
        const response = await axios.post("/contacts", { name, number });
        return response.data;
      } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
      }
    }
  );

export const deleteContacts = createAsyncThunk(
    "contacts/deleteContacts",
    async(itemId, thunckAPI) => {
        try{
            const response = await axios.delete(`/contacts/${itemId}`);
            return response.data;
        }catch(err){
            return thunckAPI.rejectWithValue(err.message);
        }
    }
)