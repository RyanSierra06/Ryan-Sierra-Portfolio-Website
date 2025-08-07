import React from "react";

const AboutMeCard = () => {
    return (
        <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-2xl h-full">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                <img src="/French Horn Icon.png" alt="French Horn" className="w-10 h-10 mr-3 object-contain" />
                About Me
            </h2>
            <div className="space-y-6 text-slate-300 leading-relaxed">
                <p className="text-lg">
                    Sophomore studying Computer Science at Purdue with a focus in
                    Software Engineering and Machine Intelligence.
                    I Play French Horn, love watching movies, and enjoy spending with friends.
                </p>
                <p className="text-lg">
                    I make fun projects on the side, love learning and connecting with people,
                    and always look for new opportunities to grow through creativity and collaboration.
                </p>
            </div>
        </div>
    );
};

export default AboutMeCard;