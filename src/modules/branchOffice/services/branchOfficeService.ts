import { httpClient } from "../../../api/httpClient";
import { NewBranchOfficeDTO, BranchOfficeDetailsDTO } from "../models/branchOffice.model";

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
        images: branchOffice.pathImages
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