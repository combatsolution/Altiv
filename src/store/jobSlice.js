import { createSlice } from '@reduxjs/toolkit';

const jobSlice = createSlice({
   name: 'job', // ✅ FIXED
  initialState: {
    dateFilter: '',
    jobCategories: [],
    levelFilter: '',
    locationFilter: '',
    companyStage: '',
    classification: '',
  },
  
  reducers: {
    setDateFilter: (state, action) => {
      console.log('Setting date filter:', action.payload);
      state.dateFilter = action.payload;
    },
     toggleCategory: (state, action) => {
      const value = action.payload;
      if (state.jobCategories.includes(value)) {
        state.jobCategories = state.jobCategories.filter((v) => v !== value);
      } else {
        state.jobCategories.push(value);
      }
    },
    setLevelFilter: (state, action) => {
      state.levelFilter = action.payload;
    },
    setLocationFilter: (state, action) => {
      state.locationFilter = action.payload;
    },
    setCompanyStage: (state, action) => {
      state.companyStage = action.payload;
    },
    setClassification: (state, action) => {
      state.classification = action.payload;
    },
    // ... rest of reducers
  },
});
export const {
  setDateFilter,
  toggleCategory,
  setLevelFilter,
  setLocationFilter,
  setCompanyStage,
  setClassification,
} = jobSlice.actions;
export default jobSlice.reducer;