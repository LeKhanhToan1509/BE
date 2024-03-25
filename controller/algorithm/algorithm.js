
module.exports.fuzzySearch = (searchInput, target) => {
    searchInput = searchInput.toLowerCase();
    target = target.toLowerCase();
    const inputLength = searchInput.length;
    const targetLength = target.length;

    if (inputLength > targetLength) {
        return false;
    }

    if (inputLength === targetLength) {
        return searchInput === target;
    }

    outer: for (let i = 0, j = 0; i < inputLength; i++) {
        const searchChar = searchInput.charAt(i);
        while (j < targetLength) {
            if (target.charAt(j++) === searchChar) {
                continue outer;
            }
        }
        return false;
    }
    return true;
}