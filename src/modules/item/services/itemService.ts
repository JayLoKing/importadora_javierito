import {useCallback, useEffect, useState} from "react";
import {httpClient} from "../../../api/httpClient.ts";
import { ItemDTO } from "../models/item.model.ts";

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
        const controller = new AbortController();
        //setLoading(true);

        const fetchData = async () => {
            try {
                const response = await httpClient.get(url,  controller);
                if(response.status === 200){
                    setData(response.data);
                    setError(null);
                } else {
                    throw new Error(response.statusText);
                }
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [url])
    return {data, error, loading};
}

export const FetchDataByIdAsync = <T>(url: string, body: any) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ErrorType>(null);

    const fetchData = useCallback(async () => {
        const abortController = new AbortController();
        setLoading(true);
        setError(null);
        try {
            const response = await httpClient.post(url, body, {signal: abortController.signal,});
            if (response.status === 200) {
                setData(response.data);
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
    }, [url, body]);
    return { data, loading, error, fetchData };
};

export async function CreateItemAsync(itemDTO: ItemDTO){
    try {
        const response = await httpClient.post("/items/insertItem", itemDTO)
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        throw error;
    }
}