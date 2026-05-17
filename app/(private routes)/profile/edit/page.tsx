'use client';

import { getMe, updateMe } from '@/lib/api/clientApi';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import css from './EditProfilePage.module.css';

type ProfileFormData = {
  username: string;
  email: string;
  avatar: string;
};

const initialState: ProfileFormData = {
  username: '',
  email: '',
  avatar: '',
};

const EditProfile = () => {
  const router = useRouter();
  const [formData, setFormData] = useState(initialState);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);

        const user = await getMe();

        setFormData({
          username: user.username ?? '',
          email: user.email ?? '',
          avatar: user.avatar ?? '',
        });
      } catch {
        setError('Failed to load profile');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsSaving(true);
      setError(null);

      await updateMe({ userName: formData.username });

      // message 'Profile updated'
      router.push('/profile');
    } catch {
      setError('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  if (isLoading) {
    return <p>Loading profile...</p>;
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={formData.avatar}
          alt={formData.username || 'User avatar'}
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} onSubmit={handleSaveUser}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <p>Email: {formData.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditProfile;
