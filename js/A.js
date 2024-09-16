document.addEventListener('DOMContentLoaded', () => {
    const graph = document.querySelector('.graph');
    const closedListElement = document.getElementById('closed-list');
    const startBtn = document.getElementById('start-btn');
    const pathBtn = document.getElementById('path-btn');
    const sourceNodeInput = document.getElementById('source-node');
    const goalNodeInput = document.getElementById('goal-node');

    // Nodes and their positions
    const nodes = {
        S: { x: 250, y: 50 },
        A: { x: 100, y: 150 },
        B: { x: 225, y: 200 },
        C: { x: 350, y: 150 },
        D: { x: 150, y: 275 },
        E: { x: 380, y: 250 },
        F: { x: 275, y: 325 },
        G: { x: 425, y: 350 },
        H: { x: 50, y: 350 },
        I: { x: 150, y: 380 },
        J: { x: 150, y: 500 },
        K: { x: 250, y: 500 }
    };

    // Edges and their costs
    const edges = [
        { from: 'S', to: 'A', cost: 4 },
        { from: 'S', to: 'B', cost: 10 },
        { from: 'S', to: 'C', cost: 11 },
        { from: 'A', to: 'D', cost: 5 },
        { from: 'A', to: 'B', cost: 8 },
        { from: 'B', to: 'D', cost: 15 },
        { from: 'C', to: 'D', cost: 8 },
        { from: 'C', to: 'E', cost: 20 },
        { from: 'C', to: 'F', cost: 2 },
        { from: 'D', to: 'F', cost: 1 },
        { from: 'D', to: 'H', cost: 16 },
        { from: 'D', to: 'I', cost: 20 },
        { from: 'E', to: 'G', cost: 19 },
        { from: 'F', to: 'G', cost: 13 },
        { from: 'H', to: 'I', cost: 1 },
        { from: 'H', to: 'J', cost: 2 },
        { from: 'I', to: 'J', cost: 5 },
        { from: 'I', to: 'K', cost: 13 },
        { from: 'J', to: 'K', cost: 7 },
        { from: 'I', to: 'G', cost: 5 },
        { from: 'K', to: 'G', cost: 16 },
    ];

    // Create nodes
    for (const [key, { x, y }] of Object.entries(nodes)) {
        const node = document.createElement('div');
        node.className = 'node';
        node.style.left = `${x}px`;
        node.style.top = `${y}px`;
        node.innerText = key;
        graph.appendChild(node);
    }

    // Create edges with weights and arrows
    edges.forEach(({ from, to, cost }) => {
        const fromNode = nodes[from];
        const toNode = nodes[to];

        const weight = document.createElement('div');
        const arrow = document.createElement('i');
        const element = document.createElement('div');

        arrow.className = 'fa-solid fa-play'; // Set the class name

        weight.className = 'weight';
        weight.id = `${from}${to}`;
        element.innerText = cost;
        weight.style.left = `${(fromNode.x + toNode.x) / 2}px`;
        weight.style.top = `${(fromNode.y + toNode.y) / 2}px`;
        weight.appendChild(element);
        weight.appendChild(arrow);
        graph.appendChild(weight);
    });

    // Build adjacency list
    function buildAdjacencyList(edges) {
        const adjacencyList = {};

        // Initialize adjacency list for all nodes
        Object.keys(nodes).forEach(node => {
            adjacencyList[node] = [];
        });

        edges.forEach(edge => {
            adjacencyList[edge.from].push({ node: edge.to, cost: edge.cost });

            // Uncomment for undirected graph
            // adjacencyList[edge.to].push({ node: edge.from, cost: edge.cost });
        });

        return adjacencyList;
    }

    const adjacencyList = buildAdjacencyList(edges);

    // Log neighbors for each node
    for (const node in adjacencyList) {
        console.log(`Neighbors of ${node}:`, adjacencyList[node]);
    }

    // A* algorithm implementation
    function aStarSearch(start, goal) {
        const openList = [];
        const closedList = [];
        const gCosts = {};
        const fCosts = {};
        const cameFrom = {};

        openList.push(start);
        gCosts[start] = 0;
        fCosts[start] = nodes[start].h;

        while (openList.length > 0) {
            openList.sort((a, b) => fCosts[a] - fCosts[b]);

            const current = openList.shift();

            closedList.push(current);

            if (current === goal) {
                return reconstructPath(cameFrom, current);
            }

            adjacencyList[current].forEach(neighbor => {
                const neighborNode = neighbor.node;

                if (closedList.includes(neighborNode)) {
                    return;
                }

                const tentativeGCost = gCosts[current] + neighbor.cost;
                if (!openList.includes(neighborNode)) {
                    openList.push(neighborNode);
                } else if (tentativeGCost >= gCosts[neighborNode]) {
                    return;
                }

                cameFrom[neighborNode] = current;
                gCosts[neighborNode] = tentativeGCost;
                fCosts[neighborNode] = gCosts[neighborNode] + nodes[neighborNode].h;
            });
        }

        return [];
    }

    function reconstructPath(cameFrom, current) {
        const totalPath = [current];
        while (current in cameFrom) {
            current = cameFrom[current];
            totalPath.unshift(current);
        }
        return totalPath;
    }

    function findNodeElementByText(text) {
        return Array.from(document.querySelectorAll('.node')).find(node => node.innerText === text);
    }

    function findEdgeElement(from, to) {
        return document.getElementById(`${from}${to}`);
    }

    function resetGraph() {
        document.querySelectorAll('.node').forEach(node => {
            node.style.borderColor = 'black';
        });
        document.querySelectorAll('.weight').forEach(edge => {
            edge.style.backgroundColor = '';
        });
        closedListElement.innerHTML = '';
    }

    function animatePath(path) {
        let currentStep = 0;

        function animateStep() {
            if (currentStep < path.length - 1) {
                const currentNode = path[currentStep];
                const nextNode = path[currentStep + 1];
                findNodeElementByText(currentNode).style.borderColor = 'red';
                const listItem = document.createElement('li');
                listItem.innerText = currentNode;
                closedListElement.appendChild(listItem);

                const neighbors = adjacencyList[currentNode] || [];
                neighbors.forEach(neighbor => {
                    findNodeElementByText(neighbor.node).style.borderColor = 'blue';
                    const edgeElement = findEdgeElement(currentNode, neighbor.node);
                    if (edgeElement) {
                        edgeElement.style.backgroundColor = 'blue';
                    }
                });

                if (neighbors.length > 0) {
                    const minCostNeighbor = neighbors.reduce((min, n) => n.cost < min.cost ? n : min, neighbors[0]);
                    findNodeElementByText(minCostNeighbor.node).style.borderColor = 'green';
                }

                const edgeElement = findEdgeElement(currentNode, nextNode);
                if (edgeElement) {
                    edgeElement.style.backgroundColor = 'red';
                }

                currentStep++;
                setTimeout(() => {
                    neighbors.forEach(neighbor => {
                        findNodeElementByText(neighbor.node).style.borderColor = 'black';
                        const edgeElement = findEdgeElement(currentNode, neighbor.node);
                        if (edgeElement) {
                            edgeElement.style.backgroundColor = '';
                        }
                    });
                    animateStep();
                }, 2000);
            } else {
                const finalNode = path[currentStep];
                findNodeElementByText(finalNode).style.borderColor = 'red';
                const listItem = document.createElement('li');
                listItem.innerText = finalNode;
                closedListElement.appendChild(listItem);

                // Highlight the final path in green
                for (let i = 0; i < path.length - 1; i++) {
                    const currentNode = path[i];
                    const nextNode = path[i + 1];
                    const edgeElement = findEdgeElement(currentNode, nextNode);
                    if (edgeElement) {
                        edgeElement.style.backgroundColor = 'green';
                    }
                }
            }
        }

        animateStep();
    }

    startBtn.addEventListener('click', () => {
        resetGraph();
        const startNode = sourceNodeInput.value.trim();
        const goalNode = goalNodeInput.value.trim();
        const path = aStarSearch(startNode, goalNode);
        animatePath(path);
    });

    // Depth-First Search to find all paths
    function findAllPaths(start, goal) {
        const paths = [];
        const stack = [{ node: start, path: [start], cost: 0 }];

        while (stack.length > 0) {
            const { node, path, cost } = stack.pop();

            if (node === goal) {
                paths.push({ path: [...path], cost });
                continue;
            }

            adjacencyList[node].forEach(neighbor => {
                if (!path.includes(neighbor.node)) {
                    stack.push({ node: neighbor.node, path: [...path, neighbor.node], cost: cost + neighbor.cost });
                }
            });
        }

        return paths;
    }

    function highlightPath(path, color) {
        path.forEach((node, index) => {
            if (index < path.length - 1) {
                const nextNode = path[index + 1];
                const edgeElement = findEdgeElement(node, nextNode);
                if (edgeElement) {
                    edgeElement.style.backgroundColor = color;
                }
            }
        });
    }

    function displayAllPaths(paths) {
        closedListElement.innerHTML = '';
        paths.forEach((pathInfo, index) => {
            const listItem = document.createElement('li');
            listItem.innerText = `Path ${index + 1}: ${pathInfo.path.join(' -> ')} (Cost: ${pathInfo.cost})`;
            closedListElement.appendChild(listItem);
        });
    }

    pathBtn.addEventListener('click', () => {
        resetGraph();
        const startNode = sourceNodeInput.value.trim();
        const goalNode = goalNodeInput.value.trim();
        const paths = findAllPaths(startNode, goalNode);
        displayAllPaths(paths);
        paths.forEach(pathInfo => highlightPath(pathInfo.path, 'blue'));
    });
});
