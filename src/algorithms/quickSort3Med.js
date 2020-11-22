export function getQuickSort3MedAnimations(array) {
    let animations = [];
    let auxiliaryArray = array.slice();
    quickSort3Med(auxiliaryArray, 0, auxiliaryArray.length - 1, animations);
    array = auxiliaryArray;
    return [animations, array];
}

function quickSort3Med(auxiliaryArray, start, end, animations) {

    if (end > start) {

        let pivot = medianOf3(auxiliaryArray, start, end);

        let partition = partitionArray(auxiliaryArray, start, end, pivot, animations);

        quickSort3Med(auxiliaryArray, start, partition - 1, animations);
        quickSort3Med(auxiliaryArray, partition + 1, end, animations);
    }
}

function partitionArray(auxiliaryArray, start, end, pivot, animations) {

    animations.push(["comparison1", start, end]);
    animations.push(["comparison2", start, end]);

    let i = start - 1;

    for (let j = start; j <= end; j++) {

        animations.push(["comparison1", j, end]);
        animations.push(["comparison2", j, end]);

        if (auxiliaryArray[j] <= auxiliaryArray[pivot]) {

            animations.push(["comparison1", j, pivot]);
            animations.push(["comparison2", j, pivot]);

            i++;

            animations.push(["comparison1", i, j]);
            animations.push(["swap", j, auxiliaryArray[i]]);
            animations.push(["swap", i, auxiliaryArray[j]]);
            animations.push(["comparison1", i, j]);
            swap(auxiliaryArray, i, j);
        }
    }
    return i;
}

function medianOf3(auxiliaryArray, low, high) {

    const mid = (low + high) / 2;

    if (auxiliaryArray[mid] < auxiliaryArray[low])
        swap(auxiliaryArray, low, mid);
    if (auxiliaryArray[high] < auxiliaryArray[low])
        swap(auxiliaryArray, low, high);
    if (auxiliaryArray[mid] > auxiliaryArray[high])
        swap(auxiliaryArray, mid, high);
    swap(auxiliaryArray, mid, high);

    return high;
}

function swap(auxiliaryArray, i, j) {

    var t = auxiliaryArray[i];
    auxiliaryArray[i] = auxiliaryArray[j];
    auxiliaryArray[j] = t;
}