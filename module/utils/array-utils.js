export class ArrayUtils {

    static remove(array, elem) {
        let index = array.indexOf(elem);
        if (index > -1) {
            array.splice(index, 1);
        }
    }

    static removeObjectById(array, elem) {
        let index;
        array.forEach(element => {
            if(element.id == elem)
            {
                index = array.indexOf(element);
            }
        });

        if (index > -1) {
            array.splice(index, 1);
        }
    }
}