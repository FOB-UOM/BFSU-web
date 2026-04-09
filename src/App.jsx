import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { AboutUs } from './pages/AboutUs';
import { NewsPage } from './pages/NewsPage';
import { SingleNewsPage } from './pages/SingleNewsPage';
import { EventsPage } from './pages/EventsPage';
import { SingleEventPage } from './pages/SingleEventPage';

function App() {
    return (
        <Router>
            <div className="min-h-screen flex flex-col font-sans text-white">
                <Navbar />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/news" element={<NewsPage />} />
                    <Route path="/news/:slug" element={<SingleNewsPage />} />
                    <Route path="/events" element={<EventsPage />} />
                    <Route path="/events/:slug" element={<SingleEventPage />} />
                </Routes>

                <Footer />
            </div>
        </Router>
    );
}

export default App;
