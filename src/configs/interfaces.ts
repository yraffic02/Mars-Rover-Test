export interface Coordinates {
    x: number | null;
    y: number | null;
}

export interface Dataset {
    label: string;
    data: Coordinates[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
    pointRadius: number;
}

