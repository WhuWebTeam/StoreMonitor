const person = {
    age: 1,
    number: 1
};

function setAttributes(tableObj, paramAttri) {
    
                // the attributes queried is just include '*'
                if (paramAttri.length === 1 && paramAttri[0] === '*') {
                    return paramAttri;
                }
    
    
                // the attribute queried include more than one attribute
                const attributes = [];
                const tableAttri = Object.keys(tableObj);
                paramAttri.map(ele => {
                    if (tableAttri.includes(ele)) {
                        attributes.push(ele);
                    }
                });
                return attributes;
            }

console.log(setAttributes(person, ['*']));

console.log(setAttributes(person, ['age', 'test']));