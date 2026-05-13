import { Note } from '@/types/note';
import { nextServer } from './api';
import { User } from '@/types/user';

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

// create note
export interface NewNote {
  title: string;
  content: string;
  tag: string;
}

export const createNote = async (newNote: NewNote) => {
  const response = await nextServer.post<Note>('notes', newNote, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return response.data;
};

// delete note
export const deleteNote = async (noteId: string) => {
  const response = await nextServer.delete<Note>(`/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return response.data;
};

// register
export type RegisterRequest = {
  email: string;
  password: string;
  userName: string;
};

export const register = async (data: RegisterRequest) => {
  const response = await nextServer.post<User>('/auth/register', data);

  return response.data;
};

// login
export const login = async () => {};

// logout
export const logout = async () => {};

// check session
export const checkSession = async () => {};

// get me
export const getMe = async () => {};

// update me
export const updateMe = async () => {};
