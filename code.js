function tsp_hk(distance_matrix) {
    var n = distance_matrix.length;         // hold number of nodes， ease of use
    var shortestPath = Infinity;            // save shortest path as infinity, any found path will be lesser
    
    if (n == 0 || n == 1) {return 0;}       // if graph empty or one node, return empty (no paths to form)
    
    var unvisitedNodes = [];            // set to keep track of unvisited nodes
    for (var j = 0; j < n; j++) {
        unvisitedNodes.push(j);         // fill unvisited with all nodes (none visited yet)
    }

    for (var i = 0; i < n; i++) {           // no specific start node, check with each node as start
        
        var memo = {};                      // key-value pairs for memoization, declare here to reset for recursion
        var currentDist;                    // save distance to compare to shortest found distance
        currentDist = reMemo(distance_matrix,i,unvisitedNodes,memo);       // get shortest distance from current node, calls recursive function
        if (currentDist < shortestPath) {shortestPath = currentDist;}      // if found distance shorter, save
    }

  return shortestPath;
    
}



function reMemo(graph,currentNode,unvisitedNodes,memo) { 
    var tmpPath = Infinity;                                   // will store shortest path found with this start node
    var currentPath = 0;                                      // stores current calculated path
    var key = currentNode + '|' + [...unvisitedNodes].sort(); // key that starts with beginning node and saves other unvisited nodes
    if (memo[key] != undefined) {                             // if value at that key already exists, return value
        return memo[key];
    }
    if (unvisitedNodes.length == 2) {
        return graph[unvisitedNodes[0]][unvisitedNodes[1]];     //return only path left, undirected so 0-1 or 1-0 will be same
    }
    else {
        for (var k = 0; k < unvisitedNodes.length; k++) {           // looping through unvisited cities
            if (unvisitedNodes[k] == currentNode) { continue; }     // don't count start node, is visited
            // remove current node from unvisited nodes
            var indexNode = unvisitedNodes.indexOf(currentNode);    // get index of current node
            var tmpUN = [...unvisitedNodes];                        // make shallow copy of unvisited
            if (indexNode > -1) {                                   // if value found
                tmpUN.splice(indexNode, 1);                         // remove
            }
            // currentPath = lower path + current path
            currentPath = reMemo(graph, unvisitedNodes[k], tmpUN, memo) + graph[currentNode][unvisitedNodes[k]];   
            if (currentPath < tmpPath) {tmpPath = currentPath;}     // if found path is smaller, save
        }
        memo[key] = tmpPath;                                        // save path in memoization 
    }  

    return tmpPath;
}
