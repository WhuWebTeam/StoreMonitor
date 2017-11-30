const arr = [1, 2, 3, 4]

function sort(arr, attribute, flag) {
    arr.sort((e1, e2) => {
        if (e1[attribute] > e2[attribute]) {
            return flag;
        }

        return !flag;
    })
}


sort(arr, 'name', true);

console.log(arr);