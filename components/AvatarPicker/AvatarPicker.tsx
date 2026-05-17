'use client';

import { useState } from 'react';
import Image from 'next/image';
import css from './AvatarPicker.module.css';

type Props = {
  profilePhotoUrl?: string;
};

export default function AvatarPicker({ profilePhotoUrl }: Props) {
  const [localPreview, setLocalPreview] = useState<string>('');
  const [error, setError] = useState<string>('');

  const previewUrl = localPreview || profilePhotoUrl || '';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    setError('');

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Only images');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Max file size 5MB');
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setLocalPreview(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    setLocalPreview('');
  };

  return (
    <div>
      <div className={css.picker}>
        {previewUrl && (
          <Image
            src={previewUrl}
            alt="Preview"
            width={300}
            height={300}
            className={css.avatar}
          />
        )}

        <label
          className={previewUrl ? `${css.wrapper} ${css.reload}` : css.wrapper}
        >
          📷 Choose photo
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className={css.input}
          />
        </label>

        {previewUrl && (
          <button type="button" className={css.remove} onClick={handleRemove}>
            ❌
          </button>
        )}
      </div>

      {error && <p className={css.error}>{error}</p>}
    </div>
  );
}
