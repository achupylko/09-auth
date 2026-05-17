'use client';

import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import Loader from '@/components/Loader/Loader';
import Modal from '@/components/Modal/Modal';
import { fetchNoteById } from '@/lib/api/clientApi';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import css from './NotePreview.module.css';

export default function NotePreviewClient() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const {
    data: note,
    isSuccess,
    isFetching,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const onClose = () => {
    router.back();
  };

  return (
    <Modal onClose={onClose}>
      <div className={css.container}>
        {(isLoading || isFetching) && <Loader />}

        {isError && <ErrorMessage message={(error as Error).message} />}

        {isSuccess && note && (
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
            </div>
            <p className={css.tag}>{note.tag}</p>
            <p className={css.content}>{note.content}</p>
            <p className={css.date}>
              {note.updatedAt
                ? `Updated at: ${note.updatedAt}`
                : `Created at: ${note.createdAt}`}
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
}
