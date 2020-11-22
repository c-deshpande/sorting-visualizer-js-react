export function getHeapSortAnimations(array) {
    let animations = [];
    let auxiliaryArray = array.slice();
    heapSort(auxiliaryArray, animations);
    array = auxiliaryArray;
    return [animations, array];
}

function heapSort(auxiliaryArray, animations) {

    let n = auxiliaryArray.length;

    buildHeap(auxiliaryArray, animations);

    for (let i = n - 1; i >= 0; i--) {

        animations.push(["comparison1", 0, i]);
        animations.push(["swap", 0, auxiliaryArray[i]]);
        animations.push(["swap", i, auxiliaryArray[0]]);
        animations.push(["comparison2", 0, i]);
        swap(auxiliaryArray, 0, i);

        heapify(auxiliaryArray, 0, i, animations);
    }
}


function buildHeap(auxiliaryArray, animations) {

    let n = auxiliaryArray.length;

    for (let i = (n / 2) - 1; i >= 0; i--) {

        heapify(auxiliaryArray, i, n, animations);
    }
}

function heapify(auxiliaryArray, i, n, animations) {

    let max = i;

    let left = (2 * i) + 1;
    let right = (2 * i) + 2;

    if (left < n && auxiliaryArray[left] > auxiliaryArray[i]) {

        max = left;
    }
    if (right < n && auxiliaryArray[right] > auxiliaryArray[max]) {

        max = right;
    }

    if (max != i) {

        animations.push(["comparison1", i, max]);
        animations.push(["swap", i, auxiliaryArray[max]]);
        animations.push(["swap", max, auxiliaryArray[i]]);
        animations.push(["comparison2", i, max]);
        swap(auxiliaryArray, i, max);

        heapify(auxiliaryArray, max, n, animations);
    }
}

function swap(auxiliaryArray, i, j) {

    var t = auxiliaryArray[i];
    auxiliaryArray[i] = auxiliaryArray[j];
    auxiliaryArray[j] = t;
}