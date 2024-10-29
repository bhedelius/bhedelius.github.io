import React, { useEffect, useState, useRef } from 'react';
import Plot from 'react-plotly.js';
import './KirchhoffLovePlate.css';
import KirchhoffLovePlatePhysics from "./KirchhoffLovePlatePhysics";

const KirchhoffLovePlate = () => {
    const size = 31; // Set the size for the plate
    const plateAnimation = useRef(null); // Reference to the KirchhoffLovePlatePhysics instance
    const [plotData, setPlotData] = useState([]); // State to hold plot data
    const [plotLayout, setPlotLayout] = useState({}); // State to hold plot layout
    const [uArray, setUArray] = useState([]); // State to hold the u array from the physics simulation

    // Function to initialize the plot
    const initializePlot = (size) => {
        const data = [{
            z: Array(size).fill(0).map(() => Array(size).fill(0)),
            type: 'surface',
            colorscale: 'Viridis',
            showscale: false,
            contours: {
                z: {
                    show: true,
                    usecolormap: false,
                    highlight: true,
                    color: 'black',
                    width: 1,
                    values: [0],
                    size: 100,
                }
            }
        }];

        const zmax = 0.02;
        const layout = {
            title: `Kirchhoff-Love Plate Animation t=0`,
            scene: {
                xaxis: { visible: false, showgrid: false, showticklabels: false },
                yaxis: { visible: false, showgrid: false, showticklabels: false },
                zaxis: { visible: false, showgrid: false, showticklabels: false, range: [-zmax, zmax] },
            },
            camera: {
                eye: { x: 1.5, y: 1.5, z: 1.5 },
            },
            width: 600,
            height: 600,
            margin: { l: 0, r: 0, t: 40, b: 0 }, // Adjust margins to reduce whitespace
        };

        setPlotData(data);
        setPlotLayout(layout);
    };

    // Function to start the animation
    const startAnimation = (plate) => {
        const interval = setInterval(() => {
            plate.step();
            plate.u.array().then(array => setUArray(array)); // Update uArray with the latest values
        }, plate.dt * 1000); // Convert dt to milliseconds for the interval

        return interval; // Return interval ID for cleanup
    };

    // Initialize the physics engine and plot on mount
    useEffect(() => {
        plateAnimation.current = new KirchhoffLovePlatePhysics(size); // Initialize the physics engine
        initializePlot(size); // Initialize the plot with data and layout

        const animationInterval = startAnimation(plateAnimation.current); // Start the animation

        return () => clearInterval(animationInterval); // Cleanup interval on unmount
    }, [size]);

    // Update the plot whenever uArray changes
    useEffect(() => {
        if (uArray.length > 0) {
            console.log("uArray:", uArray); // Log the uArray to debug
            setPlotData(prevData => [{ ...prevData[0], z: [uArray] }]); // Update the z values
            setPlotLayout(prevLayout => ({
                ...prevLayout,
                title: 'Kirchhoff-Love Plate Animation'
            }));
        }
    }, [uArray]);

    return (
        <div>
            <h1>Kirchhoff-Love Plate Simulation</h1>
            <Plot
                data={plotData}
                layout={plotLayout}
                config={{
                    scrollZoom: false,
                    displayModeBar: false,
                }}
            />
        </div>
    );
};

export default KirchhoffLovePlate;
