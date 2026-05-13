import { Role } from "./enum"

export type JWTPayloadType = {
    sub: string,
    email: string,
    role: Role,
    national_id: string,
    is_password_set: boolean
}

export type AccessTokenType = {
    accessToken: string
}