export function getBubbleSortAnimations(array) {
    
    let animations = [];
    let auxiliaryArray = array.slice();
    bubbleSort(auxiliaryArray, animations);
    array = auxiliaryArray;
    return [animations, array];
}

function bubbleSort(auxiliaryArray, animations) {

    for (let i = 0; i < auxiliaryArray.length; i++) {

        var swapped = false;

        for (let j = 0; j < auxiliaryArray.length - 1; j++) {

            animations.push(["comparison1", j, j + 1]);
            animations.push(["comparison2", j, j + 1]);

            if(auxiliaryArray[j] > auxiliaryArray[j + 1]) {

                swapped = true;
                animations.push(["swap", j, auxiliaryArray[j + 1]]);
                animations.push(["swap", j + 1, auxiliaryArray[j]]);
                swap(auxiliaryArray, j, j + 1);
            }
        }
        if(!swapped) break;
    }
}

function swap(auxiliaryArray, i, j) {

    var t = auxiliaryArray[i];
    auxiliaryArray[i] = auxiliaryArray[j];
    auxiliaryArray[j] = t;
}

