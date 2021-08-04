export const responseReducer = (responseStatus: number, responseText: string | object) => {
    return {
        responseStatus: responseStatus,
        responseText: responseText
    }
}