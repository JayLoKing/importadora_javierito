/* eslint-disable no-useless-catch */
import { httpClient } from "../../../api/httpClient";
import { loadAbort } from "../../../utils/loadAbort.utility";
import { UseApiCall } from "../../../utils/useApi.model";
import { NewBranchOfficeDTO, BranchOfficeDetailsDTO, BranchOffice } from "../models/branchOffice.model";
import { BranchOfficeUrl } from "../urls/branchOffice.url";

export async function getBranchOfficesAsync() {
    try {
        const res = await httpClient.get("/branchOffice/getAll")
        if (res.status === 200) {
            return res.data;
        }
    } catch (error) {
        throw error;
    }
}

export const getBranchOfficesAsync2 = () : UseApiCall<BranchOffice[]> => {
    const controller = loadAbort();
    return { 
        call: httpClient.get<BranchOffice[]>(BranchOfficeUrl.getAll, {signal: controller.signal}), 
        controller
    }
}

export async function getBranchOfficeDetailsAsync(id: number): Promise<BranchOfficeDetailsDTO> {
    try {
        const res = await httpClient.get(`/branchOffice/getBranchOfficeDetails/${id}`)
        if (res.status === 200) {
            return res.data as BranchOfficeDetailsDTO;
        }
        return {} as BranchOfficeDetailsDTO
    } catch (error) {
        throw error;
    }
}

export async function newBranchOfficeAsync(branchOffice: NewBranchOfficeDTO) {
    try {
        const res = await httpClient.post("/branchOffice/createBranchOffice", branchOffice)
        if (res.status === 200) {
            return res.data;
        }
    } catch (error) {
        throw error;
    }
}

export async function updateBranchOfficeAsync(id: number, branchOffice: NewBranchOfficeDTO) {
    const formatData: BranchOfficeDetailsDTO = {
        id: id,
        name: branchOffice.name,
        address: branchOffice.address,
        longitude: branchOffice.longitude,
        latitude: branchOffice.latitude,
        images: [] //pendiente
    }

    try {
        const res = await httpClient.patch("/branchOffice/editBranchOffice", formatData)
        if (res.status === 204)
            return true
        return false
    } catch (error) {
        throw error
    }
}

export async function removeBranchOfficeAsync(id: number) {
    try {
        const res = await httpClient.delete(`/branchOffice/removeBranchOffice/${id}`)
        if (res.status === 204) {
            return true;
        }
    } catch (error) {
        throw error;
    }
}