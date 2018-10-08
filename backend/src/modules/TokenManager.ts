import * as jwt from 'jsonwebtoken'
import jwtConfig from '~configs/secret/jwt.config'

export default class TokenManager {
    public static issue (unique_id : string) : string {
        const token = jwt.sign(
            {
                user : {
                    unique_id
                }
            },
            jwtConfig.secret,
            jwtConfig.options
        )
        return token
    }
}