import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative w-full">
      {/* Part 1: Tech Background with Company Name */}
      <div className="relative w-full h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-magpie-dark"></div>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-70 mix-blend-screen"
          style={{ backgroundImage: "url('/assets/hero_tech_bg_1775051016062.png')" }}
        ></div>

        <div className="relative z-10 text-center flex flex-col items-center max-w-5xl px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 drop-shadow-xl tracking-wider">
            藍鵲驗證服務股份有限公司
          </h1>
          <h2 className="text-xl md:text-3xl font-bold text-white/90 tracking-[0.15em] drop-shadow-md">
            Blue Magpie Certifications, Inc.
          </h2>
        </div>

        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-[100px] opacity-20 transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-[100px] opacity-20 transform translate-x-1/2 translate-y-1/2"></div>
      </div>

      {/* Part 2: Agriculture Image with text */}
      <div
        className="relative w-full h-[50vh] min-h-[350px] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80&w=1920')" }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <h2 className="relative z-10 text-5xl md:text-7xl lg:text-8xl font-black text-white drop-shadow-2xl tracking-[0.3em]">
          從土地出發
        </h2>
      </div>
    </section>
  );
};

export default Hero;
