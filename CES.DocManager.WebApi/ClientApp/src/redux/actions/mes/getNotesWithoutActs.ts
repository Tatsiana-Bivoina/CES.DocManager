import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchTodosError } from '../../../types/type';
import $api from '../../../http/loginHttp';
import { IFullNoteData, NotesWithoutActsReq } from '../../../types/MesTypes';

const getNotesWithoutActs = createAsyncThunk<IFullNoteData[],
NotesWithoutActsReq, { rejectValue: FetchTodosError }>(
  'getNotesWithoutActs',
  async (params, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_GET_NOTES_WITHOUT_ACTS === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const response = await $api.get<IFullNoteData[]>(
        `${process.env.REACT_APP_GET_NOTES_WITHOUT_ACTS}?min=${params.minDate}&max=${params.maxDate}
          &filter=${JSON.stringify(params.filter)}&searchValue=${params.searchValue}&page=${params.page}&limit=${params.limit}`,
      );
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: 'Нет данных по запросу',
      });
    }
  },
);

export default getNotesWithoutActs;
