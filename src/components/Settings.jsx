import React, { useRef, useState,  useContext } from 'react'
import profilePic from '../assets/ProfilePic.jpeg'
import Draggable from 'react-draggable'
import wallpaper1 from '../assets/wallpaper.jpg'
import wallpaper2 from '../assets/wallpaper2.jpg'
import wallpaper3 from '../assets/wallpaper3.jpg'
import wallpaper4 from '../assets/wallpaper4.jpg'
import wallpaper5 from '../assets/wallpaper5.jpg'
import wallpaper6 from '../assets/wallpaper6.jpg'
import wallpaper7 from '../assets/wallpaper7.jpg'
import wallpaper8 from '../assets/wallpaper8.jpg'
import wallpaper9 from '../assets/wallpaper9.jpg'
import { UiContext } from './Body'
import close from '../assets/close.png'

const Settings = ({onClose, setWallpaper, currentWallpaper}) => {
    const nodeRef = useRef(null)
    const ui = useContext(UiContext)

    const [settingsActive, setSettingsActive] = useState(true);
    const [wallpapersActive, setWallpapersActive] = useState(false);
    const [creditsActive, setCreditsActive] = useState(false);
    const [techActive, setTechActive] = useState(false);

    // Handler functions now have access to state setters
    const handleProfileClick = () => {
        console.log("Profile clicked");
        setSettingsActive(true);
        setWallpapersActive(false);
        setCreditsActive(false);
        setTechActive(false);
    };
    
    const handleWallpapersClick = () => {
        console.log("Wallpapers clicked");
        setWallpapersActive(true);  
        setSettingsActive(false);
        setCreditsActive(false);
        setTechActive(false);
    };
    
    const handleCreditsClick = () => {
        console.log("Credits clicked");
        setCreditsActive(true);
        setSettingsActive(false);
        setWallpapersActive(false);
        setTechActive(false);
    };
    
    const handleTechClick = () => {
        setTechActive(true);
        setCreditsActive(false);
        setSettingsActive(false);
        setWallpapersActive(false);
    }

    return (
        <div className="fixed inset-0 pointer-events-none flex items-start justify-center">
        <div className="w-full h-11/12 mt-5 pointer-events-none flex items-start justify-center">
        <Draggable nodeRef={nodeRef} bounds="parent">
            { ui.isMac ? (
                <div ref={nodeRef} className='w-[90vw] sm:w-3/4 md:w-2/3 lg:w-1/2 h-[70vh] sm:h-[70vh] md:h-[75vh] lg:h-[80vh] bg-black/50 backdrop-blur-lg rounded-2xl border border-gray-400/30 shadow-lg p-2 text-white
                flex items-start justify-between select-none pointer-events-auto overflow-hidden scrollbar-custom'>
                    <div className='w-1/3 h-full bg-gray-700/50 backdrop-blur-lg rounded-xl border border-gray-300/80 shadow-lg pl-2 pt-2 pr-2 pb-2'>
                        <SettingsOptions 
                            onClose={onClose}
                            onProfileClick={handleProfileClick}
                            onWallpapersClick={handleWallpapersClick}
                            onCreditsClick={handleCreditsClick}
                            onTechClick={handleTechClick}
                            activeSection={
                                settingsActive ? 'profile' :
                                wallpapersActive ? 'wallpapers' :
                                creditsActive ? 'credits' : ''
                            }
                        />
                    </div>
                    <div className='pr-4 w-2/3 h-full overflow-auto break-words'>
                        {settingsActive &&
                            <SettingsProfile/>
                        }
                        {wallpapersActive &&
                            <div>
                                <Wallpapers setWallpaper={setWallpaper} currentWallpaper={currentWallpaper}/>
                            </div>
                        }
                        {creditsActive &&   
                            <div>
                                <Credits/>
                            </div>
                        }
                    </div>
                </div>
            ) : (
                <div ref={nodeRef} className='w-[92vw] sm:w-4/5 md:w-2/3 lg:w-1/2 h-[50vh] sm:h-[50vh] md:h-[50vh] lg:h-[50vh] max-h-[50vh] bg-[#c3c3c3] text-black border-3
                 border-l-white border-t-white shadow pointer-events-auto select-none flex flex-col overflow-hidden'>
                    <div className='w-full h-8 flex justify-between items-center bg-[#000082] shrink-0'>
                        <div className='text-lg text-white flex items-center ml-1'>
                            About Me
                        </div>
                        <div className='text-lg text-white flex items-center mr-1 '>
                            <div
                                className="w-7 h-7 mr-0.5 bg-[#c3c3c3] flex items-center justify-center cursor-pointer select-none
                                border-3 border-t-white border-l-white border-b-[#828282] border-r-[#828282]
                                active:border-t-[#828282] active:border-l-[#828282] active:border-b-white active:border-r-white active:translate-y-[1px]"
                                onClick={onClose}
                            >
                                <img src={close} alt="close" className='w-4 select-none' draggable={false}/>
                            </div>
                        </div>
                    </div>
                    <div className='w-full flex-1 min-h-0 flex justify-between overflow-hidden'>
                        <div className='w-2/5 sm:w-1/3 h-full min-h-0 flex flex-col items-center overflow-auto scrollbar-win95 pt-4 sm:pt-6 pb-2'>
                            <div className='w-32 h-32 sm:w-40 sm:h-40 flex justify-center items-center 
                            border-2 border-t-white border-l-white border-b-[#828282] border-r-[#828282]'>
                                <div className='w-28 h-28 sm:w-36 sm:h-36'>
                                    <img src={profilePic} alt="Profile Picture" draggable="false" className="select-none pointer-events-none"/>
                                </div>
                            </div>
                            <div className='text-lg sm:text-xl mt-4'>
                                Asmit Singh Chauhan
                            </div>
                            <div className='text-base sm:text-lg mt-1'>
                                +91 8867096611
                            </div>
                        </div>
                        <div className='w-3/5 sm:w-2/3 h-full min-h-0 text-base sm:text-lg pr-2 mr-2 sm:mr-4 overflow-auto break-words scrollbar-win95 pt-4 sm:pt-6 pb-2'>
                            <p>Hello, I'm Asmit</p>
                            <p className='my-2'>
                                I'm a final year Computer Science student.
                            </p>
                            <p>
                                I love building web applications that bring ideas to life. Along with web dev, I have explored game development in Unity through internships at Electrum Interactive, Smollan and Constituents AI. These experiences have strengthened my problem-solving skills, taught me to adapt to fast-paced environments, and helped me grow both professionally and personally. 
                            </p>
                            <p className='my-2'>This website was made by me from scratch!</p>
                        </div>
                    </div>
                </div>
            )}
        </Draggable>    
        </div>
        </div>
    )
}

const SettingsOptions = ({onClose, onProfileClick, onWallpapersClick, onCreditsClick, onTechClick, activeSection}) => {
    return (
        <div className='flex flex-col'>
            <div className='flex '>
                <div className="relative group w-3 h-3 bg-red-500 rounded-full  mr-2 mb-6 flex items-center justify-center transform transition-transform ease-in-out hover:scale-125"
                onClick={onClose}>
                {/* X appears only on hover */}
                <span className="text-[8px] text-red-800 font-extrabold opacity-0 group-hover:opacity-100">
                        ✕
                </span>
                </div>
            </div>
            <div
                className={`mb-2 p-2 rounded-md text-lg cursor-pointer  ${activeSection === 'profile' ? 'bg-blue-500 text-white' : ''}`}
                onClick={onProfileClick}
            >
                Asmit Chauhan
            </div>
            <div className="w-full border-b border-gray-400 my-4" />
            <div
                className={`mb-2 p-2 rounded-md text-lg cursor-pointer ${activeSection === 'wallpapers' ? 'bg-blue-500 text-white' : ''}`}
                onClick={onWallpapersClick}
            >
                Wallpapers
            </div>
            <div
                className={`p-2 rounded-md text-lg cursor-pointer ${activeSection === 'credits' ? 'bg-blue-500 text-white' : ''}`}
                onClick={onCreditsClick}
            >
                Credits
            </div>
        </div>
    )
}

const SettingsProfile = () => {
    return (
        <div className='w-full flex flex-col items-center justify-center p-2 '>
            <div className='w-32 h-32 rounded-full overflow-hidden shadow-lg m-4'>
                <img src={profilePic} alt="Profile Picture"   draggable="false"
                className="select-none pointer-events-none"/>
            </div> 
            <div className='text-lg font-semibold tracking-wider'>
                Asmit Singh Chauhan
            </div>
            <div className='text-lg '>
                +91 88670 96611
            </div>
            <div className='mt-4 w-full h-full p-2 flex flex-col text-md tracking-wide'>
                <h1 className='mb-3 text-lg'>About Me</h1>
                <p className='my-2 '>Hello, I'm Asmit</p>
                <p className='my-2'>
                    I'm a final year Computer Science student.
                </p>
                <p>
                    I love building web applications that bring ideas to life. Along with web dev, I have explored game development in Unity through internships at Electrum Interactive, Smollan and Constituents AI. These experiences have strengthened my problem-solving skills, taught me to adapt to fast-paced environments, and helped me grow both professionally and personally. 
                </p>
                <p className='my-2'>This website was made by me from scratch!</p>
            </div>
        </div>
    )
}

const Wallpapers = ({setWallpaper, currentWallpaper}) => {
    const wallpapers = [
        wallpaper1, wallpaper2, wallpaper3, wallpaper4, wallpaper5, wallpaper6, wallpaper7, wallpaper8, wallpaper9
    ];

    const handleWallpaperChange = (wp) => {
        if (setWallpaper) setWallpaper(wp);
    };

    return (
        <div className='w-full flex flex-col items-center justify-evenly p-2 '>
            <div className='mb-4 font-semibold text-xl tracking-wider'>Select a wallpaper</div>
            <div className='w-full flex flex-wrap justify-center gap-4'>
                {wallpapers.map((wp, idx) => (
                    <img
                        key={idx}
                        src={wp}
                        alt={`Wallpaper ${idx + 1}`}
                        onClick={() => handleWallpaperChange(wp)}
                        className={`w-32 h-20 object-cover rounded-lg shadow cursor-pointer hover:scale-105 transition-transform duration-200 border-2 ${currentWallpaper === wp ? 'border-blue-500' : 'border-gray-300'}`}
                        draggable='false'
                    />
                ))}
            </div>
        </div>
    )
}

const Credits = () => {
    return (
        <div className='w-full flex flex-col items-start p-12 '>
            <div className='text-lg mb-4 font-semibold tracking-wide'>Credits</div>
            <CreditsComponent component={"Icons"} siteLink={'https://macosicons.com/#/'} siteName={'macOSicons by Elias'}/>
            <CreditsComponent component={"Backgrounds"} siteLink={'https://wallpapercave.com/'} siteName={'Wallpaper Cave'}/>
            <CreditsComponent component={"Font"} siteLink={'https://developer.apple.com/fonts/'} siteName={'Apple'}/>
        </div>
    )   
}

const CreditsComponent = ({component , siteLink, siteName}) => {
    return (
        <div className='text-md mb-2 tracking-wide'>
            {component}: <a href={siteLink} target='_blank' className="text-blue-500 hover:underline" draggable="false" >
            {siteName}</a>
        </div>
    )
}
export default Settings