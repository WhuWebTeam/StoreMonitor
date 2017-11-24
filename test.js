function dateFormat(timestamp) {
    timestamp = +timestamp;
    const time = new Date(timestamp);
    return time.getFullYear() + '/' + time.getMonth() + '/' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
}


console.log(dateFormat(1511511639000));