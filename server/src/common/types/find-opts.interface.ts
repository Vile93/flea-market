export interface FindOpts {
    skip?: number;
    take?: number;
    orderBy: Record<string, string>;
    where: Record<string, string>;
}
