
import { httpClient } from "../../../api/httpClient";
import { loadAbort } from "../../../utils/loadAbort.utility";
import { UseApiCall } from "../../../utils/useApi.model";
import { Barcode } from "../models/barcode.model";
import { BarcodeUrl } from "../urls/barcode.url";

export const getBarcodesAsyncById = (id: number): UseApiCall<Barcode[]> => {
    const controller = loadAbort();
    return {
        call: httpClient.post<Barcode[]>(BarcodeUrl.getBarcodes, id, {signal: controller.signal}),
        controller
    }
}