export interface BaseRepository<E, U, W, D, O> {
    find: (whereUniqueInput: U) => Promise<E | null>;
    findAll: (params: { skip?: number; take?: number; cursor?: W; where?: W; orderBy?: O }) => Promise<E[]>;
    delete: (whereUniqueInput: U) => Promise<E>;
    create: (data: D) => Promise<E>;
}
