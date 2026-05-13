import { Note } from '@/types/note';
import { nextServer } from './api';

const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

// fetch notes
interface NoteListResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  search: string,
  tag: string | undefined,
  page: number
): Promise<NoteListResponse> => {
  const response = await nextServer.get<NoteListResponse>('/notes', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
    params: {
      search,
      tag,
      page,
      perPage: 12,
    },
  });

  return response.data;
};

// fetch note by id
export const fetchNoteById = async (id: string) => {
  const response = await nextServer.get<Note>(`/notes/${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return response.data;
};

// get me
export const getMe = async () => {};

// check session
export const checkSession = async () => {};
