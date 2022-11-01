export type TAction = {
    id: number;
    type: 'C' | 'D' | 'U';
    occurrence: string;
    user: {
        id: number;
        name: string;
    },
    car: {
        id: number;
        brand: string;
        model: string;
    }
}