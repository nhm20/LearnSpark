// ReviewTicker.js
import React, { useRef, useEffect } from "react";
import "./ReviewTicker.css";

// Import profile images
import profile1 from './assets/profile1.png';
import profile2 from './assets/profile2.png';
import profile3 from './assets/profile3.png';
import profile4 from './assets/profile4.png';
import profile5 from './assets/profile5.png';

const ReviewTicker = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Mathematics Student",
      text: "LearnLink transformed how I understand calculus. My mentor broke down complex concepts into simple, digestible lessons.",
      rating: 5,
      photo: profile1
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Biology Student",
      text: "The interactive classes helped me ace my exams. The 1-on-1 attention made all the difference!",
      rating: 5,
      photo: profile2
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "English Student",
      text: "My writing improved dramatically after just a few sessions. The personalized feedback was invaluable.",
      rating: 4,
      photo: profile3
    },
    {
      id: 4,
      name: "David Wilson",
      role: "Computer Science Student",
      text: "The course selection is impressive and the mentors are truly experts in their fields.",
      rating: 5,
      photo: profile4
    },
    {
      id: 5,
      name: "Priya Patel",
      role: "Chemistry Student",
      text: "I was struggling with organic chemistry until I found the perfect mentor on LearnLink.",
      rating: 5,
      photo: profile5
    }
  ];

  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const clonedTestimonials = [...testimonials, ...testimonials];
    track.innerHTML = '';
    
    clonedTestimonials.forEach((testimonial) => {
      const reviewCard = document.createElement('div');
      reviewCard.className = 'review-card';
      reviewCard.innerHTML = `
        <div class="review-content">
          <div class="review-header">
            <div class="reviewer-photo">
              <img src="${testimonial.photo}" alt="${testimonial.name}" />
            </div>
            <div class="reviewer-meta">
              <h4 class="reviewer-name">${testimonial.name}</h4>
              <p class="reviewer-role">${testimonial.role}</p>
              <div class="stars">${'★'.repeat(testimonial.rating)}</div>
            </div>
          </div>
          <p class="review-text">"${testimonial.text}"</p>
        </div>
      `;
      track.appendChild(reviewCard);
    });

    let animationFrame;
    let speed = 1;
    let position = 0;
    const cardWidth = 320;

    const animate = () => {
      position -= speed;
      if (position <= -cardWidth * testimonials.length) {
        position = 0;
      }
      track.style.transform = `translateX(${position}px)`;
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    const container = track.parentElement;
    container.addEventListener('mouseenter', () => speed = 0);
    container.addEventListener('mouseleave', () => speed = 1);

    return () => {
      cancelAnimationFrame(animationFrame);
      container.removeEventListener('mouseenter', () => speed = 0);
      container.removeEventListener('mouseleave', () => speed = 1);
    };
  }, [testimonials]);

  return (
    <div className="review-ticker-container">
      <div className="review-track" ref={trackRef}></div>
    </div>
  );
};

export default ReviewTicker;