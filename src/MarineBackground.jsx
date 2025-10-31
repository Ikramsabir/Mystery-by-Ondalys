import React from 'react';
import './MarineBackground.css';

const MarineBackground = () => {
  return (
    <div className="marine-background">
      {/* الموج */}
      <div className="wave wave-1"></div>
      <div className="wave wave-2"></div>
      <div className="wave wave-3"></div>
      
      {/* الفقاعات المتطورة */}
      <div className="bubble bubble-1">
        <div className="bubble-inner"></div>
      </div>
      <div className="bubble bubble-2">
        <div className="bubble-inner"></div>
      </div>
      <div className="bubble bubble-3">
        <div className="bubble-inner"></div>
      </div>
      <div className="bubble bubble-4">
        <div className="bubble-inner"></div>
      </div>
      <div className="bubble bubble-5">
        <div className="bubble-inner"></div>
      </div>
      
      {/* عناصر بحرية SVG أنيقة */}
      <div className="sea-element shell-element-1">
        <svg viewBox="0 0 100 100" className="sea-svg">
          <path d="M50,20 C70,20 80,40 80,60 C80,80 60,90 50,90 C40,90 20,80 20,60 C20,40 30,20 50,20 Z" 
                fill="url(#shellGradient)" stroke="#ffd166" strokeWidth="2"/>
        </svg>
      </div>
      
      <div className="sea-element shell-element-2">
        <svg viewBox="0 0 100 100" className="sea-svg">
          <path d="M30,30 C50,20 70,30 70,50 C70,70 50,80 30,70 C20,60 20,40 30,30 Z" 
                fill="url(#shellGradient2)" stroke="#ff9a76" strokeWidth="2"/>
        </svg>
      </div>
      
      <div className="sea-element star-element">
        <svg viewBox="0 0 100 100" className="sea-svg">
          <polygon points="50,10 61,35 88,35 66,52 72,78 50,63 28,78 34,52 12,35 39,35" 
                   fill="url(#starGradient)" stroke="#ff6b6b" strokeWidth="2"/>
        </svg>
      </div>
      
      <div className="sea-element coral-element-1">
        <svg viewBox="0 0 100 100" className="sea-svg">
          <path d="M50,10 C60,20 65,40 55,60 C45,70 35,65 30,50 C25,35 35,20 50,10 Z" 
                fill="url(#coralGradient)" stroke="#4ecdc4" strokeWidth="1.5"/>
        </svg>
      </div>
      
      <div className="sea-element coral-element-2">
        <svg viewBox="0 0 100 100" className="sea-svg">
          <path d="M40,20 C50,15 65,25 70,40 C75,55 65,70 50,75 C35,70 25,55 30,40 C35,25 40,20 40,20 Z" 
                fill="url(#coralGradient2)" stroke="#1a936f" strokeWidth="1.5"/>
        </svg>
      </div>
      
      {/* تدرجات الألوان */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <linearGradient id="shellGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffd166" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#ff9a76" stopOpacity="0.6"/>
          </linearGradient>
          <linearGradient id="shellGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff9a76" stopOpacity="0.7"/>
            <stop offset="100%" stopColor="#ff6b6b" stopOpacity="0.5"/>
          </linearGradient>
          <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff6b6b" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#ff8e8e" stopOpacity="0.6"/>
          </linearGradient>
          <linearGradient id="coralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4ecdc4" stopOpacity="0.7"/>
            <stop offset="100%" stopColor="#1a936f" stopOpacity="0.5"/>
          </linearGradient>
          <linearGradient id="coralGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a936f" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#114b47" stopOpacity="0.4"/>
          </linearGradient>
        </defs>
      </svg>

      {/* تأثيرات الضوء */}
      <div className="light-ray ray-1"></div>
      <div className="light-ray ray-2"></div>
      <div className="light-ray ray-3"></div>
    </div>
  );
};

export default MarineBackground;