import React from 'react';

export const Welcome = ({ onEnter }: { onEnter: () => void }) => {
  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-white">
      {/* Left side: Black and White Parisian Architecture Photo */}
      <div 
        className="w-full md:w-1/2 h-1/2 md:h-full bg-cover bg-center grayscale" 
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1600&q=90)' }} 
      />
      
      {/* Right side: Minimalist Welcome Area */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col items-center justify-center bg-white relative">
        <h1 className="text-2xl md:text-3xl text-neutral-500 mb-12 tracking-wide font-serif">
          Liu Chen 刘晨
        </h1>
        <button
          onClick={onEnter}
          className="px-8 py-2.5 bg-[#e5e7eb] hover:bg-[#d1d5db] text-neutral-900 text-sm font-semibold rounded-full transition-colors font-sans lowercase shadow-sm"
        >
          welcome
        </button>
      </div>
    </div>
  );
};
