// ScrollToTopButton.js
import React, { useState, useEffect } from 'react';
import ScrollReveal from 'scrollreveal';
import '../styling/ToTop.scss'

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 400) {
                setIsVisible(true);
                ScrollReveal().reveal('#btn-anime', { delay: 400 });
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    // Scroll to the top of the page
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Optional smooth scrolling animation
        });
    };

    return (
        <div>
            {isVisible && (
                <button onClick={scrollToTop} className="topBtn" id='btn-anime'>
                    <span className='icon'>&#8679;</span>
                </button>
            )}
        </div>
    );
};

export default ScrollToTopButton;
