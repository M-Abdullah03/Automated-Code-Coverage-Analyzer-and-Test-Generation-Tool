console.log(getCoverage(functionInfo.functionInfo[0].functionName, [
    { values: [ 1, 2, 2 ] },
    { values: [ 0, 2, 3 ] },
    { values: [ 1, 0, 2 ] },
    { values: [ -1, -1, -2 ] }
]));