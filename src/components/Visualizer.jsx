import React, { Component } from 'react';
import { getBubbleSortAnimations } from '../algorithms/bubbleSort';
import { getInsertionSortAnimations } from '../algorithms/insertionSort';
import { getMergeSortAnimations } from '../algorithms/mergeSort';
import { getHeapSortAnimations } from '../algorithms/heapSort';
import { getQuickSortAnimations } from '../algorithms/quickSort';
import { getQuickSort3MedAnimations } from '../algorithms/quickSort3Med';
import './Visualizer.css';

export default class Visualizer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < 310; i++) {
            array.push(randomIntFromInterval(5, 730));
        }
        this.setState({ array });
    }

    disableSortButtons() {
        document.getElementById("mergeSort").disabled = true;
        let buttonStyle = document.getElementById("mergeSort").style;
        buttonStyle.cursor = "default";
        buttonStyle.background = "#000000";

        document.getElementById("quickSort").disabled = true;
        buttonStyle = document.getElementById("quickSort").style;
        buttonStyle.cursor = "default";
        buttonStyle.background = "#000000";

        document.getElementById("quickSort3Med").disabled = true;
        buttonStyle = document.getElementById("quickSort3Med").style;
        buttonStyle.cursor = "default";
        buttonStyle.background = "#000000";

        document.getElementById("insertionSort").disabled = true;
        buttonStyle = document.getElementById("insertionSort").style;
        buttonStyle.cursor = "default";
        buttonStyle.background = "#000000";

        document.getElementById("heapSort").disabled = true;
        buttonStyle = document.getElementById("heapSort").style;
        buttonStyle.cursor = "default";
        buttonStyle.background = "#000000";

        document.getElementById("bubbleSort").disabled = true;
        buttonStyle = document.getElementById("bubbleSort").style;
        buttonStyle.cursor = "default";
        buttonStyle.background = "#000000";

        document.getElementById("generateNewArray").disabled = true;
        buttonStyle = document.getElementById("generateNewArray").style;
        buttonStyle.cursor = "default";
        buttonStyle.background = "#000000"
    }

    enableSortButtons() {

        document.getElementById("mergeSort").disabled = false;
        let buttonStyle = document.getElementById("mergeSort").style;
        buttonStyle.background = "#151c23";
        buttonStyle.cursor = "pointer";

        document.getElementById("quickSort").disabled = false;
        buttonStyle = document.getElementById("quickSort").style;
        buttonStyle.background = "#151c23";
        buttonStyle.cursor = "pointer";

        document.getElementById("quickSort3Med").disabled = false;
        buttonStyle = document.getElementById("quickSort3Med").style;
        buttonStyle.background = "#151c23";
        buttonStyle.cursor = "pointer";

        document.getElementById("bubbleSort").disabled = false;
        buttonStyle = document.getElementById("bubbleSort").style;
        buttonStyle.background = "#151c23";
        buttonStyle.cursor = "pointer";

        document.getElementById("heapSort").disabled = false;
        buttonStyle = document.getElementById("heapSort").style;
        buttonStyle.background = "#151c23";
        buttonStyle.cursor = "pointer";

        document.getElementById("insertionSort").disabled = false;
        buttonStyle = document.getElementById("insertionSort").style;
        buttonStyle.background = "#151c23";
        buttonStyle.cursor = "pointer";

        document.getElementById("generateNewArray").disabled = false;
        buttonStyle = document.getElementById("generateNewArray").style;
        buttonStyle.background = "#151c23";
        buttonStyle.cursor = "pointer";
    }

    bubbleSort() {
        this.animate(getBubbleSortAnimations(this.state.array));
    }

    insertionSort() {
        this.animate(getInsertionSortAnimations(this.state.array));
    }

    heapSort() {
        this.animate(getHeapSortAnimations(this.state.array));
    }

    mergeSort() {
        this.animate(getMergeSortAnimations(this.state.array));
    }

    quickSort() {
        this.animate(getQuickSortAnimations(this.state.array));
    }

    quickSort3Med() {
        this.animate(getQuickSort3MedAnimations(this.state.array));
    }

    /* From: https://github.com/CSALS/Sorting-Visualizer/blob/master/src/SortingVisualizer/SortingVisualizer.js */
    animate(animationData) {
        this.disableSortButtons();
        const [animations, sorted] = animationData;
        console.log(JSON.stringify(animations));
        console.log(JSON.stringify(sorted));
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = animations[i][0] === 'comparison1' || animations[i][0] === 'comparison2';
            const arrayBars = document.getElementsByClassName('graph-bar');
            if (isColorChange === true) {
                const color = (animations[i][0] === 'comparison1') ? '#7f0000' : 'chocolate';
                const barOneIndex = animations[i][1];
                const barTwoIndex = animations[i][2];
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * 1);
            }
            else {
                const barIndex = animations[i][1];
                const newHeight = animations[i][2];
                const barStyle = arrayBars[barIndex].style;
                setTimeout(() => {
                    barStyle.height = `${newHeight}px`;
                }, i * 1);
            }
        }
        const RESTORE_TIME = parseInt(1.5 * animations.length / 2 + 3000);
        setTimeout(() => this.enableSortButtons(), RESTORE_TIME);
    }

    render() {

        const { array } = this.state;

        return (
            <div className="array-container">
                <h3 style={{ color: 'white' }}>Sorting algorithm Visualizer</h3>
                {array.map((value, index) => (
                    <div
                        className="graph-bar"
                        key={index}
                        style={{ height: `${value}px` }}></div>
                ))}
                <br></br>
                <div className="toolbar">
                    <button id="generateNewArray" onClick={() => this.resetArray()}>Generate New Array</button>
                    <button id="bubbleSort" onClick={() => this.bubbleSort()}>Bubble Sort</button>
                    <button id="insertionSort" onClick={() => this.insertionSort()}>Insertion Sort</button>
                    <button id="heapSort" onClick={() => this.heapSort()}>Heap Sort</button>
                    <button id="mergeSort" onClick={() => this.mergeSort()}>Merge Sort</button>
                    <button id="quickSort" onClick={() => this.quickSort()}>Quick Sort</button>
                    <button id="quickSort3Med" onClick={() => this.quickSort3Med()}>Quick Sort (3 Median Method)</button>
                </div>
            </div>
        );
    }
}

/* https://stackoverflow.com/a/7228322/5990108 */
function randomIntFromInterval(min, max) {

    return Math.floor(Math.random() * (max - min + 1) + min);
}