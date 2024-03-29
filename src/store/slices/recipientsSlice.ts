// external dependencies
import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from '@reduxjs/toolkit';

// internal dependencies
import {RootState} from 'store';
import {fetchDataArrById, DataTypes, CollectionNames} from 'services/fireStore';
import {Asset} from 'utils/types';

export interface Recipient {
  id: string;
  caregiverId: string;
  firstName: string;
  lastName: string;
  photo: Asset;
  birthday: string | undefined;
  exitCode: string;
  location: string;
}

export interface RecipientUpdate {
  firstName?: string;
  lastName?: string;
  avatar?: string;
  photo?: Asset;
  birthday?: string | undefined;
  location?: string;
  exitCode?: string;
}

export interface RecipientPhotoUpdate {
  photo: Asset;
}

export interface RecipientBasicInfoUpdate {
  firstName: string;
  lastName: string;
  birthday: string | undefined;
}

// async fetch thunk
export const fetchRecipients = createAsyncThunk(
  'recipients/fetchRecipients',
  async (caregiverId: string) => {
    try {
      const recipients = await fetchDataArrById(
        caregiverId,
        CollectionNames.Recipients,
        DataTypes.caregiver,
      );
      return recipients as unknown as Recipient[];
    } catch (error) {
      console.log('Error fetching recipient data: ', error);
      return [];
    }
  },
);

const recipientsAdapter = createEntityAdapter<Recipient>({
  sortComparer: (a, b) => a.firstName.localeCompare(b.firstName),
});

const recipientsSlice = createSlice({
  name: 'recipients',
  initialState: recipientsAdapter.getInitialState({
    status: 'idle',
  }),
  reducers: {
    recipientAdded: recipientsAdapter.addOne,
    recipientUpdated: recipientsAdapter.updateOne,
    recipientRemoved: recipientsAdapter.removeOne,
    allRecipientsRemoved: recipientsAdapter.removeAll,
    manyRecipientsRemoved: recipientsAdapter.removeMany,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchRecipients.pending, (state, _) => {
        state.status = 'loading';
      })
      .addCase(fetchRecipients.fulfilled, (state, action) => {
        recipientsAdapter.setAll(state, action.payload);
        state.status = 'loaded';
      });
  },
});

export const {
  recipientAdded,
  recipientUpdated,
  recipientRemoved,
  allRecipientsRemoved,
  manyRecipientsRemoved,
} = recipientsSlice.actions;

export const {
  selectAll: selectRecipients,
  selectById: selectRecipientById,
  selectIds: selectRecipientIds,
} = recipientsAdapter.getSelectors((state: RootState) => state.recipients);

export default recipientsSlice.reducer;
