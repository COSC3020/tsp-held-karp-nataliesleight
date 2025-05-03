# Traveling Salesperson Problem -- Held-Karp Algorithm

This exercise is about the Traveling Salesperson Problem I mentioned in the
lecture on NP-hard problems -- given a set of cities, determine the length of
the shortest tour that visits all of them. We can get from any city to any other
city, i.e. the graph of cities is completely connected. We consider the version
of the Traveling Salesperson Problem that finds the shortest tour to visit $n$
cities, starting at a city and ending at the $n$ th city; it *does not* go
back to the start. The start city may be any of the cities. Remember that the
graph for a TSP is undirected, i.e. the cost is the same in either direction.

The Held-Karp algorithm for solving the Traveling Salesperson Problem is a
recursive algorithm that considers every subset of cities and finds shortest
tours within them. It takes advantage of the fact that every subroute of a route
of minimum length is of minimum length itself. The main idea is that to solve
the problem of finding the shortest route for $n$ cities, we first solve the
problem of finding the shortest route for $n-1$ cities, and then find the
shortest route from the $n-1$st city to the $n$th city. The pseudocode for the
algorithm is as follows:

```javascript
// cities is the set of cities not visited so far, including start
heldKarp(cities, start)
  if |cities| == 2
    return length of tour that starts at start, goes directly to other city in cities
  else
    return the minimum of
      for each city in cities, unless the city is start
        // reduce the set of cities that are unvisited by one  (the old start), set the new start, add on the distance from old start to new start
        heldKarp(cities - start, city) + distance from start to city
```

Implement a dynamic programming version (which could use memoization) of the
Held-Karp algorithm. If you use memoization, make sure that the cache is reset
every time the function is called such that multiple calls do not end up using
old and incorrect values. Start with the template I provided in `code.js`.

The function takes a distance matrix (the adjacency matrix for the graph where
the values in the cells are the distances between the corresponding cities) and
returns the length of the shortest tour (not the tour itself).

Test your new function; I've provided some basic testing code in `code.test.js`.

## Runtime Analysis

What is the worst-case asymptotic time complexity of your implementation? What
is the worst-case asymptotic memory complexity? Add your answer, including your
reasoning, to this markdown file.


### Memory Analysis

For memory, there are two items that take up additional memory. These are the unvisitedNodes array and the memoization cache. The array takes up $n$ space as it saves at most each node in the graph. 

The memoization cache is a bit more tricky to calculate. As it resets its cache with each different start node, only the space for one start needs to be considered. The cache stores all the paths found off of the start node, not including the start node (except the last final path saved from that start node). For each node that is not the start, a key is generated where one of those nodes is the start with the path combination attached, where that node is included. These paths range from a length of $n-1$ to $3$, as when the path is 2 a key is not saved. Because these paths must have their starting node, we only need to calculate the number of combinations from $n-2$ to $2$ (by subtracting one from the range). The equation for all combinations is $2^n - 1$, but we will subtract $n$ to account for the combinations of one value. Then we will plug in $n-2$ to account for the upper range so that we can directly plug in our number of nodes. This gives us $(2<sup>(n-2)</sup> - (n-2) -1)$. Because the key will start with any node except the start node, we will multiply by $n-1$. Also considering the final key saved for the start node, we add one. This gives us a final equation for the cache memory of $1 + (2<sup>(n-2)</sup> - (n-2) -1)(n-1)$.

Combining the arry and cache gives $1 + n + (2<sup>(n-2)</sup> - (n-2) -1)(n-1)$. Simplifying gives $\frac{n2^n}{4} - \frac{2^n}{4} - n^2 + 3n$ and thus a memory complexity of $M(n) ∈ \Theta(\frac{n2^n}{4})$. 

### Time Analysis

Similar to the memory analysis, each start node has $(2<sup>(n-2)</sup> - (n-2) -1)$ time to fill the cache. However, we must account for the work done for each start node, so we multiply by $n$ and then add the $n$ for the unvisited nodes array. This gives us $((2<sup>(n-2)</sup> - (n-2) -1)(n-1)+1)(n) + n$ which equals $\frac{n^22^n}{4} - \frac{n2^n}{4} - n^3 + 2n^2 + n$, and thus a time complexity of $T(n) ∈ \Theta(\frac{n^22^n}{4})$.

### Sources

I used this site to read up on the Held-Karp Algorithm: https://compgeek.co.in/held-karp-algorithm-for-tsp/

This time I tried memoization rather than dynamic programming. I received help from Noah Vogt and Maya Conway. 

I used this link to learn about the spread operator: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax

I used this link to learn how to remove an element from an array by value: https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array-in-javascript

I used this link to help calculate number of combinations when calculating keys in the memoization cache: https://www.omnicalculator.com/statistics/combinations-without-repetition 

“I certify that I have listed all sources used to complete this exercise, including the use of any Large Language Models. All of the work is my own, except where stated otherwise. I am aware that plagiarism carries severe penalties and that if plagiarism is suspected, charges may be filed against me without prior notice.” - Natalie Sleight
