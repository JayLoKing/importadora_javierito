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
    fetch: (apiCall?: UseApiCall<T>) => Promise<void>;
}

export const useApi = <T,>(initialApiCall: UseApiCall<T> | null, options?: UseApiOptions): UseApiResult<T> => {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<Data<T>>([]);
    const [error, setError] = useState<CustomError>(null);

    const fetch = useCallback(async (apiCall?: UseApiCall<T>) => {
        const callToUse = apiCall || initialApiCall;
        console.log(callToUse);
        if (!callToUse) return;
        

        const { call, controller } = callToUse;
        setLoading(true);
        try {
            const response = await call;
            console.log(response);
            setData(response.data);
            setError(null);
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log('Solicitud cancelada:', error.message);
            } else {
                setError(error as Error);
            }
        } finally {
            setLoading(false);
        }
        controller.abort();
    }, [initialApiCall]);

    useEffect(() => {
        if (options?.autoFetch && initialApiCall) {
            fetch();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetch, options?.autoFetch]);

    return { loading, data, error, fetch };
};