export interface Item {id: number;}

export type New<T extends Item> = Omit<T, 'id'>;

export type Updatable<T extends Item> = New<T> & {id?: number;};