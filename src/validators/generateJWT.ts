import jwt from 'jsonwebtoken';


const generateJWT = async ( uid:string ) => {
    const secretKey = process.env.SECRET_KEY

    if( !secretKey ){
        throw new Error('Error[.env]: Error reading "SECRET_KEY" from the environment variables')
    }

    return new Promise((resolve, reject) => {
        const payload = { uid };

        jwt.sign( payload, secretKey, {
            expiresIn: '4h',
        }, (err, token ) => {
            if(err){
                console.log(err);
                reject( 'Couldn`t generate the JWT' );
            }else{
                resolve( token );
            }
        });
    });
}

export {
    generateJWT,
}