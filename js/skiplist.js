let searchValue = 13 // Value to search for
function expands()
{
    let key_box=document.querySelector('.key-box');
    document.getElementById('key-input').value = searchValue;
    key_box.classList.toggle('expand')
}
document.querySelector('.go').addEventListener('click', function() {
    // Prompt the user for the search value
    let key_box=document.querySelector('.key-box');

    // Make sure the search value is a valid number
    if (!isNaN(searchValue)) {
        // Set the value of the input field (optional)
      searchValue =  parseInt(document.getElementById('key-input').value);
      key_box.classList.remove('expand')
        // Now you can use the searchValue variable as needed
        console.log("Search value:", searchValue);
    } else {
        console.log("Invalid input. Please enter a number.");
    }
});

function highlightNode(node) {
    node.classList.add('highlighted');
}

function keepHighlightNode(node) {

    node.classList.add('previous-highlighted');
}

function drawLine(fromNode, toNode) {
    // Drawing logic (if needed)
}


function startSearch() {
    let currentLevel = 3; // Starting from the highest level
    let currentNodeIndex = 0; // Start at the first node of the current level
    let previousNodes = []; // To store nodes from previous levels

    function searchLevel(level, value) {
        let nodes = document.getElementById(level).getElementsByClassName('node');
        let i = currentNodeIndex; // Start searching from the currentNodeIndex

        function compareNodes() {
            if (i < nodes.length) {
                highlightNode(nodes[i]); // Highlight node being compared
                let nodeValueText = nodes[i].textContent;
                let nodeValue = parseInt(nodeValueText);

                // Handle non-numeric node values (e.g., +∞ or -∞)
                if (isNaN(nodeValue)) {
                    console.log(`Level ${currentLevel}, Last currentNodeIndex: ${i}, Node Value: ${nodeValueText}`);
                    i++;
                    setTimeout(compareNodes, 1000); // Skip this node and continue
                    return;
                }

                // Condition 1: If value is found
                if (nodeValue === value) {
                    setTimeout(() => {
                        alert(`Value ${value} found!`);
                    }, 800);
                    return;
                }

                // Condition 2: If current node value is greater than search value
                if (nodeValue > value) {
                    currentNodeIndex = Math.max(i - 1, 0); // Move back to the previous node
                    console.log(`Level ${currentLevel}, Last currentNodeIndex: ${currentNodeIndex}, Node Value: ${nodes[currentNodeIndex].textContent}`);
                    proceedToNextLevel();
                    return;
                }

                currentNodeIndex = i; // Move forward in the current level
                i++;
                setTimeout(compareNodes, 1000); // Delay between comparisons
            } else {
                console.log(`Level ${currentLevel}, Last currentNodeIndex: ${currentNodeIndex}, Node Value: ${nodes[currentNodeIndex].textContent}`);
                proceedToNextLevel(); // Move to the next level when done with the current one
            }
        }

        function proceedToNextLevel() {
            if (currentLevel > 0) {
                currentLevel--;
        
                let prevNode = nodes[currentNodeIndex]; // Node from the current level
                let prevNodeValue = prevNode.textContent.trim(); // Get text content and trim any whitespace
        
                // Highlight the currently selected node in the current level
                keepHighlightNode(prevNode);
        
                // Push the node to the previousNodes array for later reference
                previousNodes.push(prevNode);
        
                // Get the nodes of the next level
                let nextLevelNodes = Array.from(document.getElementById(`level${currentLevel}`).getElementsByClassName('node'));
        
                let newIndex = currentNodeIndex; // Initialize newIndex to carry over the current index
                let found = false;
        
                // Start the search at the current node index from the previous level
                for (let j = currentNodeIndex; j < nextLevelNodes.length; j++) {
                    let nodeValueText = nextLevelNodes[j].textContent.trim();
                    
                    // Handle special cases for +∞ and -∞
                    if (nodeValueText === "+∞" || nodeValueText === "-∞") {
                        continue; // Skip non-numeric or special nodes
                    }
        
                    let nodeValue = parseInt(nodeValueText);
        
                    if (isNaN(nodeValue)) {
                        continue; // Skip non-numeric nodes
                    }
        
                    // Compare regular numeric values
                    if (nodeValue <= parseInt(prevNodeValue)) {
                        newIndex = j; // Update newIndex to the highest node <= prevNode
                    } else if (nodeValue > searchValue && !found) {
                        newIndex = Math.max(j - 1, 0); // Point to the correct node
                        found = true;
                        break;
                    }
                }
        
                // Highlight matching node in the current level before moving to the next
                setTimeout(() => {
                    // Highlight the matching node(s) in the current level
                    highlightMatchingNode(prevNodeValue, currentLevel);
        
                    // After a delay, move to the next level
                    setTimeout(() => {
                        currentNodeIndex = newIndex; // Set currentNodeIndex to the new index (could be unchanged for special values like +∞)
        
                        // Check if the previous node is +∞ or -∞, keep currentIndex and highlight corresponding nodes in the next level
                        if (prevNodeValue === "+∞" || prevNodeValue === "-∞") {
                            highlightMatchingNode(prevNodeValue, currentLevel);
                        }
        
                        // Draw a line from the previous node to the new node (optional)
                        drawLine(prevNode, nextLevelNodes[currentNodeIndex]);
        
                        // Continue searching at the next level
                        setTimeout(() => searchLevel(`level${currentLevel}`, searchValue), 1000);
                    }, 1000); // Delay before proceeding to the next level to show the highlights
                }, 1000); // Delay before highlighting in the current level
            } else {
                compareFinalLevel(); // If on level 0, handle the final comparison
            }
        }
        
        // Function to highlight matching nodes in the next level, including +∞ or -∞
        function highlightMatchingNode(valueToHighlight, nextLevel) {
            let nextLevelNodes = Array.from(document.getElementById(`level${nextLevel}`).getElementsByClassName('node'));
        
            nextLevelNodes.forEach(node => {
                let nodeValueText = node.textContent.trim();
        
                // Highlight if the node value matches the current node's value (including +∞ and -∞)
                if (nodeValueText === valueToHighlight) {
                    keepHighlightNode(node);
                }
            });
        }
        
        compareNodes(); // Start the comparison at the current level
    }

    function compareFinalLevel() {
        let nodes = document.getElementById('level0').getElementsByClassName('node');
        let i = currentNodeIndex;

        function compareNodes() {
            if (i < nodes.length) {
                highlightNode(nodes[i]); // Highlight node being compared
                let nodeValueText = nodes[i].textContent;
                let nodeValue = parseInt(nodeValueText);

                // Handle non-numeric node values (e.g., +∞ or -∞)
                if (isNaN(nodeValue)) {
                    console.log(`Level 0, Last currentNodeIndex: ${i}, Node Value: ${nodeValueText}`);
                    i++;
                    setTimeout(compareNodes, 1000); // Skip this node and continue
                    return;
                }

                // Condition 1: If value is found
                if (nodeValue === searchValue) {
                    setTimeout(() => {
                        alert(`Value ${searchValue} found on Level 0!`);
                    }, 800);
                    return;
                }

                // Condition 2: If the current node value is greater than the search value
                if (nodeValue > searchValue) {
                    console.log(`Level 0, Last currentNodeIndex: ${i - 1}, Node Value: ${nodes[Math.max(i - 1, 0)].textContent}`);
                    alert(`Value ${searchValue} not found. Stopped at node ${nodes[Math.max(i - 1, 0)].textContent} on Level 0.`);
                    return;
                }

                i++;
                setTimeout(compareNodes, 1000); // Delay between comparisons
            } else {
                console.log(`Level 0, Last currentNodeIndex: ${i - 1}, Node Value: ${nodes[Math.max(i - 1, 0)].textContent}`);
                alert(`Value ${searchValue} not found on Level 0. Reached the end of the list.`);
            }
        }

        compareNodes(); // Start the comparison at level 0
    }

    searchLevel(`level${currentLevel}`, searchValue); // Begin search at the top level
}


