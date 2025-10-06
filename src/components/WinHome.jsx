import winCursor from "../assets/winCursor.png"
import winLogo from "../assets/windowsLogo.png"
import folder from "../assets/folderWin.png"
import githubLogo from "../assets/githubWin.png"
import notesLogo from "../assets/notepad.png"
import contactLogo from "../assets/contactsWin.png"
import computer from "../assets/computer.png"
import appleLogo from "../assets/appleLogo.png"
import DraggableIcon from "./DraggableIcon"
import Settings from "./Settings"
import Contact from "./Contact"
import Projects from "./Projects"
import winBattery from '../assets/winBattery1.png'
import winCharging from '../assets/winCharging.png'
import menubar from "../assets/menubar.png"
import credits from "../assets/credits.png"
import arrow from "../assets/right.png"
import { UiContext } from "./Body"
import { useBattery } from "react-use"
import { useContext, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import Draggable from 'react-draggable'
import close from '../assets/close.png'

const WinHome = () => {
    const ui = useContext(UiContext)
    const navigate = useNavigate();

    const {level, charging} = useBattery()
    const date = new Date();
    
    // Check if battery information is available
    const isBatteryAvailable = level !== null && level !== undefined;
  
    const [time, setTime] = useState(new Date())
  
    useEffect(() => {
      const update = () => setTime(new Date())
  
      update();
  
      const timer = setInterval(update, 60000)
  
      return () => clearInterval(timer)
    }, []);
  
    const hours = String(time.getHours()).padStart(2, "0");
    const minutes = String(time.getMinutes()).padStart(2, "0");

    const openGithub = () => {
        window.open("https://github.com/GoodGuySavitar", "_blank")
    }

    const openResume = () => {
        window.open("https://drive.google.com/file/d/1Nbj7Wq5HcMzXdc2JaLbikQLJP6qiLYhn/view?usp=sharing", "_blank")
    }

    const openMac = () => {
        ui.setMac();
        navigate("/")
    }

    const icons = [
        { src: computer, label: 'My Computer', func: ui.openSettings},
        { src: folder, label: 'Projects', func: ui.openProjects },
        { src: githubLogo, label: 'GitHub', func: openGithub },
        { src: notesLogo, label: 'Resume', func: openResume },
        { src: contactLogo, label: 'Contacts', func: ui.openContacts },
        { src: appleLogo, label: 'MacOS', func: ui.setMac }  
    ]

    // Ensure OS context is set to Windows when on WinHome
    useEffect(() => {
        if (!ui.isWindows) {
            ui.setWindows()
        }
    }, [])

    const [isStartOpen, setIsStartOpen] = useState(false)
    const [creditsOpen, setCreditsOpen] = useState(false)

    const openStartMenu = (e) => {
        e.stopPropagation()
        console.log("START MENU OPENED")
        setIsStartOpen(true)
    }

    const openCredits = () => setCreditsOpen(true)
    const closeCredits = () => setCreditsOpen(false)

    return (
        <div className="fixed inset-0 overflow-hidden flex flex-col items-center bg-[#008282] font-w95fa" style={{cursor: `url(${winCursor}), auto`}} onClick={() => setIsStartOpen(false)}>
            <div className="h-10 w-full p-0.5 fixed bottom-0 flex justify-between items-center
            bg-[#c3c3c3] text-black select-none z-2">
                { isStartOpen &&
                <div className="absolute left-0 bottom-10 z-50 w-[10rem] h-[12rem] ml-1 bg-[#c0c0c0] border-3 border-t-white border-l-white border-b-[#828282] border-r-[#828282]">
                    <StartMenu 
                    github={openGithub}
                    resume={openResume}
                    mac={openMac}
                    onOpenCredits={openCredits}
                    />    
                </div>}
                <div className={`w-[6rem] items-center flex cursor-pointer select-none border-3 ${
                    isStartOpen 
                        ? 'border-t-[#828282] border-l-[#828282] border-b-white border-r-white translate-y-[1px]' 
                        : 'border-t-white border-l-white border-b-[#828282] border-r-[#828282] active:border-t-[#828282] active:border-l-[#828282] active:border-b-white active:border-r-white active:translate-y-[1px]'
                }`} onClick={openStartMenu}>
                    <img src={winLogo} alt="win logo" className="ml-2" /> 
                    <div className=" ml-1 text-xl font-semibold">Start</div>
                </div>
                <div className="h-11/12 flex border-3 border-t-[#828282] border-l-[#828282] border-b-white border-r-white  mr-2">
                    {isBatteryAvailable ? (
                        <>
                            <div className='flex items-center text-lg ml-1'>
                                {Math.round(level * 100)}%
                            </div>
                            {charging ? <img src={winCharging} alt="battery logo" className='mx-1'/>  : 
                            <img src={winBattery} alt="battery logo" className='mx-1'/>}
                        </>
                    ) : (
                        <div className='flex items-center text-sm ml-1 text-gray-600' title="Battery information not available">
                            ⚡
                        </div>
                    )}
                    <div className='mx-4 flex items-center'>{hours}:{minutes} {(date.getHours() >= 12)? "PM" : "AM" } </div>
                </div>
            </div>

            <div className="w-full h-full">
                <div className="h-full w-full p-6 flex flex-col items-start justify-start">
                    {icons.filter((icons) => icons.src !== appleLogo).map((icons, i) => {
                        return <DraggableIcon key={i} src={icons.src} label={icons.label} func={icons.func}/>
                    })}
                    
                    {ui.settingsOpen &&
                    <Settings onClose={ui.closeSettings}/>
                    }

                    { ui.contactsOpen &&
                    <Contact onClose={ui.closeContacts}/>
                    }

                    { ui.projectsOpen && 
                    <Projects onClose={ui.closeProjects}/>
                    }

                    { creditsOpen &&
                    <Credits onClose={closeCredits}/>
                    }
                </div>
            </div>
        </div>
    )
}

const StartMenu = ({github, resume, mac, onOpenCredits}) => {
    return (
    <div className="flex h-full" onClick={(e) => e.stopPropagation()}>
        <div className="w-[28px] h-full overflow-hidden">
            <img src={menubar} alt="menubar" className="h-full w-auto object-bottom block"/>
        </div>
        <div className="flex flex-col h-full p-2">
            <StartMenuComponent img={credits} label={"credits logo"} text={"Credits"} onClick={onOpenCredits}/>
            <StartMenuComponent img={githubLogo} label={"github logo"} text={"Github"} isExternal={true} 
            onClick={github}/>
            <StartMenuComponent img={notesLogo} label={"Resume logo"} text={"Resume"} isExternal={true} 
            onClick={resume}/>

            <div className="w-full border-b border-gray-400 mt-2"/> 
            <StartMenuComponent img={appleLogo} label={"Apple logo"} text={"MacOS"} isExternal={true}
            onClick={mac}
            />
        </div>
    </div>
    )
}

 const StartMenuComponent = ({img, label, text, isExternal, onClick}) => {
    return (
    <div className="w-28 flex justify-between mt-2 cursor-pointer select-none" onClick={(e) => { e.stopPropagation(); if (onClick) onClick(); }}>
        <div className="flex my-1">
            <img src={img} alt={label} className="w-6 h-6"/>
            <div className="ml-2 text-md">
                {text}
            </div>
        </div>
        {isExternal && 
            <div className="flex items-center">
                <img src={arrow} alt="arrow" className="w-3 h-3"/>
            </div>
        }
    </div>
    )
}

export default WinHome

// Credits window (Windows 95 style) similar to Contacts card
const Credits = ({onClose}) => {
    const nodeRef = useRef(null)
    const ui = useContext(UiContext)
    const isTouchDevice = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: coarse)').matches

    return (
      <div className="fixed inset-0 pointer-events-none flex items-start justify-center">
        <div className="w-full h-11/12 mt-5 pointer-events-none flex items-start justify-center ">
          <Draggable nodeRef={nodeRef} bounds="parent" disabled={isTouchDevice}>
            <div ref={nodeRef} className='w-[92vw] sm:w-1/3 md:w-1/3 lg:w-1/3 h-[60vh] sm:h-1/2 md:h-1/2 lg:h-1/2 bg-[#c3c3c3] text-black border-3
            border-l-white border-t-white shadow pointer-events-auto select-none flex flex-col overflow-hidden'>
              <div className='w-full h-8 flex justify-between items-center bg-[#000082] shrink-0'>
                  <div className='text-lg text-white flex items-center ml-1'>
                      Credits
                  </div>
                  <div className='text-lg text-white flex items-center mr-1'>
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
              <div className='w-full flex-1 min-h-0 mt-2'>
                <div className='w-full h-full flex flex-col items-start justify-start overflow-auto scrollbar-win95 p-3 text-sm sm:text-base'>
                  <div className='mb-2 break-words'>Cursor: <a href='http://www.rw-designer.com/user/94406' target='_blank' className='text-blue-700 underline' rel='noreferrer'>darix555</a></div>
                  <div className='mb-2 break-words'>Icons: Windows 95 OSR2, <a href="https://wallpapers-clan.com/app-icons/windows-95/" className='text-blue-700 underline'>wallpapers clan</a></div>
                  <div className='mb-2 break-words'>Font: <a href='https://www.dafont.com/w95fa.font' target='_blank' className='text-blue-700 underline' rel='noreferrer'>dafont</a></div>
                </div>
              </div>
            </div>
          </Draggable>
        </div>
      </div>
    )
}
