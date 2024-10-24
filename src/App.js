import './App.css';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Intro from './components/Intro';


function App() {
    return (
        <div className="App">
            <Header />
            <div className="content">
                <HeroSection />
                <Intro />
            </div>
        </div>
    );
}

export default App;
