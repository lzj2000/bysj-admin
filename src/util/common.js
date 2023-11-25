//格式化时间戳
export function parseTime(timestamp, format) {
    var date = new Date(timestamp);
    var year = date.getFullYear();
    var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    var minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    var second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

    format = format.replace('{y}', year);
    format = format.replace('{m}', month);
    format = format.replace('{d}', day);
    format = format.replace('{h}', hour);
    format = format.replace('{i}', minute);
    format = format.replace('{s}', second);

    return format;
}
//排序
export function sortByField(arr, field) {
    return arr.sort((a, b) => a[field] - b[field]);
}