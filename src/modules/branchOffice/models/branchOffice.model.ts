export interface BranchOffice {
    id: number;
    name: string;
    address: string;
    latitude: string;
    longitude: string;
    registerDate: string;
    status: number;
    images: string[];
}

export interface NewBranchOfficeDTO {
    name: string;
    address: string;
    latitude: string;
    longitude: string;
    images: string[];
}