import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Application, Stage } from "@/types";
import type { RootState } from "../index";
import { authHeader } from "@/lib/utils";

// State shape for the board slice
interface BoardState {
  applications: Application[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: BoardState = {
  applications: [],
  status: "idle",
  error: null,
};

// Async thunks (these hit the API routes)
// Fetch all applications on board load
export const fetchApplications = createAsyncThunk(
  "board/fetchApplications",
  async (uid: string, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/applications", {
        headers: await authHeader(),
      });
      if (!res.ok) throw new Error("Failed to fetch");
      return (await res.json()) as Application[];
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);

// Add a new application card
export const addApplication = createAsyncThunk(
  "board/addApplication",
  async (
    { company, role, stage }: { company: string; role: string; stage: Stage },
    { rejectWithValue },
  ) => {
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: await authHeader(),
        body: JSON.stringify({ company, role, stage }),
      });
      if (!res.ok) throw new Error("Failed to create");
      return (await res.json()) as Application;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);

// Update a card (stage change on drag, or field edit in modal)
export const updateApplication = createAsyncThunk(
  "board/updateApplication",
  async (
    { id, updates }: { id: string; updates: Partial<Application> },
    { rejectWithValue },
  ) => {
    try {
      const res = await fetch(`/api/applications/${id}`, {
        method: "PATCH",
        headers: await authHeader(),
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error("Failed to update");
      return (await res.json()) as Application;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);

// Delete a card
export const deleteApplication = createAsyncThunk(
  "board/deleteApplication",
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/applications/${id}`, {
        method: "DELETE",
        headers: await authHeader(),
      });
      if (!res.ok) throw new Error("Failed to delete");
      return id; // return the id so we can remove it from state
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);

// Slice — this is where we define reducers and handle actions (including the async thunks)
const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    // Optimistic update for drag-and-drop — updates state instantly
    // before the PATCH even completes, so the UI feels immediate
    moveApplication(
      state,
      action: PayloadAction<{ id: string; stage: Stage; order: number }>,
    ) {
      const { id, stage, order } = action.payload;
      const app = state.applications.find((a) => a._id === id);
      if (app) {
        app.stage = stage;
        app.order = order;
      }
    },
    resetBoard(state) {
      state.applications = [];
      state.status = "idle";
      state.error = null;
    },

    // Socket-driven updates — these only mutate local Redux state,
    // no API call, because the DB write already happened on another client
    remoteAddApplication(state, action: PayloadAction<Application>) {
      const incomingApp = action.payload;
      // DEDUPLICATION CHECK
      const existingIndex = state.applications.findIndex(
        (a) => a._id === incomingApp._id,
      );

      if (existingIndex !== -1) {
        // If the card is already here, just update it
        state.applications[existingIndex] = incomingApp;
      } else {
        // If it's truly new, push it
        state.applications.push(incomingApp);
      }
    },

    remoteUpdateApplication(state, action: PayloadAction<Application>) {
      const index = state.applications.findIndex(
        (a) => a._id === action.payload._id,
      );
      if (index !== -1) state.applications[index] = action.payload;
    },

    remoteDeleteApplication(state, action: PayloadAction<string>) {
      state.applications = state.applications.filter(
        (a) => a._id !== action.payload,
      );
    },
  },
  extraReducers: (builder) => {
    // fetchApplications
    builder
      .addCase(fetchApplications.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchApplications.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.applications = action.payload;
      })
      .addCase(fetchApplications.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });

    // addApplication
    builder.addCase(addApplication.fulfilled, (state, action) => {
      const incomingApp = action.payload;
      // DEDUPLICATION CHECK
      const existingIndex = state.applications.findIndex(
        (a) => a._id === incomingApp._id,
      );

      if (existingIndex !== -1) {
        state.applications[existingIndex] = incomingApp;
      } else {
        state.applications.push(incomingApp);
      }
    });

    // updateApplication
    builder.addCase(updateApplication.fulfilled, (state, action) => {
      const index = state.applications.findIndex(
        (a) => a._id === action.payload._id,
      );
      if (index !== -1) state.applications[index] = action.payload;
    });

    // deleteApplication
    builder.addCase(deleteApplication.fulfilled, (state, action) => {
      state.applications = state.applications.filter(
        (a) => a._id !== action.payload,
      );
    });
  },
});

export const {
  moveApplication,
  resetBoard,
  remoteAddApplication,
  remoteUpdateApplication,
  remoteDeleteApplication,
} = boardSlice.actions;

export default boardSlice.reducer;

// Selectors — these are used in React components to read data from the store

// Get all apps for a specific column
export const selectByStage = (stage: Stage) => (state: RootState) =>
  state.board.applications
    .filter((a) => a.stage === stage)
    .sort((a, b) => a.order - b.order);

// Get a single app by id (for the detail modal)
export const selectById = (id: string) => (state: RootState) =>
  state.board.applications.find((a) => a._id === id);

export const selectBoardStatus = (state: RootState) => state.board.status;
export const selectBoardError = (state: RootState) => state.board.error;

// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import { Application, Stage } from "@/types";

// // State shape for the board slice
// interface BoardState {
//   applications: Application[];
//   status: "idle" | "loading" | "succeeded" | "failed";
//   error: string | null;
// }

// const initialState: BoardState = {
//   applications: [],
//   status: "idle",
//   error: null,
// };

// // Helper — builds the header every API call needs
// // function authHeader(uid: string) {
// //   return {
// //     "Content-Type": "application/json",
// //     "x-user-uid": uid,
// //   };
// // }
// async function authHeader() {
//   const token = await auth.currentUser?.getIdToken();
//   return {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${token}`,
//   };
// }

// // Async thunks (these hit the API routes)
// // Fetch all applications on board load
// export const fetchApplications = createAsyncThunk(
//   "board/fetchApplications",
//   async (uid: String, { rejectWithValue }) => {
//     try {
//       const res = await fetch("/api/applications", {
//         headers: await authHeader(),
//       });
//       if (!res.ok) throw new Error("Failed to fetch");
//       return (await res.json()) as Application[];
//     } catch (err: any) {
//       return rejectWithValue(err.message);
//     }
//   },
// );

// // Add a new application card
// export const addApplication = createAsyncThunk(
//   "board/addApplication",
//   async (
//     { company, role, stage }: { company: string; role: string; stage: Stage },
//     { rejectWithValue },
//   ) => {
//     try {
//       const res = await fetch("/api/applications", {
//         method: "POST",
//         headers: await authHeader(),
//         body: JSON.stringify({ company, role, stage }),
//       });
//       if (!res.ok) throw new Error("Failed to create");
//       return (await res.json()) as Application;
//     } catch (err: any) {
//       return rejectWithValue(err.message);
//     }
//   },
// );

// // Update a card (stage change on drag, or field edit in modal)
// export const updateApplication = createAsyncThunk(
//   "board/updateApplication",
//   async (
//     { id, updates }: { id: string; updates: Partial<Application> },
//     { rejectWithValue },
//   ) => {
//     try {
//       const res = await fetch(`/api/applications/${id}`, {
//         method: "PATCH",
//         headers: await authHeader(),
//         body: JSON.stringify(updates),
//       });
//       if (!res.ok) throw new Error("Failed to update");
//       return (await res.json()) as Application;
//     } catch (err: any) {
//       return rejectWithValue(err.message);
//     }
//   },
// );

// // Delete a card
// export const deleteApplication = createAsyncThunk(
//   "board/deleteApplication",
//   async ({ id }: { id: string }, { rejectWithValue }) => {
//     try {
//       const res = await fetch(`/api/applications/${id}`, {
//         method: "DELETE",
//         headers: await authHeader(),
//       });
//       if (!res.ok) throw new Error("Failed to delete");
//       return id; // return the id so we can remove it from state
//     } catch (err: any) {
//       return rejectWithValue(err.message);
//     }
//   },
// );

// // Slice — this is where we define reducers and handle actions (including the async thunks)
// const boardSlice = createSlice({
//   name: "board",
//   initialState,
//   reducers: {
//     // Optimistic update for drag-and-drop — updates state instantly
//     // before the PATCH even completes, so the UI feels immediate
//     moveApplication(
//       state,
//       action: PayloadAction<{ id: string; stage: Stage; order: number }>,
//     ) {
//       const { id, stage, order } = action.payload;
//       const app = state.applications.find((a) => a._id === id);
//       if (app) {
//         app.stage = stage;
//         app.order = order;
//       }
//     },
//     resetBoard(state) {
//       state.applications = [];
//       state.status = "idle";
//       state.error = null;
//     },
//     // Socket-driven updates — these only mutate local Redux state,
//     // no API call, because the DB write already happened on another client
//     remoteAddApplication(state, action: PayloadAction<Application>) {
//       state.applications.push(action.payload);
//     },

//     remoteUpdateApplication(state, action: PayloadAction<Application>) {
//       const index = state.applications.findIndex(
//         (a) => a._id === action.payload._id,
//       );
//       if (index !== -1) state.applications[index] = action.payload;
//     },

//     remoteDeleteApplication(state, action: PayloadAction<string>) {
//       state.applications = state.applications.filter(
//         (a) => a._id !== action.payload,
//       );
//     },
//   },
//   extraReducers: (builder) => {
//     // fetchApplications
//     builder
//       .addCase(fetchApplications.pending, (state) => {
//         state.status = "loading";
//         state.error = null;
//       })
//       .addCase(fetchApplications.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.applications = action.payload;
//       })
//       .addCase(fetchApplications.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload as string;
//       });

//     // addApplication
//     builder.addCase(addApplication.fulfilled, (state, action) => {
//       state.applications.push(action.payload);
//     });

//     // updateApplication
//     builder.addCase(updateApplication.fulfilled, (state, action) => {
//       const index = state.applications.findIndex(
//         (a) => a._id === action.payload._id,
//       );
//       if (index !== -1) state.applications[index] = action.payload;
//     });

//     // deleteApplication
//     builder.addCase(deleteApplication.fulfilled, (state, action) => {
//       state.applications = state.applications.filter(
//         (a) => a._id !== action.payload,
//       );
//     });
//   },
// });

// export const {
//   moveApplication,
//   resetBoard,
//   remoteAddApplication,
//   remoteUpdateApplication,
//   remoteDeleteApplication,
// } = boardSlice.actions;
// export default boardSlice.reducer;

// // Selectors — these are used in React components to read data from the store

// import type { RootState } from "../index";

// import { auth } from "@/lib/firebase";
// // Get all apps for a specific column
// export const selectByStage = (stage: Stage) => (state: RootState) =>
//   state.board.applications
//     .filter((a) => a.stage === stage)
//     .sort((a, b) => a.order - b.order);

// // Get a single app by id (for the detail modal)
// export const selectById = (id: string) => (state: RootState) =>
//   state.board.applications.find((a) => a._id === id);

// export const selectBoardStatus = (state: RootState) => state.board.status;
// export const selectBoardError = (state: RootState) => state.board.error;
