document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const sortButton = document.getElementById('sortButton');
    const sortDescendingButton = document.getElementById('sortDescendingButton');
    const pauseButton = document.getElementById('pauseButton');
    const playButton = document.getElementById('playButton');
    const restartButton = document.getElementById('restartButton');
    const arrayInput = document.getElementById('array-input'); // Reference to the array input element
    let numbers = [];
    let paused = false;
    let resolvePause;
    let descending = false;
    let sortingCanceled = false; // Flag to cancel sorting
    var e1 = document.querySelector('.e1');
    var e2 = document.querySelector('.e2');
    var e3 = document.querySelector('.e3');
    var e4 = document.querySelector('.e4');
    var e5 = document.querySelector('.e5');    
    var e6 = document.querySelector('.e6');    
    var e7 = document.querySelector('.e7');    
    var e8 = document.querySelector('.e8');    
    var e9 = document.querySelector('.e9');    
    var info = document.querySelector('.data');
    let speed = 2000; // Default speed
    const speedInput = document.getElementById("speed");
    
    // Update speed based on input value
    speedInput.addEventListener("input", function() {
        switch(speedInput.value) {
            case '0':
                speed = 1500;
                break;
            case '1':
                speed = 1000;
                break;
            case '2':
                speed = 800;
                break;
            case '3':
                speed = 500;
                break;
            default:
                speed = 2000; // Default if out of range
        }
        console.log(speed);
    });
    window.initializeArray = function() {
        console.log('Initializing array...');
        const inputValues = arrayInput.value.split(',').map(Number).filter(val => !isNaN(val));
        
        console.log('Parsed input values:', inputValues);
        
        if (inputValues.length > 1) {
            // Clear current numbers and container
            container.innerHTML = '';
            numbers = [];
            
      
            // Create number elements based on user input
            inputValues.forEach((value, i) => {
                const numContainer = document.createElement('div');
                numContainer.classList.add('number');
                const numValue = document.createElement('div');
                numValue.textContent = value;
                numValue.dataset.value = value;
                numValue.classList.add('num-value');
                numContainer.appendChild(numValue);
                e2.classList.add('show');
                e3.classList.remove('show');
                e4.classList.remove('show');
                e5.classList.remove('show');
                e6.classList.remove('show');
                e7.classList.remove('show');
                e8.classList.remove('show');
                e9.classList.remove('show');
                info.innerHTML = `Array length is ${inputValues.length}`;
                const numIndex = document.createElement('div');
                numIndex.textContent = i;
                numIndex.classList.add('index');
                const wrapper = document.createElement('div');
                wrapper.classList.add('wrapper');
                wrapper.appendChild(numContainer);
                wrapper.appendChild(numIndex);

                numbers.push(wrapper);
                container.appendChild(wrapper);
            });
        } else {
            console.log("No valid input values found. Creating random numbers...");
            createNumbers();
        }
    };
    function createNumbers() {
        container.innerHTML = '';
        numbers = [];
        console.log("called");
        for (let i = 0; i < 10; i++) {
            const numContainer = document.createElement('div');
            numContainer.classList.add('number');
            const value = Math.floor(Math.random() * 100);
            const numValue = document.createElement('div');
            numValue.textContent = value;
            numValue.dataset.value = value;
            numValue.classList.add('num-value');
            numContainer.appendChild(numValue);
            e2.classList.add('show');
            e3.classList.remove('show');
            e4.classList.remove('show');
            e5.classList.remove('show');
            e6.classList.remove('show');
            e7.classList.remove('show');
            e8.classList.remove('show');
            e9.classList.remove('show');
            info.innerHTML = `Array length is 10`;
            const numIndex = document.createElement('div');
            numIndex.textContent = i;
            numIndex.classList.add('index');

            const wrapper = document.createElement('div');
            wrapper.classList.add('wrapper');
            wrapper.appendChild(numContainer);
            wrapper.appendChild(numIndex);

            numbers.push(wrapper);
            container.appendChild(wrapper);
        }
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function checkPaused() {
        if (paused) {
            return new Promise(resolve => {
                resolvePause = resolve;
            });
        }
        return Promise.resolve();
    }

    async function selectionSort() {
        if (sortingCanceled) return;
        let minValue;
        let condition = descending ? "greater" : "less";
        let val =  descending ? "max" : "min";
        if (!descending) {
            e4.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; minIndex = i"
            e6.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;   if array[j] < array[minIndex] then";
            e7.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; minIndex = j";
            e8.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if minIndex != i then";
            e9.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; swap array[i] with array[minIndex]";
            console.log("Ascending");
        } else {
            e4.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; maxIndex = i"
            e6.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;   if array[j] > array[maxIndex] then";
            e7.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; maxIndex = j";
            e8.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if maxIndex != i then";
            e9.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; swap array[i] with array[maxIndex]";
            console.log("Descending");
        }
        console.log("called");
        // Exit if sorting was canceled
        e2.classList.remove('show');
        e3.classList.remove('show');
        e4.classList.remove('show');
        e5.classList.remove('show');
        e6.classList.remove('show');
        e7.classList.remove('show');
        e8.classList.remove('show');
        e9.classList.remove('show');
        for (let i = 0; i < numbers.length - 1; i++) {
            let extremeIndex = i;
            numbers[i].firstChild.style.backgroundColor = '#e74c3c'; // Highlight current position
            if (e2 && e3 && e4 && e5 && e6 && e7 && e8 && e9) {
                e2.classList.remove('show');
                e3.classList.remove('show');
                e4.classList.add('show');
                e5.classList.add('show');
                e6.classList.add('show');
                e7.classList.add('show');
                e8.classList.remove('show');
                e9.classList.remove('show');
                info.innerHTML = `${val}imum index is ${extremeIndex}`;
            } else {
                console.error('One or more elements are missing.');
            }
            for (let j = i + 1; j < numbers.length; j++) {
                if (sortingCanceled) return; // Exit if sorting was canceled
                if (e2 && e3 && e4 && e5 && e6 && e7 && e8 && e9) {
                    e2.classList.remove('show');
                    e3.classList.remove('show');
                    e4.classList.remove('show');
                    e5.classList.add('show');
                    e6.classList.add('show');
                    e7.classList.add('show');
                    e8.classList.remove('show');
                    e9.classList.remove('show');
                    
                } else {
                    console.error('One or more elements are missing.');
                }
                numbers[j].firstChild.style.backgroundColor = '#e67e22'; // Highlight the compared element
    
                await sleep(speed);
                await checkPaused();
    
                const currentValue = parseInt(numbers[j].firstChild.firstChild.dataset.value);
                const extremeValue = parseInt(numbers[extremeIndex].firstChild.firstChild.dataset.value);
                if ((descending ? currentValue > extremeValue : currentValue < extremeValue)) {
                    if (e2 && e3 && e4 && e5 && e6 && e7 && e8 && e9) {
                        e2.classList.remove('show');
                        e3.classList.remove('show');
                        e4.classList.remove('show');
                        e5.classList.remove('show');
                        e6.classList.add('show');
                        e7.classList.add('show');
                        e8.classList.remove('show');
                        e9.classList.remove('show');
                        
                    } else {
                        console.error('One or more elements are missing.');
                    }
                    extremeIndex = j;
                    minValue = parseInt(numbers[extremeIndex].firstChild.firstChild.dataset.value);
                    info.innerHTML =`now ${val}imum value is ${minValue}`;
                }
                
                numbers[j].firstChild.style.backgroundColor = ''; // Reset color for the compared element
            }
    
            if (extremeIndex !== i) {
                let currentValue = parseInt(numbers[i].firstChild.firstChild.dataset.value);
                
                if (e2 && e3 && e4 && e5 && e6 && e7 && e8 && e9) {
                    e2.classList.remove('show');
                    e3.classList.remove('show');
                    e4.classList.remove('show');
                    e5.classList.remove('show');
                    e6.classList.remove('show');
                    e7.classList.remove('show');
                    e8.classList.add('show');
                    e9.classList.add('show');
                    info.innerHTML = `Current value is ${minValue} ${condition} than ${val}imum value, Swapping: ${currentValue}`;
                } else {
                    console.error('One or more elements are missing.');
                }
                numbers[i].firstChild.style.backgroundColor = '#2ecc71'; // Highlight the elements to be swapped
                numbers[extremeIndex].firstChild.style.backgroundColor = '#2ecc71';
    
                await swapContainers(numbers[i].firstChild, numbers[extremeIndex].firstChild);
    
                await sleep(speed);
    
                // Reset the color after swapping
                numbers[i].firstChild.style.backgroundColor = '';
                numbers[extremeIndex].firstChild.style.backgroundColor = '';
            } else {
                // Reset color for the element if no swap was made
                numbers[i].firstChild.style.backgroundColor = '';
            }
        }
    
        numbers[numbers.length - 1].firstChild.style.backgroundColor = ''; // Reset color for the last element
    
        // Highlight all elements after sorting
        for (let k = 0; k < numbers.length; k++) {
            numbers[k].firstChild.style.backgroundColor = '#2ecc71'; // Green color indicates sorted
        }
    }
    

    async function swapContainers(containerA, containerB) {
        // Set up the initial styles for animation
        containerA.style.transition = `transform ${speed / 1000}s ease`;
        containerB.style.transition = `transform ${speed / 1000}s ease`;
    
        // Apply the transform to move the elements up
        containerA.style.transform = 'translateY(-15px)';
        containerB.style.transform = 'translateY(-15px)';
    
        // Wait for the transform animation to complete
        await sleep(speed / 2);
        await checkPaused();
        if (sortingCanceled) return; // Exit if sorting was canceled
    
        // Swap the inner HTML content
        const tempHTML = containerA.innerHTML;
        containerA.innerHTML = containerB.innerHTML;
        containerB.innerHTML = tempHTML;
    
        // Reset the transform property to move them back to the original position
        containerA.style.transform = 'translateY(0)';
        containerB.style.transform = 'translateY(0)';
    
        // Wait for the reset animation to complete
        await sleep(speed / 2);
    }
    
    sortButton.addEventListener('click', () => {
        console.log("calledA");
       
       
        descending = false;
        paused = false; // Reset paused state
        sortButton.disabled = true;
        sortDescendingButton.disabled = true;
        pauseButton.disabled = false;
        playButton.disabled = true;
        sortingCanceled = false; // Reset cancel flag
      
        selectionSort().then(() => {
            sortButton.disabled = false;
            sortDescendingButton.disabled = false;
            pauseButton.disabled = true;
            playButton.disabled = true;
        });
    });
    
    sortDescendingButton.addEventListener('click', () => {
        console.log("calledD");
      
       
        descending = true;
        paused = false; // Reset paused state
        sortButton.disabled = true;
        sortDescendingButton.disabled = true;
        pauseButton.disabled = false;
        playButton.disabled = true;
    
        sortingCanceled = false; // Reset cancel flag
        selectionSort().then(() => {
            sortButton.disabled = false;
            sortDescendingButton.disabled = false;
            pauseButton.disabled = true;
            playButton.disabled = true;
        });
    });
    

    pauseButton.addEventListener('click', () => {
        paused = true;
        pauseButton.disabled = true;
        playButton.disabled = false;
    });

    playButton.addEventListener('click', () => {
        paused = false;
        if (resolvePause) {
            resolvePause();
        }
        pauseButton.disabled = false;
        playButton.disabled = true;
    });

    restartButton.addEventListener('click', () => {
        sortingCanceled = true; // Cancel ongoing sorting
        paused = false; // Reset paused state
    
        // Clear existing numbers and initialize the array

        
        initializeArray();  // Initialize with user input or default array
        // Ensure buttons are enabled or disabled appropriately
        sortButton.disabled = false;
        sortDescendingButton.disabled = false;
        pauseButton.disabled = true;
        playButton.disabled = true;
    
        // Optionally, you can also reset other states or UI elements if needed
    });
    

    createNumbers();
});


