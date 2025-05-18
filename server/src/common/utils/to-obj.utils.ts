export const toObj = <T>(obj: T): T => {
    return JSON.parse(JSON.stringify(obj));
};
