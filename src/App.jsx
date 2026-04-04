import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { AboutUs } from './pages/AboutUs';
import { EventsPage } from './pages/EventsPage';

function App() {
    return (
        <Router>
            <div className="min-h-screen flex flex-col font-sans text-white">
                <Navbar />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/events" element={<EventsPage />} />
                </Routes>

                <Footer />
            </div>
        </Router>
    );
}

export default App;
