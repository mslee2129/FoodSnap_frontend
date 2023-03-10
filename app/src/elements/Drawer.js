import React from "react";
import PropTypes from "prop-types"
import "../styles.css"
// import Accordion from "./Accordion";

export default function Drawer({children, isOpen, setIsOpen}) {
    return (
        <main
            className={
                "fixed overflow-y-scroll overflow-hidden z-10 inset-0 transform ease-in-out " +
                (isOpen
                    ? "transition-all opacity-100 duration-500 translate-x-0"
                    : "transition-all delay-50 duration-500 opacity-0 translate-x-full")
            }
            style={{ zIndex: 50 }}
        >
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            <div className={
                    "w-screen max-w-lg right-0 bg-[color:var(--sidebar-bg-light)] dark:bg-[color:var(--sidebar-bg-dark)] h-full w-full absolute right-0" +
                    (isOpen ? "transform translate-x-0 ease-out" : "transform translate-x-full ease-in")
                }
                style={{ zIndex: 50 }}>
                <div className="flex items-center justify-between m-5">
                    <h1 className="text-xl font-semibold text-[color:var(--sidebar-h1-light)] dark:text-[color:var(--sidebar-h1-dark)]">Welcome to FoodSnap!</h1>
                    <button
                        onClick={() => {
                            setIsOpen(false);
                        }}
                        className="text-[color:var(--sidebar-p-light)] dark:text-[color:var(--sidebar-p-dark)] focus:outline-none"
                        aria-label="Close"
                    >
                        <svg
                            className="h-6 w-6 fill-current text-[color:var(--sidebar-button-light)] dark:text-[color:var(--sidebar-button-dark)]"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                className="heroicon-ui"
                                d="M6.7 5.3a1 1 0 0 0-1.4 1.4L10.6 12l-5.3 5.3a1 1 0 1 0 1.4 1.4L12 13.4l5.3 5.3a1 1 0 0 0 1.4-1.4L13.4 12l5.3-5.3a1 1 0 0 0-1.4-1.4L12 10.6l-5.3-5.3z"
                            />
                        </svg>
                    </button>
                </div>
                <div className="flex flex-col m-5">{children}</div>
                {isOpen && <p className="text-[color:var(--sidebar-p-light)] dark:text-[color:var(--sidebar-p-dark)]">
                    <div className="">
                    <h1 className="text-justify px-5 -mt-5">Imagine you could show a dish to an app and it would show you its calories? </h1>
                    <div className="text-justify px-5">FoodSnap is a progressive web app that allows you to upload/take a
                    picture of a food item to estimate its nutritional value. To get
                    started, upload a picture of your food. <br /><br /> For more accurate results,
                    make sure you have the food item on a plate and you take the photo from above. There is also an option
                    to enter the plate size below. <br/><br/>
                    </div>
                    </div>
                    <h1 className="px-5">About Us</h1>
                    <div className="text-justify px-5">
                    FoodSnap was developed by a team of Imperial
                        College London MSc. Computing students. You can contact us using one of the following emails: <br/><br/>
                    </div>
                    <div className="flex flex-col items-start px-4">
                        <div className="flex flex-row items-center justify-center">
                            <p className="px-0 mx-2 font-bold">Pablo Behrens</p>
                            <a href="mailto:pablo.behrens22@imperial.ac.uk" className="inline-block">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                </svg>
                            </a>
                        </div>
                        <div className="flex flex-row items-center justify-center">
                            <p className="px-0 mx-2 mr-3 font-bold">Simon Frei</p>
                            <a href="mailto:simon.frei22@imperial.ac.uk" className="">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                </svg>
                            </a>
                        </div>
                        <div className="flex justify-center items-center">
                            <p className="px-0 mx-2 font-bold">Jason Lee</p>
                            <a href="mailto:jason.lee22@imperial.ac.uk" className="text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
                                </svg>
                            </a>
                        </div>
                        <div className="flex justify-center items-center">
                            <p className="px-0 mx-2 font-bold">Ryan Perkins</p>
                            <a href="mailto:ryan.perkins21@imperial.ac.uk" className="text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
                                </svg>
                            </a>
                        </div>
                        <div className="flex justify-center items-center">
                            <p className="px-0 mx-2 font-bold">Jan Peter</p>
                            <a href="mailto:jan.peter22@imperial.ac.uk" className="text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
                                </svg>
                            </a>
                        </div>
                        <div className="flex justify-center items-center">
                            <p className="px-0 mx-2 font-bold">Laxmi Prajapat</p>
                            <a href="mailto:laxmi.prajapat22@imperial.ac.uk" className="text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </p>
                }
            </div>
            <div className=" w-screen h-full cursor-pointer z-20" onClick={() => {setIsOpen(false);}}>
            </div>
        </main>
        
    );
}

Drawer.propTypes = {
    children: PropTypes.node,
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
};