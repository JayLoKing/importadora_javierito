export interface BranchOffice {
    id: number;
    name: string;
    address: string;
    registerDate: string;
}

export interface GetDataBranchOffice {
    first: BranchOffice[];
    second: number;
}

export interface NewBranchOfficeDTO {
    name: string;
    address: string;
    latitude: string;
    longitude: string;
    pathImages: string[];
}

export interface BranchOfficeDetailsDTO {
    id: number;
    name: string;
    address: string;
    latitude: string;
    longitude: string;
    images: OfficeImages[];
}

export interface OfficeImages {
    id: number,
    path: string,
    status: number
}