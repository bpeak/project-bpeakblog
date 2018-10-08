import * as crypto from 'crypto'
import encryptionConfig from '~configs/secret/encryption.config'

class Encryption {
    public static getPwSet (password : string) : { hash : string, salt : string }{
        const salt : string = this.getSalt()
        const hash : string = this.getHash(password, salt)
        return { salt, hash }
    }

    private static getSalt = () : string => {
        return crypto.randomBytes(encryptionConfig.byteSize).toString('base64')
    }

    public static getHash = (password : string, salt : string) : string => {
        return crypto.pbkdf2Sync(password, salt, encryptionConfig.iiterations, encryptionConfig.keyLen, 'sha512').toString('base64')
    }
    
}

export default Encryption
