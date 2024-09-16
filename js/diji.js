document.getElementById('startButton').addEventListener('click', () => {
    const nodes = document.querySelectorAll('.node');
    const edges = document.querySelectorAll('.edge');
    
    const graph = [
        [0, 2, 6, Infinity, Infinity, Infinity, Infinity],
        [2, 0, Infinity, 5, Infinity, Infinity, Infinity],
        [6, Infinity, 0, 8, Infinity, Infinity, Infinity],
        [Infinity, 5, 8, 0, 10, 15, Infinity],
        [Infinity, Infinity, Infinity, 10, 0, Infinity, 2],
        [Infinity, Infinity, Infinity, 15, Infinity, 0, 6],
        [Infinity, Infinity, Infinity, Infinity, 2, 6, 0]
    ];

    const startNode = 0;
    const distances = Array(nodes.length).fill(Infinity);
    distances[startNode] = 0;
    const visited = Array(nodes.length).fill(false);
    const previousNodes = Array(nodes.length).fill(null);

    function findMinDistanceNode() {
        let minDistance = Infinity;
        let minNode = null;
        for (let i = 0; i < distances.length; i++) {
            if (!visited[i] && distances[i] < minDistance) {
                minDistance = distances[i];
                minNode = i;
            }
        }
        return minNode;
    }

    function dijkstraStep() {
        const currentNode = findMinDistanceNode();
        if (currentNode === null) {
            displayResults();
            return;
        }
        
        visited[currentNode] = true;
        nodes[currentNode].style.backgroundColor = '#ffeb3b';
        nodes[currentNode].style.color = '#000';
        edges[currentNode].style.backgroundColor= '#ffeb3b';

        for (let neighbor = 0; neighbor < graph[currentNode].length; neighbor++) {
            if (graph[currentNode][neighbor] !== Infinity && !visited[neighbor]) {
                const newDistance = distances[currentNode] + graph[currentNode][neighbor];
                if (newDistance < distances[neighbor]) {
                    distances[neighbor] = newDistance;
                    previousNodes[neighbor] = currentNode;
                }
            }
        }

        setTimeout(dijkstraStep, 1000);
    }

    function displayResults() {
        const resultsContainer = document.createElement('div');
        resultsContainer.classList.add('results');
        resultsContainer.innerHTML = '<h3>Vertex Distance from Source</h3>';
        distances.forEach((distance, vertex) => {
            resultsContainer.innerHTML += `<p>${vertex} -> ${distance}</p>`;
        });
        document.body.appendChild(resultsContainer);
    }

    dijkstraStep();
});
