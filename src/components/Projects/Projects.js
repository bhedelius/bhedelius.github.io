import React from 'react';
import './Projects.css';
import DoublePendulum from './DoublePendulum';
import KirchhoffLovePlate from './KirchhoffLovePlate';

const Projects = () => {
    return (
        <div className="Projects">
            <KirchhoffLovePlate />
            <DoublePendulum />
        </div>
    );
};

export default Projects;
