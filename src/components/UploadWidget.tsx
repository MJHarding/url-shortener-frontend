'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getErrorMessage } from '@/utils/utils';


export const UploadWidget = () => {
  const [isClient, setIsClient] = useState(false);
  const [username, setUsername] = useState('');
  const [url, setUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate that either URL or file is present
    if (!url && !file) {
      setError('Either URL or file upload is required');
      return;
    }

    // Clear any previous errors
    setError('');
    setIsSubmitting(true);

    try {
      if (file) {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('file', file);

        await axios.post(`http://localhost:8000/upload/?username=${encodeURIComponent(username)}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      if (url) {
        await axios.post('http://localhost:8000/shorten/url/', {
          "username": username,
          "full_url": url
        });
      }

      // Reset form after successful submission
      setUsername('');
      setUrl('');
      setFile(null);
      setError('');
    } catch (err: unknown) {
      getErrorMessage(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="w-96 p-6 rounded-lg shadow-md bg-stone-200">
      <h2 className="text-2xl font-bold mb-6 text-center">URL Shortener</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700">
            URL to Shorten (Optional)
          </label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setError('');
            }}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="file" className="block text-sm font-medium text-gray-700">
            Optional File Upload
          </label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {file && (
            <p className="mt-2 text-sm text-gray-500">
              Selected file: {file.name}
            </p>
          )}
        </div>

        {error && (
          <div className="text-red-500 text-sm mt-2">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full font-bold py-2 px-4 rounded ${
            isSubmitting 
              ? 'bg-blue-300 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-700 text-white'
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};