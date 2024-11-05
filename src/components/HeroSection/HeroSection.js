import React from "react";

const HeroSection = () => {
    return (
        <section className="hero-section flex items-center pt-24 justify-center py-16 bg-gray-50">
            <div className="container mx-auto flex flex-col md:flex-row items-center gap-8 px-4">
                <div className="text-section max-w-lg text-center md:text-left">
                    <button className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full font-semibold mb-4">
                        Know Before You Go
                    </button>
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-800 leading-snug">
                        Traveling opens the door to creating <span className="text-blue-500">memories</span>
                    </h1>
                    <p className="mt-4 text-gray-600">
                        Lorem ipsum dolor sit amet consectetur, adipiscing elit. Ullam ipsam nobis asperiores soluta
                        voluptas quas voluptates. Molestiae tempora dignissimos.
                    </p>
                </div>

                <div className="image-section flex gap-4">
                    <img 
                        src="https://images.unsplash.com/photo-1506929562872-bb421503ef21" 
                        alt="Beach Destination" 
                        className="w-28 h-48 rounded-lg object-cover shadow-lg transition-transform duration-300 hover:scale-105"
                        onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1455587734955-081b22074882";
                        }}
                    />
                    <video 
                        className="w-28 h-48 rounded-lg object-cover shadow-lg transition-transform duration-300 hover:scale-105" 
                        src="/video/herovideo.mp4" 
                        autoPlay 
                        loop 
                        muted 
                        playsInline
                    >
                       
                    </video>
                    <img 
                        src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb" 
                        alt="City Landscape" 
                        className="w-28 h-48 rounded-lg object-cover shadow-lg transition-transform duration-300 hover:scale-105"
                        onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1455587734955-081b22074882";
                        }}
                    />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;