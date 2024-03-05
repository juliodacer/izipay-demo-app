export interface ResponseToken {
    code: string;
    message: string;
    response: Response;
}

export interface Response {
    token: string;
    userOrg: string;
    userScoring: string;
}
