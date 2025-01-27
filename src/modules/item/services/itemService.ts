import {useEffect, useState} from "react";
import {httpClient} from "../../../api/httpClient.ts";
import { ItemDTO } from "../models/item.model.ts";

type Data<T> = T | null;
type ErrorType = Error | null;

interface Params<T> {
    data: Data<T>;
    loading: boolean;
    error: ErrorType;
}

export const FetchItemsAsync = <T>(url: string) : Params<T> => {
    const [data, setData] = useState<Data<T>>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<ErrorType>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await httpClient.get(url);
                if(response.status === 200){
                    setData(response.data);
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