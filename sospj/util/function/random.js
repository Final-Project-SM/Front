export const generateRandomString = (length = 8) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
  
    return Array.from({ length }, () => characters[Math.floor(Math.random() * charactersLength)]).join('');
};

export const generateRandomuid = (length = 16) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
  
    return Array.from({ length }, () => characters[Math.floor(Math.random() * charactersLength)]).join('');
};