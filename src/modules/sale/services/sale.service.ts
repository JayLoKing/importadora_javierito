import { httpClient } from "../../../api/httpClient";
import { loadAbort } from "../../../utils/loadAbort.utility";
import { UseApiCall } from "../../../utils/useApi.model";
import { SaleDto } from "../models/sale.model";
import { SaleUrl } from "../urls/sale.url";

export const newSale = (sale: SaleDto): UseApiCall<null> => {
    const controller = loadAbort();
    return {
        call: httpClient.post<null>(SaleUrl.create, sale, { signal: controller.signal }),
        controller,
    };
}