/* arrow animation */

function showarrow1() {
    var arrow1 = document.querySelector('.arrow1 i');
    var menu1 = document.querySelector('.menu1');
    
    arrow1.classList.toggle('rotate'); // Rotate the arrow
    menu1.classList.toggle('expand'); // Expand or collapse the menu
    
    // Optional: Add responsive behavior
    if (window.innerWidth < 768) { // For mobile or small screens
        menu1.style.width = '100px'; // Example width for small screens
    } else {
        menu1.style.width = ''; // Reset to default width for larger screens
    }
}

// Add event listener for window resize to handle responsive behavior
window.addEventListener('resize', showarrow1);

function showarrow2() {
    var arrow2 = document.querySelector('.arrow2 i');
    var menu2 = document.querySelector('.menu2');
    var menu2Info = document.querySelector('.menu2-info');

    // Toggle the rotation of the arrow
    arrow2.classList.toggle('rotate');

    // Toggle the expansion of the menu2 and menu2-info
    menu2.classList.toggle('expand');
    menu2Info.classList.toggle('expand');

    // Optional: Add responsive behavior
    if (window.innerWidth < 768) { // For mobile or small screens
        menu2.style.width = '100px'; // Example width for small screens
    } else {
        menu2.style.width = ''; // Reset to default width for larger screens
    }
}

