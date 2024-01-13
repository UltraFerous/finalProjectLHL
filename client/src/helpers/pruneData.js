const pruneData = function(data) {
  const pruneData = [];
  let dup = false;
  let currentPoint = 0;
  let prunedIndex = 0;
  // Go through the array of objects even in the JSON
  for (let obj of data) {
    // Go through the array that was given in each object
    for (let point in obj) {
      // Set the value of the current point
      currentPoint = obj[point];

      // Check for duplicates in the pruned data
      for (let prunedPoint of pruneData) {
        if (currentPoint.id === prunedPoint.id) {
          dup = true;
          prunedIndex = pruneData.indexOf(prunedPoint);
          break;
        }
      }
      // If no duplicate is found add it to the pruned data with a new count value of 1
      // If a duplicate is found increase the count by 1 where the duplicate was found in the pruned data
      if (dup === false) {
        obj[point].count = 1;
        pruneData.push(currentPoint);
      } else {
        pruneData[prunedIndex].count++;
      }
      // Reset the duplicate value and location
      prunedIndex = 0;
      dup = false;
    }
  }

  // Sort the pruned data by order of count desc 
  pruneData.sort((a, b) => {
    return b.count - a.count;
  });

  return pruneData;
};

export default pruneData;