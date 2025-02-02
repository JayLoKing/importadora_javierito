import { httpClient } from "../../../api/httpClient";
import { BranchOffice } from "../models/branchOffice.model";

export async function getBranchOfficesAsync() {
    try {
        const res = await httpClient.get("/branchOffice/getAll")
        if (res.status === 200) {
            console.log(res.data);
            return res.data;
        }
    } catch (error) {
        throw error;
    }
}

export async function getBranchOfficeByIdAsync(id: number) {
    try {
        const res = await httpClient.get(`/branchOffice/getById/${id}`)
        if (res.status === 200) {
            return res.data;
        }
    } catch (error) {
        throw error;
    }
}

export async function newBranchOfficeAsync(branchOffice: BranchOffice) {
    try {
        const res = await httpClient.post("/branchOffice/createBranchOffice", branchOffice)
        if (res.status === 200) {
            return res.data;
        }
    } catch (error) {
        throw error;
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