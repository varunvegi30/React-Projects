export function mergeSortAnimations(array) {
    const animations = [];
    if (array.length === 1) {
        return array;
    }
    const aux = array.slice();
    mergeSortHelper(array, 0, array.length - 1, aux, animations);
    var output = { 'animations': animations, 'sortedResult': array }
    return output;
}

function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxArray,
    animations
) {
    if (startIdx == endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxArray, animations);
}


function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxArray,
    animations
) {

    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;


    while (i <= middleIdx && j <= endIdx) {
        // First time to keep track of the indices we're actually comparing
        animations.push([i, j])
            // Another time to revert back colors
        animations.push([i, j])
        if (auxArray[i] <= auxArray[j]) {
            // We need to overwrite the value at position k with the value at i
            animations.push([k, auxArray[i]])
            mainArray[k++] = auxArray[i++];
        } else {
            // We need to overwrite the value at position k with the value at j
            animations.push([k, auxArray[j]])
            mainArray[k++] = auxArray[j++];
        }
    }

    while (i <= middleIdx) {
        // First time to keep track of the indices we're actually comparing
        animations.push([i, i])
            // Another time to revert back colors
        animations.push([i, i])
            // We need to overwrite the value at position k with the value at i
        animations.push([k, auxArray[i]])

        mainArray[k++] = auxArray[i++];
    }

    while (j <= endIdx) {
        // First time to keep track of the indices we're actually comparing
        animations.push([j, j])
            // Another time to revert back colors
        animations.push([j, j])
            // We need to overwrite the value at position k with the value at i
        animations.push([k, auxArray[j]])

        mainArray[k++] = auxArray[j++];
    }
}