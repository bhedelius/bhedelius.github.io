import React from 'react';
import './Intro.css'; // Optional: create a CSS file for styling

const About = () => {
    return (
        <div className="about">
            <p>
                I am a researcher with an MS in Physics and a BS in Math and Physics from Brigham Young University, where I also minored in Chemistry and Computer Science. My research focuses on using AI to address challenges in chemistry and drug discovery.
            </p>
            <p>
                Currently, I work as a junior data scientist at ZONTAL, where I develop data pipelines, create visualizations of chemistry data, and deploy pipelines and applications to AWS using Docker and Kubernetes.
            </p>
            <p>
                During my master's degree, I worked on creating interatomic potentials based on equivariant neural networks and taught computational physics courses.
            </p>
            <p>
                I specialize in deep learning algorithms with a strong proficiency in PyTorch, leveraging my background in mathematics and physics to tackle complex problems in my field.
            </p>
        </div>
    );
};

export default About;
