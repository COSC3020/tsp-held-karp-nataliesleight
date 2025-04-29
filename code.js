function tsp_hk(distance_matrix) {
    var cityNum = distance_matrix.length;   // hold number of nodes
    var shortestPath = Infinity;            // save shortest path as infinity, any found path will be lesser
    var totalSubsets = 1 << cityNum;        // 2^n, number of paths
    
    if (cityNum == 0 || cityNum == 1) {return 0;}     // if graph empty or one node, return empty (no paths to form)
    
    for (var start = 0; start < cityNum; start++) {   // no specific start node, check with each node as start
   
      var dp = Array.from({ length: totalSubsets }, () => Array(cityNum).fill(Infinity));   // create 2d array, subset x n, fill with infinity
      dp[1 << start][start] = 0;                      // mark start node as 0, no path to start required

      for (var i = 0; i < totalSubsets; i++) {        // going through array dp
        for (var j = 0; j < cityNum; j++) {
          if ((i & (1 << j)) === 0) {continue;}       // if current visited, continue

          for (var v = 0; v < cityNum; v++) {
            if ((i & (1 << v)) !== 0) {continue;}
    
            var newMask = i | (1 << v);
            dp[newMask][v] = Math.min(dp[newMask][v], dp[i][j] + distance_matrix[j][v]);  // mark visited, update path and distance
          }
        }
      }

    var fullMask = (1 << cityNum) - 1;    // number of masks

    for (var v = 0; v < cityNum; v++) {   // checking paths
      if (v === i) {continue;} 
      shortestPath = Math.min(shortestPath, dp[fullMask][v]);   // get shortest path
    }

  }

  return shortestPath;
    
}
