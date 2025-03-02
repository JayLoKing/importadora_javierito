import { useCallback, useEffect, useState } from "react";
import { UseApiCall } from "../../utils/useApi.model";
import axios from "axios";

type Data<T> = T | [] | null;
type CustomError = Error | null;
type UseApiOptions = {
    autoFetch?: boolean;
}

interface UseApiResult<T> {
    loading: boolean;
    data: Data<T>;
    error: CustomError;
    fetch: () => void;
}

export const useApi = <T,>(apiCall: UseApiCall<T>, options?: UseApiOptions): UseApiResult<T> => {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<Data<T>>([]);
    const [error, setError] = useState<CustomError>(null);

    const fetch = useCallback(async () => {
        const { call, controller } = apiCall;
        console.log('Iniciando fetch:', apiCall);
        setLoading(true);
        try {
            const response = await call;
            console.log('Datos recibidos:', response.data);
            setData(response.data);
            setError(null);
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log('Solicitud cancelada:', error.message);
            } else {
                console.log('Error real:', error);
                setError(error as Error);
            }
        } finally {
            setLoading(false);
        }
        return () => {
            console.log('Cancelando solicitud');
            controller.abort();
        };
    }, [apiCall]);

    useEffect(() => {
        if (options && options.autoFetch) {
            fetch();
        }
    }, [fetch, options]);

    return { loading, data, error, fetch };
};