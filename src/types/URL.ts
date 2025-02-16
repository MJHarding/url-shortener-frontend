export interface URLEntry {
    short_id: string;
    username: string;
    full_url: string | null;
    file_s3_key: string | null;
    created_at: string;
}

export interface URLResponse {
    urls: URLEntry[];
    total_count: number;
}