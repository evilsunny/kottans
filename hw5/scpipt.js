var a = {b: 'c', d: {e: 'f'}};
console.log('a= ')
console.log(a);
function deepCopy(a){
    var b= {};
        for(key in a){
            if(a.hasOwnProperty(key)){
                if(typeof a[key] === "object"){
                    b[key] = deepCopy(a[key]);
                }
            }else{
                b[key] = deepCopy(a[key]);
            }

        }
    return b;
}



console.log('b= ')
console.log(copy(a));

