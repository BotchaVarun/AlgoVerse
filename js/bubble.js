let paused = false;
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const sortButton = document.getElementById('sortButton');
    const sortDescendingButton = document.getElementById('sortDescendingButton');
    const pauseButton = document.getElementById('pauseButton');
    const playButton = document.getElementById('playButton');
    const restartButton = document.getElementById('restartButton');
    const arrayInput = document.getElementById('array-input');
    var e1 = document.querySelector('.e1');
    var e2 = document.querySelector('.e2');
    var e3 = document.querySelector('.e3');
    var e4 = document.querySelector('.e4');
    var e5 = document.querySelector('.e5');    
    var e6 = document.querySelector('.e6');    
    var e7 = document.querySelector('.e7');    
    var e8 = document.querySelector('.e8');    
    var data = document.querySelector('.data');    
    let numbers = [];
  
    let resolvePause;
    let descending = false;
    let sortingCanceled = false;
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
    // Define initializeArray in the global scope
    window.initializeArray = function() {
        const inputValues = arrayInput.value.split(',').map(Number).filter(val => !isNaN(val));
    
        if (inputValues.length > 1) {
            // Clear current numbers and container
            container.innerHTML = '';
            numbers = [];
            e2.classList.add('show');
            e3.classList.remove('show');
            e4.classList.remove('show');
            e5.classList.remove('show');
            e6.classList.remove('show');
            e7.classList.remove('show');
            e8.classList.remove('show');
           // Assuming 'data' is a reference to an HTML element where you want to display the length
            data.innerHTML = `Array length is ${inputValues.length}`;

            // Create number elements based on user input
            inputValues.forEach((value, i) => {
                const numContainer = document.createElement('div');
                numContainer.classList.add('number');
                const numValue = document.createElement('div');
                numValue.textContent = value;
                numValue.dataset.value = value;
                numValue.classList.add('num-value');
                numContainer.appendChild(numValue);
    
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
            // If input is empty, generate random numbers
            console.log("Executed");
            createNumbers();
            
        }
    };
    

    function createNumbers() {
        container.innerHTML = '';
        numbers = [];
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
            data.innerHTML = `Array length is 10`;
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

    async function bubbleSort() {
        for (let i = 0; i < numbers.length - 1; i++) {
            for (let j = 0; j < numbers.length - i - 1; j++) {
                if (sortingCanceled) return;
                
                let currentValue = parseInt(numbers[j].firstChild.firstChild.dataset.value);
                let nextValue = parseInt(numbers[j + 1].firstChild.firstChild.dataset.value);
    
                console.log('Comparing:', currentValue, nextValue);
                console.log('Setting e4.innerHTML based on descending:', descending);

                if (!descending) {
                    e4.innerHTML = `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if A[j] > A[j+1]`;
                    console.log('Set e4.innerHTML for ascending');
                } else {
                    e4.innerHTML = `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if A[j] < A[j+1]`;
                    console.log('Set e4.innerHTML for descending');
                }
                
                // Highlight elements being compared
                numbers[j].firstChild.style.transform = 'translateY(-25px)';
                numbers[j + 1].firstChild.style.transform = 'translateY(-25px)';
                numbers[j].firstChild.style.backgroundColor = '#e67e22';
                numbers[j + 1].firstChild.style.backgroundColor = '#e74c3c';
    
                await sleep(speed);
                await checkPaused();
                var condition= descending? "less":"greater";

                // Swap elements based on the sorting direction
                if ((descending && currentValue < nextValue) || (!descending && currentValue > nextValue)) {
                    console.log('Swapping:', currentValue, nextValue);
                    await checkPaused();
                    data.innerHTML = `current value is ${condition} than next value, Swapping: ${currentValue} ${nextValue}`;
                    // Handle element visibility updates (ensure elements are correctly selected)
                    if (e2 && e3 && e4 && e5 && e6 && e7 && e8) {
                        e2.classList.remove('show');
                        e3.classList.remove('show');
                        e4.classList.add('show');
                        
                        e5.classList.add('show');
                        e6.classList.add('show');
                        e7.classList.remove('show');
                        e8.classList.remove('show');
                    } else {
                        console.error('One or more elements are missing.');
                    }
                    
                    // Perform the swap
                    container.insertBefore(numbers[j + 1], numbers[j]);
                    [numbers[j], numbers[j + 1]] = [numbers[j + 1], numbers[j]];
                    updateIndexes();
                } else {
                    await checkPaused();
                    console.log('Not Swapping:', currentValue, nextValue);
                    data.innerHTML = `condition fails, no Swapping: ${currentValue} ${nextValue}`;
                    
                    // Handle element visibility updates
                    if (e2 && e3 && e4 && e5 && e6 && e7 && e8) {
                        e2.classList.remove('show');
                        e3.classList.remove('show');
                        e4.classList.remove('show');
                        e5.classList.remove('show');
                        e6.classList.remove('show');
                        e7.classList.add('show');
                        e8.classList.add('show');
                    } else {
                        console.error('One or more elements are missing.');
                    }
                }
                
                // Reset styles after comparison
                numbers[j].firstChild.style.transform = 'translateY(0)';
                numbers[j + 1].firstChild.style.transform = 'translateY(0)';
                numbers[j].firstChild.style.backgroundColor = '#3498db';
                numbers[j + 1].firstChild.style.backgroundColor = '#3498db';
            }
    
            // Mark the end of the sorted section
            numbers[numbers.length - i - 1].firstChild.style.backgroundColor = '#2ecc71';
        }
    
        // Final color for the first element
        numbers[0].firstChild.style.backgroundColor = '#2ecc71';
    }
    

    function updateIndexes() {
        numbers.forEach((wrapper, index) => {
            wrapper.lastChild.textContent = index;
        });
    }

    sortButton.addEventListener('click', () => {
        descending = false;
        sortingCanceled = false;
        sortButton.disabled = true;
        sortDescendingButton.disabled = true;
        pauseButton.disabled = false;
        playButton.disabled = true;
        bubbleSort().then(() => {
            sortButton.disabled = false;
            sortDescendingButton.disabled = false;
            pauseButton.disabled = true;
            playButton.disabled = true;
        });
    });

    sortDescendingButton.addEventListener('click', () => {
        descending = true;
        sortingCanceled = false;
        sortButton.disabled = true;
        sortDescendingButton.disabled = true;
        pauseButton.disabled = false;
        playButton.disabled = true;
        bubbleSort().then(() => {
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
        resolvePause();
        pauseButton.disabled = false;
        playButton.disabled = true;
    });

    restartButton.addEventListener('click', () => {
        sortingCanceled = true;
        initializeArray();  // Initialize with user input or default array
        sortButton.disabled = false;
        sortDescendingButton.disabled = false;
        pauseButton.disabled = true;
        playButton.disabled = true;
    });

    createNumbers(); // Create the default numbers initially
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
            paused = false;
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