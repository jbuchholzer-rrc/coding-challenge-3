export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
} as const;

/*
 Type for HTTP status code values
 */
export type HttpStatusCode = typeof HTTP_STATUS[keyof typeof HTTP_STATUS];