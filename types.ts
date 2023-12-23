export type Cliente = {
    name: string;
    email: string;
    cards: Array<Tarjeta>;
    travels: Array<Viaje>;
};

export type Conductor = {
    name: string;
    email: string;
    username: string;
    travels: Array<Viaje>;
};

export type Viaje = {
    cliente: string;
    driver: string;
    money: number;
    distance: number;
    date: Date;
    status: Estado;
};

export type Tarjeta = {
    number: number;
    cvv: string;
    expirity: Date;
    money: number;
}

export type Estado = "Before" | "In process" | "Finished";