export interface MenuItem {
    id: string;
    subtitle: string;
    title: string;
    icon: string;
    role: string[];
    route: string;
}

export interface FlatNode {
    expandable: boolean;
    name: string;
    count: number;
    level: number;
}

export interface SampleNode {
    id: string;
    name: string;
    description: string;
    count?: number;
    tests?: SampleNode[];
    type?: string;
    sampleId?: string;
}

export interface UsersData {
    description?: string;
    name: string;
    id: number;
}