import React, { useEffect, useRef } from 'react';
import Plot from 'react-plotly.js';
import DoublePendulumPhysics from './DoublePendulumPhysics';

const DoublePendulum = () => {
    const physicsRef = useRef(new DoublePendulumPhysics(1, 1, 1, 1, 9.81)); // Initialize physics
    const [positions, setPositions] = React.useState({ x1: 0, y1: 0, x2: 0, y2: 0 });
    const [trail, setTrail] = React.useState([]); // To store the trail of the second pendulum
    const [phaseSpace, setPhaseSpace] = React.useState({ omega1: [], omega2: [] }); // Velocity space data

    useEffect(() => {
        const updatePositions = () => {
            physicsRef.current.update(); // Update the physics simulation
            const { x1, y1, x2, y2 } = physicsRef.current.getPositions(); // Get positions
            const { angularVelocity1, angularVelocity2 } = physicsRef.current.getAngularVelocities(); // Get angular velocities
            // console.log(angularVelocity1)
            setPositions({ x1, y1, x2, y2 });

            // Update the trail for the second pendulum
            setTrail((prevTrail) => {
                const newTrail = [...prevTrail, { x: x2, y: y2 }];
                // Limit the length of the trail
                if (newTrail.length > 200) newTrail.shift(); // Keep the trail length to 200 points
                return newTrail;
            });

            // Update phase space data with angular velocities
            setPhaseSpace(prevPhaseSpace => {
                const updatedOmega1 = [...prevPhaseSpace.omega1, angularVelocity1];
                const updatedOmega2 = [...prevPhaseSpace.omega2, angularVelocity2];

                // Limit the length of the phase space arrays
                if (updatedOmega1.length > 500) updatedOmega1.shift();
                if (updatedOmega2.length > 500) updatedOmega2.shift();

                return { omega1: updatedOmega1, omega2: updatedOmega2 };
            });

            requestAnimationFrame(updatePositions); // Schedule next update
        };

        requestAnimationFrame(updatePositions); // Start the animation loop
    }, []);

    return (
        <div style={{
            backgroundColor: 'transparent',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        }}>
            <div style={{ width: '500px', height: '500px' }}>
                <h2 style={{ textAlign: 'center' }}>Double Pendulum Simulation</h2>
                <Plot
                    data={[
                        {
                            x: [0, positions.x1, positions.x2], // X positions of the pendulum
                            y: [0, positions.y1, positions.y2], // Y positions of the pendulum
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: { size: 15, color: 'red' }, // Increased ball size
                            line: { color: 'blue', width: 5 }, // Stick color and width
                        },
                        {
                            x: trail.map(point => point.x), // X positions of the trail
                            y: trail.map(point => point.y), // Y positions of the trail
                            type: 'scatter',
                            mode: 'lines',
                            line: { color: 'rgba(0, 0, 255, 0.5)', width: 2 }, // Faded trail color
                        },
                    ]}
                    layout={{
                        width: 500,
                        height: 500,
                        title: '',
                        xaxis: { range: [-2, 2], zeroline: false, showgrid: false, showticklabels: false },
                        yaxis: { range: [-2, 2], zeroline: false, showgrid: false, showticklabels: false },
                        margin: { t: 40, b: 40, l: 0, r: 0 }, // Reduce margins
                        paper_bgcolor: 'transparent', // Make background transparent
                        plot_bgcolor: 'transparent', // Make plot background transparent
                        showlegend: false, // Remove legend
                    }}
                    config={{ displayModeBar: false }} // Hide mode bar
                />
            </div>

            <div style={{ width: '500px', height: '500px', marginLeft: '20px' }}>
                <h2 style={{ textAlign: 'center' }}>Velocity Space Diagram</h2>
                <Plot
                    data={[
                        {
                            x: phaseSpace.omega1, // Angular velocity of pendulum 1
                            y: phaseSpace.omega2, // Angular velocity of pendulum 2
                            type: 'scatter',
                            mode: 'lines',
                            line: { color: 'green' },
                        },
                    ]}
                    layout={{
                        width: 500,
                        height: 500,
                        title: '',
                        xaxis: { range: [-12, 12], title: 'Omega1 (rad/s)', zeroline: false, showgrid: false },
                        yaxis: { range: [-12, 12], title: 'Omega2 (rad/s)', zeroline: false, showgrid: false },
                        margin: { t: 40, b: 40, l: 40, r: 40 }, // Reduce margins
                        paper_bgcolor: 'white', // Set background to white
                        plot_bgcolor: 'white', // Set plot background to white
                        showlegend: false, // Remove legend
                    }}
                    config={{ displayModeBar: false }} // Hide mode bar
                />
            </div>
        </div>
    );
};

export default DoublePendulum;
