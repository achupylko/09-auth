import { Note } from '@/types/note';
import { nextServer } from './api';
import { cookies } from 'next/headers';
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

// get me
export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

// check server session
export const checkServerSession = async () => {
  // get current cookies
  const cookieStore = await cookies();

  const response = await nextServer.get('/auth/session', {
    headers: {
      // pass the cookie on
      Cookie: cookieStore.toString(),
    },
  });

  // return the full response so that the proxy has access to the new cookies
  return response;
};
