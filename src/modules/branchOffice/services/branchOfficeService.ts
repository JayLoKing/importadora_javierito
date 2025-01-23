import { httpClient } from "../../../api/httpClient";
import { BranchOffice } from "../models/branchOffice.model";

export async function getBranchOfficesAsync() {
    try {
        const res = await httpClient.get("/api/branchOffice/getAll")
        if (res.status === 200) {
            return res.data;
        }
    } catch (error) {
        throw error;
    }
}

export async function getBranchOfficeByIdAsync(id: number) {
    try {
        const res = await httpClient.get(`/api/branchOffice/getById/${id}`)
        if (res.status === 200) {
            return res.data;
        }
    } catch (error) {
        throw error;
    }
}

export async function newBranchOfficeAsync(branchOffice: BranchOffice) {
    try {
        const res = await httpClient.post("/api/branchOffice/createBranchOffice", branchOffice)
        if (res.status === 200) {
            return res.data;
        }
    } catch (error) {
        throw error;
    }
}