window.addEventListener('resize', showarrow2);


window.addEventListener('resize', showarrow2);



/*  buttons to start */
document.querySelectorAll('.btn1-startasc').forEach(function(startButtonAsc) {
    startButtonAsc.addEventListener('click', function() {
        console.log("Start Ascending button clicked");

        document.querySelectorAll('.btn1-re-start').forEach(function(restartButton) {
            restartButton.classList.remove('none'); // Show the Re-Start button
            console.log("Re-Start button shown");
        });
        startButtonAsc.classList.add('none'); // Hide the Start Ascending button
        
        document.querySelectorAll('.btn1-startdsc').forEach(function(startButtonDsc) {
            startButtonDsc.classList.add('none'); // Hide the Start Descending button
        });

        console.log("Start Ascending and Start Descending buttons hidden");
    });
});

document.querySelectorAll('.btn1-startdsc').forEach(function(startButtonDsc) {
    startButtonDsc.addEventListener('click', function() {
        console.log("Start Descending button clicked");

        document.querySelectorAll('.btn1-re-start').forEach(function(restartButton) {
            restartButton.classList.remove('none'); // Show the Re-Start button
            console.log("Re-Start button shown");
        });
        startButtonDsc.classList.add('none'); // Hide the Start Descending button
        
        document.querySelectorAll('.btn1-startasc').forEach(function(startButtonAsc) {
            startButtonAsc.classList.add('none'); // Hide the Start Ascending button
        });

        console.log("Start Descending and Start Ascending buttons hidden");
    });
});
document.querySelectorAll('.btn1-re-start').forEach(function(startButton) {
    startButton.addEventListener('click', function() {
        console.log("Start button clicked");
  
        document.querySelectorAll('.btn1-startasc').forEach(function(restartButton) {
            restartButton.classList.remove('none'); // Show the Re-Start button
            console.log("Re-Start button shown");
        });
        document.querySelectorAll('.btn1-startdsc').forEach(function(restartButton) {
            restartButton.classList.remove('none'); // Show the Re-Start button
            console.log("Re-Start button shown");
        });
        document.querySelectorAll('.btn2-resume').forEach(function(restartButton) {
            restartButton.classList.add('none'); // Show the Re-Start button
            console.log("Re-Start button shown");
        });
         document.querySelectorAll('.btn2-pause').forEach(function(restartButton) {
            restartButton.classList.remove('none'); // Show the Re-Start button
            console.log("Re-Start button shown");
        });
        startButton.classList.add('none'); // Hide the Start button
        console.log("Start button hidden");
    });
  });

