export interface BaseRepository<E, U, D> {
    find: (whereUniqueInput: U) => Promise<E | null>;
    delete: (whereUniqueInput: U) => Promise<E>;
    create: (data: D) => Promise<E>;
}
