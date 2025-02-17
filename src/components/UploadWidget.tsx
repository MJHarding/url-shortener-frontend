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
  const [shortUrl, setShortUrl] = useState('');

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
    setShortUrl('');

    try {
      let response;
      if (file) {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('file', file);

        response = await axios.post(`http://localhost:8000/upload/?username=${encodeURIComponent(username)}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      if (url) {
        response = await axios.post('http://localhost:8000/shorten/url/', {
          "username": username,
          "full_url": url
        });
      }

      // Set short URL if available in response
      if (response?.data?.short_url) {
        setShortUrl(response.data.short_url);
      }

      // Reset form after successful submission
      setUsername('');
      setUrl('');
      setFile(null);
      setError('');
    } catch (err: unknown) {
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="w-96 p-6 rounded-lg shadow-lg bg-stone-100">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">URL Shortener</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            required
          />
        </div>

        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
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
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
          />
        </div>

        <div>
          <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">
            Optional File Upload
          </label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:transition-colors file:duration-200"
          />
          {file && (
            <p className="mt-2 text-sm text-gray-600">
              Selected file: {file.name}
            </p>
          )}
        </div>

        {error && (
          <div className="text-red-600 text-sm mt-2 bg-red-50 p-2 rounded-md">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full font-bold py-2 px-4 rounded-md transition-all duration-200 ${
            isSubmitting 
              ? 'bg-blue-300 cursor-not-allowed text-gray-500' 
              : 'bg-blue-500 hover:bg-blue-600 text-white hover:shadow-md'
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>

        {shortUrl && (
          <div className="mt-4 text-center bg-blue-50 p-3 rounded-md">
            <p className="text-sm font-medium text-gray-700 mb-2">Short URL:</p>
            <a 
              href={shortUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-700 hover:text-blue-900 hover:underline break-all font-semibold"
            >
              {shortUrl}
            </a>
          </div>
        )}
      </form>
    </div>
  );
};