document.querySelectorAll('.btn2-pause').forEach(function(startButton) {
    startButton.addEventListener('click', function() {
        console.log("Start button clicked");

        document.querySelectorAll('.btn2-resume').forEach(function(restartButton) {
            restartButton.classList.remove('none'); // Show the Re-Start button
            console.log("Re-Start button shown");
        });

        startButton.classList.add('none'); // Hide the Start button
        console.log("Start button hidden");
    });
});
document.querySelectorAll('.btn2-resume').forEach(function(startButton) {
    startButton.addEventListener('click', function() {
        console.log("Start button clicked");

        document.querySelectorAll('.btn2-pause').forEach(function(restartButton) {
            restartButton.classList.remove('none'); // Show the Re-Start button
            console.log("Re-Start button shown");
        });

        startButton.classList.add('none'); // Hide the Start button
        console.log("Start button hidden");
    });
});
function toggle() {
    var menu = document.querySelector('.prompt-menu');
    menu.classList.toggle('visible');
    console.log('Menu toggled'); // Debugging log
}
/* full screen */
function fullscreen() {
    const theoryContainer = document.getElementById('Visualization');
    const controls = document.querySelector('.prompt');
    
    theoryContainer.classList.add('fullscreen-active');
  
    // Move controls into the Theory container
    theoryContainer.appendChild(controls);
  }
  
  function normalscreen() {
    const theoryContainer = document.getElementById('Visualization');
    const controls = document.querySelector('.controls');
    
    theoryContainer.classList.remove('fullscreen-active');
  
    // Move controls back to the original location
    document.querySelector('.content').appendChild(controls);
  }