// external dependencies
import {configureStore} from '@reduxjs/toolkit';

// internal dependencies
import caregiversSlice from './slices/caregiversSlice';
import recipientsSlice from './slices/recipientsSlice';
import setsSlice from './slices/setsSlice';
import collectionsSlice from './slices/collectionsSlice';
import emergencyContactsSlice from './slices/emergencyContactsSlice';

const store = configureStore({
  reducer: {
    caregivers: caregiversSlice,
    recipients: recipientsSlice,
    sets: setsSlice,
    collections: collectionsSlice,
    emergencyContacts: emergencyContactsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
