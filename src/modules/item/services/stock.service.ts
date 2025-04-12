import { httpClient } from "../../../api/httpClient";
import { loadAbort } from "../../../utils/loadAbort.utility";
import { UseApiCall } from "../../../utils/useApi.model";
import { NewStockDTO } from "../models/stock.model";
import { StockUrl } from "../urls/stock.url";

export const createStockAsync = (stock: NewStockDTO): UseApiCall<NewStockDTO> => {
    const controller = loadAbort();
    return {
        call: httpClient.post<NewStockDTO>(StockUrl.insertStock, stock, {signal: controller.signal}),
        controller
    }
}