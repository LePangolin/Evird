function createRefreshToken(){
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let token = '';
    for(let i = 0; i < 32; i++){
        token += chars[Math.floor(Math.random() * chars.length)];
    }
    return token;
}

module.exports = {
    createRefreshToken
}