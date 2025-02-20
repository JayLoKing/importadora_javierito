import {useCallback, useEffect, useState} from "react";
import {httpClient} from "../../api/httpClient.ts";

type Data<T> = T | [] | null;
type ErrorType = Error | null;

interface Params<T> {
    data: Data<T>;
    dataObject?: T;
    loading: boolean;
    error: ErrorType;
}

export const FetchDataAsync = <T>(url: string) : Params<T> => {
    const [data, setData] = useState<Data<T>>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<ErrorType>(null);

    useEffect(() => {
        const abortController = new AbortController();

        const fetchData = async () => {
            try {
                const response = await httpClient.get(url,  {signal: abortController.signal,});
                if(response.status === 200){
                    setData(response.data);
                    setError(null);
                } else {
                    throw new Error(response.statusText);
                }
            } catch (error) {
                if (!abortController.signal.aborted) {
                    setError(error as Error);
                }
            } finally {
                if (!abortController.signal.aborted) {
                    setLoading(false);
                }
            }
            return () => {
                abortController.abort();
            };
        }
        fetchData();
    }, [url])
    return {data, error, loading};
}

export const FetchDataByIdAsync = <T>(url: string, body: any) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ErrorType>(null);
    const fetchData = useCallback(async (): Promise<T | null> => {
        const abortController = new AbortController();
        setLoading(true);
        setError(null);
        try {
            const response = await httpClient.post(url, body, {signal: abortController.signal,});
            if (response.status === 200) {
                setData(response.data);
                return response.data;
            } else {
                throw new Error(response.statusText);
            }
        } catch (error) {
            if (!abortController.signal.aborted) {
                setError(error as Error);
            }
            return null;
        } finally {
            if (!abortController.signal.aborted) {
                setLoading(false);
            }
        }

    }, [url, body]);
    return { data, loading, error, fetchData };
};

export async function CreateAsync<T, R>(url: string, body: T): Promise<R> {
    try {
        const response = await httpClient.post<R>(url, body);
        if (response.status === 200) {
            return response.data;
        }
        throw new Error(`Error: ${response.statusText}`);
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Fallo en la creacion: ${error.message}`);
        } else {
            throw new Error('Fallo en la creacion: Error desconocido');
        }
    }
}

export async function UpdateAsync<T, R>(url: string, body: T): Promise<R> {
    try {
        const response = await httpClient.put<R>(url, body);
        if (response.status === 200) {
            return response.data;
        }
        throw new Error(`Error: ${response.statusText}`);
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Fallo en la edicion: ${error.message}`);
        } else {
            throw new Error('Fallo en la edicion: Error desconocido');
        }
    }
}