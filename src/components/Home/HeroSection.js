// HeroSection.js
import React from 'react';
import './HeroSection.css'; // Import custom styles (optional)

const HeroSection = () => {
    return (
        <section className="hero">
            <div className="hero-content">
                <h1>Hi! I'm <br /><big>Bryce</big></h1>
                <p>I’m an aspiring scientist with a deep background in mathematics and physics, dedicated to pushing the boundaries of deep learning in the natural sciences.</p>
            </div>
            <img src="/1igl.png" alt="Structure of a protein" className="hero-image" /> {/* Use the public URL */}
        </section>
    );
};

export default HeroSection;
