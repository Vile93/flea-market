export const toObj = (obj: Record<string, any>) => {
    return JSON.parse(JSON.stringify(obj));
};
