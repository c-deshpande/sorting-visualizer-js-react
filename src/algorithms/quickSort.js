export function getQuickSortAnimations(array) {
    let animations = [];
    let auxiliaryArray = array.slice();
    array = quickSort(auxiliaryArray, 0, auxiliaryArray.length - 1, animations);;
    return [animations, array];
}

function quickSort(auxiliaryArray, start, end, animations) {

    var index;

    if (auxiliaryArray.length > 1) {

        index = partitionArray(auxiliaryArray, start, end, animations);
        if (start < index - 1) {

            quickSort(auxiliaryArray, start, index - 1, animations);
        }
        if (index < end) {

            quickSort(auxiliaryArray, index, end, animations);
        }
    }
    return auxiliaryArray;
}

function partitionArray(auxiliaryArray, start, end, animations) {

    var pivot = auxiliaryArray[Math.floor((start + end) / 2)];
    var i = start;
    var j = end;

    while (i <= j) {

        animations.push(["comparison1", i, j]);
        animations.push(["comparison2", i, j]);

        animations.push(["comparison1", i, Math.floor((start + end) / 2)]);
        animations.push(["comparison2", i, Math.floor((start + end) / 2)]);

        while (auxiliaryArray[i] < pivot) {

            i++;
        }
        animations.push(["comparison1", j, Math.floor((start + end) / 2)]);
        animations.push(["comparison2", j, Math.floor((start + end) / 2)]);

        while (auxiliaryArray[j] > pivot) {
            
            j--;
        }
        animations.push(["comparison1", i, j]);
        animations.push(["comparison2", i, j]);

        if (i <= j) {
            
            animations.push(["comparison1", i, j]);
            animations.push(["swap", i, auxiliaryArray[j]]);
            animations.push(["swap", j, auxiliaryArray[i]]);
            animations.push(["comparison2", i, j]);
            swap(auxiliaryArray, i, j);
            i++;
            j--;
        }
    }
    return i;
}

function swap(auxiliaryArray, i, j) {

    var t = auxiliaryArray[i];
    auxiliaryArray[i] = auxiliaryArray[j];
    auxiliaryArray[j] = t;
}