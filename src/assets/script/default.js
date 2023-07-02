window.__dynamicSort = (prop) => {
    var ordem = 1;
    if (prop[0] === "-") {
        ordem = -1;
        prop = prop.substr(1);
    }

    return (obj_a, obj_b) => {
        let item_a = (typeof obj_a[prop] === 'string') ? obj_a[prop].toLowerCase() : obj_a[prop];
        let item_b = (typeof obj_b[prop] === 'string') ? obj_b[prop].toLowerCase() : obj_b[prop];
        var resultado = (item_a < item_b) ? -1 : (item_a > item_b) ? 1 : 0;
        return resultado * ordem;
    }
}

window.__dynamicMultiSort = (props) => {
    var props;
    return function (obj_a, obj_b) {
        for (var index = 0, resultado = 0; (resultado === 0 && index < props.length); index++) {
            resultado = __dynamicSort(props[index])(obj_a, obj_b);
        }
        return resultado;
    }
}

window.__save = (item, data) => {
    data = (typeof data !== 'string') ? JSON.stringify(data) : data;
    localStorage.setItem(item, data);
}

window.__load = (item) => {
    return JSON.parse(localStorage.getItem(item));
}

window.__loadLastId = () => {
    let tasklist = __load('tasklist');
    if (tasklist) {
        return Math.max(...tasklist.map(task => task.id))
    }
    return 0;
}