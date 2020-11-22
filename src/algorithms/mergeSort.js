export function getMergeSortAnimations(array) {
    let animations = [];
    let auxiliaryArray = array.slice();
    mergeSort(auxiliaryArray, 0, auxiliaryArray.length - 1, animations);
    array = auxiliaryArray;
    return [animations, array];
}

function mergeSort(auxiliaryArray, l, r, animations) {

    if (l === r)
        return;

    if (r > l) {

        const mid = Math.floor((l + r) / 2);

        mergeSort(auxiliaryArray, l, mid, animations);
        mergeSort(auxiliaryArray, mid + 1, r, animations);
        merge(auxiliaryArray, l, mid, r, animations);
    }
}

function merge(auxiliaryArray, l, mid, r, animations) {

    let sortedArray = [];
    let i = l;
    let j = mid + 1;

    while (i <= mid && j <= r) {

        animations.push(["comparison1", i, j]);
        animations.push(["comparison2", i, j]);
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {

            sortedArray.push(auxiliaryArray[i++]);
        }
        else {

            sortedArray.push(auxiliaryArray[j++]);
        }
    }
    while (i <= mid) {

        animations.push(["comparison1", i, i]);
        animations.push(["comparison2", i, i]);
        sortedArray.push(auxiliaryArray[i++]);
    }
    while (j <= r) {

        animations.push(["comparison1", j, j]);
        animations.push(["comparison2", j, j]);
        sortedArray.push(auxiliaryArray[j++]);
    }
    for (let i = l; i <= r; i++) {
        
        animations.push(["comparison1", i, i - l]);
        animations.push(["overwrite", i, sortedArray[i - l]]);
        animations.push(["comparison2", i, i - l]);
        auxiliaryArray[i] = sortedArray[i - l];
    }
}