function toggleWithDelay() {
    let level1 = document.getElementById('level1');
    let level1Nodes = document.querySelectorAll('#level1 .node');
    let node3=document.querySelectorAll('#node3');
    let node5=document.querySelectorAll('#node5');
    let node6=document.querySelectorAll('#node6');
    let node8=document.querySelectorAll('#node8');
    let node9=document.querySelectorAll('#node9');
    let node10=document.querySelectorAll('#node10');
    let node11=document.querySelectorAll('#node11');
    let node16=document.querySelectorAll('#node16');
    let node5_2=document.querySelectorAll('#node5-2');
    let node8_2=document.querySelectorAll('#node8-2');
    let node10_2=document.querySelectorAll('#node10-2');
    let node16_2=document.querySelectorAll('#node16-2');
    let node8_3=document.querySelectorAll('#node8-3');
    let node16_3=document.querySelectorAll('#node16-3');
    let level2 = document.getElementById('level2');
    let level2Nodes = document.querySelectorAll('#level2 .node');
    let level3 = document.getElementById('level3');
    let level3Nodes = document.querySelectorAll('#level3 .node');
    console.log("Search value",typeof(searchValue),":",searchValue);
    // Toggle level 1 with no delay
    setTimeout(() => {
        level1.classList.toggle('visible');
        node3.forEach(node=>{
            node.classList.toggle('expand');
        })
        node5.forEach(node=>{
            node.classList.toggle('expand');
        })
        node6.forEach(node=>{
            node.classList.toggle('expand');
        })
        node8.forEach(node=>{
            node.classList.toggle('expand');
        })
        node9.forEach(node=>{
            node.classList.toggle('expand');
        })
        node10.forEach(node=>{
            node.classList.toggle('expand');
        })
        node11.forEach(node=>{
            node.classList.toggle('expand');
        })
        node16.forEach(node=>{
            node.classList.toggle('expand');
        })
        level1Nodes.forEach(node => {
            node.classList.toggle('high');
           
        })
        // Toggle level 2 with a delay of 1 second
        setTimeout(() => {
            level2.classList.toggle('visible');
            node5_2.forEach(node=>{
                node.classList.toggle('expand');
            })
            node8_2.forEach(node=>{
                node.classList.toggle('expand');
            })
            node10_2.forEach(node=>{
                node.classList.toggle('expand');
            })
            node16_2.forEach(node=>{
                node.classList.toggle('expand');
            })
            level2Nodes.forEach(node => {
                node.classList.toggle('high');
                
            });

            // Toggle level 3 with a delay of 2 seconds
            setTimeout(() => {
                level3.classList.toggle('visible');
                node8_3.forEach(node=>{
                    node.classList.toggle('expand');
                })
                node16_3.forEach(node=>{
                    node.classList.toggle('expand');
                })
                level3Nodes.forEach(node => {
                    node.classList.toggle('high');
                });

                // Additional delay before starting the search operation
                setTimeout(() => {
                    startSearch();
                }, 2000); // 2-second additional delay before calling startSearch

            }, 2000); // 2-second delay for the third level
        }, 1000); // 1-second delay for the second level
    }, 0); // No delay for the first level
}
