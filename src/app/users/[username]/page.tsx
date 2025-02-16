"use client";
import { useState, useEffect } from 'react';
import { useParams } from "next/navigation";
import axios from 'axios';
import { URLEntry, URLResponse } from '@/types/URL';


export default function UserURLsPage() {
    const params = useParams();
    const {username} = params;
    const [urls, setUrls] = useState<URLEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchUserURLs() {
            try {
                const response = await axios.get<URLResponse>(`http://localhost:8000/user/${username}/urls`);
                setUrls(response.data.urls);
                setLoading(false);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Failed to fetch URLs';
                setError(errorMessage);
                setLoading(false);
            }
        }

        fetchUserURLs();
    }, [username]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">URLs for {username}</h1>
            {urls.length === 0 ? (
                <p className="text-center">No URLs found for this user.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full bg-white border border-gray-200 min-w-[600px]">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="py-2 px-4 border-b text-left">Short Link</th>
                                <th className="py-2 px-4 border-b text-left">Full URL</th>
                                <th className="py-2 px-4 border-b text-left">Created At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {urls.map((url) => (
                                <tr key={url.short_id} className="hover:bg-gray-50 border-b">
                                    <td className="py-2 px-4">
                                        <a 
                                            href={`http://localhost:8000/${url.short_id}`} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="text-blue-600 hover:underline block truncate max-w-[300px]"
                                        >
                                            {url.short_id}
                                        </a>
                                    </td>
                                    <td className="py-2 px-4">
                                        {url.full_url ? (
                                            <a 
                                                href={url.full_url} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="text-blue-600 hover:underline block truncate max-w-[300px]"
                                            >
                                                {url.full_url}
                                            </a>
                                        ) : (
                                            <span className="text-gray-500">No URL available</span>
                                        )}
                                    </td>
                                    <td className="py-2 px-4">
                                        <span className="block">{new Date(url.created_at).toLocaleString()}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
