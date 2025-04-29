function tsp_hk(distance_matrix) {
    var cityNum = distance_matrix.length;
    var shortestPath = Infinity;
    var totalSubsets = 1 << cityNum;
    
    if (cityNum == 0 || cityNum == 1) {return 0;}
    
    for (var start = 0; start < cityNum; start++) {
   
      var dp = Array.from({ length: totalSubsets }, () => Array(cityNum).fill(Infinity));
      dp[1 << start][start] = 0;

      for (var i = 0; i < totalSubsets; i++) {
        for (var j = 0; j < cityNum; j++) {
          if ((i & (1 << j)) === 0) {continue;}

          for (var v = 0; v < cityNum; v++) {
            if ((i & (1 << v)) !== 0) {continue;}
    
            var newMask = i | (1 << v);
            dp[newMask][v] = Math.min(dp[newMask][v], dp[i][j] + distance_matrix[j][v]);
          }
        }
      }

    var fullMask = (1 << cityNum) - 1;

    for (var v = 0; v < cityNum; v++) {
      if (v === i) {continue;} 
      shortestPath = Math.min(shortestPath, dp[fullMask][v]);
    }

  }

  return shortestPath;
    
}
