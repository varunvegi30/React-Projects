import React from 'react'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SortingVisualizer.css'
import * as SortingAlgorithms from '../sortingAlgorithms/sortingAlgorithms.js';

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';
// The alternate color
const SECONDARY_COLOR = 'red';

// Number of elements
const ARRAY_SIZE = 310;

// Animation speed in milli seconds
const ANIMATION_SPEED = 1;


export default class SortingVisualizer extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            array : [],
        };
    }
    
    // Whenever component is mounted --> We run this function
    componentDidMount(){
        this.resetArray();
    }

    resetArray(){
        const array = []
        // Create random array of size 100 with values between 5-1000
        for (let i=0; i<ARRAY_SIZE;i++){
            var value = randomIntFromIntervals(5,1000);
            array.push(value);
        }
        // Set state of the array!
        this.setState({array});
    }

    mergeSort(){
        const output = SortingAlgorithms.mergeSortAnimations(this.state.array);
        var animations = output.animations;

        for (let i=0;i<animations.length;i++){
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i%3!==2;
            if (isColorChange){
                const [barOneIdx,barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(()=> {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                },i*ANIMATION_SPEED);
            }else{
                setTimeout(()=> {
                    const [barOneIdx,newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;    
                },i*ANIMATION_SPEED);
            }
        }
        return;
    }


    testSortingAlgorithms(){
        for (let i=0;i<100;i++){
            const array = [];
            var bound = randomIntFromIntervals(5,1000);
            for (let i=0; i<bound;i++){
                var value = randomIntFromIntervals(5,1000);
                array.push(value);
            }
            const javaScriptSorted = this.state.array
            .slice()
            .sort((a,b)=>a-b);
            var output = SortingAlgorithms.mergeSortAnimations(this.state.array);
            const sortedArray = output.sortedResult;
            console.log(arraysAreEqual(javaScriptSorted,sortedArray));
        }
    }

    quickSort(){
        return;
    }

    heapSort(){
        return;
    }

    bubbleSort(){
        return;
    }


    render(){
        const {array} = this.state;

        return (
            <div className='array-container'>
                <Button  className='buttons' onClick={()=>this.resetArray()}>Generate New Array</Button>{' '}
                <Button className='buttons' onClick={()=>this.mergeSort()}>Merge Sort</Button>
                <Button className='buttons' onClick={()=>this.quickSort()}>Quick Sort</Button>
                <Button className='buttons' onClick={()=>this.heapSort()}>Heap Sort</Button>
                <Button className='buttons' onClick={()=>this.bubbleSort()}>Bubble Sort</Button>
                <Button className='buttons' onClick={()=>this.testSortingAlgorithms()}>Test Algorithms</Button>
                <br></br>
                <br></br>
                {array.map((value,idx)=>(
                    // If you don't put a key value in the div --> you get an error in the console
                    <div
                className="array-bar"
                key={idx}
                style={{
                backgroundColor: PRIMARY_COLOR,
                height: `${value}px`,
                }}></div>
                    
                ))}            
            </div>
            
        );
    }
}

function arraysAreEqual(arrayOne,arrayTwo){
    if (arrayOne.length!==arrayTwo.length) return false;
    for (let i=0;i<arrayOne.length;i++){
        if (arrayOne[i]!==arrayTwo[i]) return false;
    }
    return true;
}

// A function to return a value between max and min(closed interval)
function randomIntFromIntervals(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}