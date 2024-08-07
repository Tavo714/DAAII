export interface StudentPage{

    totalItems: number;
    totalPages: number;
    items: Item[];    
}

export interface Item{
    id: number;
    name: string;
    lastname: string;
    nid: string;
    phoneNumber: string;
    email: string;
    username: string;
    password: string;
    state: string;
}