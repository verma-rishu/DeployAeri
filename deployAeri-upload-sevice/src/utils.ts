const MAX_LEN = 5;
export function generate(){
    let id = "";
    const subset = "123456789qwertyuiopasdfghjklzxcvbnm";
    for(let index = 0; index < MAX_LEN; index++){
        id += subset[Math.floor(Math.random() * subset.length)];
    }
    return id;
}