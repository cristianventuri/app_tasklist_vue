window.__dynamicSort = (prop) => {
    var ordem = 1;
    if (prop[0] === "-") {
        ordem = -1;
        prop = prop.substr(1);
    }

    return (obj_a, obj_b) => {
        var resultado = (obj_a[prop] < obj_b[prop]) ? -1 : (obj_a[prop] > obj_b[prop]) ? 1 : 0;
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