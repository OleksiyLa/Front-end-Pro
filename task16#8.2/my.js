function assignObjects(obj1, obj2) {
    if (typeof obj1 === 'object' && typeof obj2 === 'object') {
        let returnObject = copyObj(obj1);
        returnObject =  copyObj(obj2, returnObject);   
        return returnObject;
    } else {
        console.log('Argugments should be objects!');
    }
}

function copyObj(obj, objToReturn = {}) {
    for (key in obj) {
        objToReturn[key] = obj[key];
    }
    return objToReturn;
}
const ob1 = { x: 10, y: 20 };
const ob2 = { z: 30 };
console.log(assignObjects(ob1, ob2));
console.log(assignObjects({ x: 10 }, { x: 20, y: 30 }));






// function copyObj(obj, objToReturn = {}) {
//     for (key in obj) {
//         if (typeof obj[key] !== 'object') {
//             objToReturn[key] = obj[key];
//         } else {
//             objToReturn[key] = copyObj(obj[key], objToReturn[key]);
//         }
        
//     }
//     return objToReturn;
// }

// const obj1 = {
//     x: 10,
//     y: 'string1',
//     z: {m: 'myObj',
//         z: {inner: 'Inner Object'}
//     },
// }

// const obj2 = {
//     x: 33,
//     b: 'obj2-value',
//     y: 22,
//     z: {
//         m: 'obj2-value',
//     },
// }

// const testObject = assignObjects(obj1,obj2);

// testObject.z.z.inner = 'Changed';
// testObject.z.m = 'changed';
// testObject.x = 'Changed';
// console.log(testObject);
// console.log(obj1);
// console.log(obj2);
// assignObjects(obj1,'d');