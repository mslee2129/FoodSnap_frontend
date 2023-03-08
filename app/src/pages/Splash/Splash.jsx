import React from 'react';
import logo from '../../resources/food_love.png'

// for testing tailwind

function Splash() {
    return (
        <div className="bg-gray-800 min-h-screen ">
            <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
                <div className="flex-shrink-0">
                    <img className="h-16" src={logo} alt="Logo" />
                </div>
                <h1 className="text-3xl text-white">FoodSnap</h1>
            </div>
            <div className="bg-red-500 flex flex-col justify-center min-h-screen max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                <p className="text-2xl text-white">Welcome to FoodSnap! <br />
                    FoodSnap is a progressive web app that allows you to upload/take a
                    picture of a food item to estimate its nutritional value. To get
                    started, upload a picture of your food.
                </p>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                    Click me!
                </button>
            </div>
        </div>
    );

}

export default Splash;
