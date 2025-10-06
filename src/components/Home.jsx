import React, { useContext, useEffect, useRef, useState } from 'react'
import wallpaper1 from '../assets/wallpaper.jpg'
import folder from '../assets/folder.png'
import githubLogo from '../assets/githubLogo.png'
import notesLogo from '../assets/notes.png'
import contactLogo from '../assets/Contacts.png'
import DraggableIcon from './DraggableIcon'
import settingsIcon from '../assets/Settings.png'
import winLogo from '../assets/Win95.png'
import cursor from '../assets/cursor.png'
import { useMotionValue, motion, useTransform, useSpring, useAnimation } from 'framer-motion'
import Settings from './Settings'
import Contact from './Contact'
import Projects from './Projects'
import { useBattery } from 'react-use'
import battery from '../assets/battery.jpg'
import chargingLogo from '../assets/chargingLogo.jpg'
import { useNavigate } from 'react-router-dom'
import { UiContext } from './Body'


const Home = () => {
  
  const ui = useContext(UiContext)
  const [wallpaper, setWallpaper] = useState(() => {
    const saved = localStorage.getItem('macWallpaper')
    return saved || wallpaper1
  });
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
  
  const openProjects = () => {
    if (!ui.projectsOpen) {
      ui.openProjects();
      console.log("Projects opened");
    }
  }
  
  const openGithub = () => {
    window.open("https://github.com/GoodGuySavitar", "_blank");
  }

  const openSettings = () => {
    if (!ui.settingsOpen) {
      ui.openSettings();
      console.log("Settings opened");
    }
  }

  useEffect(() => {
    if (wallpaper) {
      localStorage.setItem('macWallpaper', wallpaper)
    }
  }, [wallpaper])

  const openContacts = () => {
    if (!ui.contactsOpen) {
      ui.openContacts();
      console.log("Contacts opened");
    }
  }

  const openResume = () => {
    window.open("https://drive.google.com/file/d/1Nbj7Wq5HcMzXdc2JaLbikQLJP6qiLYhn/view?usp=sharing", "_blank");
  }

  const openWindows = () => {
    ui.setWindows()
    navigate("/win")
  }

  // Ensure OS context is set to Mac when on Home
  useEffect(() => {
    if (!ui.isMac) {
      ui.setMac()
    }
  }, [])
  const icons = [
      { src: folder, label: 'Projects', func: openProjects },
      { src: githubLogo, label: 'GitHub', func: openGithub },
      { src: notesLogo, label: 'Resume', func: openResume},
      { src: contactLogo, label: 'Contacts', func: openContacts},
      { src: settingsIcon, label: 'Settings', func: openSettings },
      { src: winLogo, label: 'Windows95', func: openWindows}  
  ]



  //MAIN HOME SCREEN, CONTAINS DOCK AND ICONS. ICONS ARE BEING FILTERED SO THAT WINDOWS95 ICON DOES NOT APPEAR ON THE SCREEN AND IN THE DOCK THE FOLDER DOESNT APPEAR 

  return (
    <div className="h-screen w-screen flex flex-col absolute items-center">
      {/* <div className='w-full bg-black '>
      </div> */}
      <div className="h-6 w-full fixed top-0 flex justify-between 
      bg-black text-white select-none" style={{cursor: `url(${cursor}), auto`}}>
        <div className='ml-1 text-lg'>  </div>
        <div className='flex items-center'>
          {isBatteryAvailable ? (
            <>
              <div className='text-sm'>
                {Math.round(level * 100)}%
              </div>
              <img src={battery} alt="battery logo" className='mx-1'/>
              {charging && <img src={chargingLogo} alt="charging logo" className='h-4'/>}
            </>
          ) : (
            <div className='text-xs text-gray-400 mr-2' title="Battery information not available">
              ⚡
            </div>
          )}
          <div className='mx-4 text-sm'>{hours}:{minutes} {(date.getHours() >= 12)? "PM" : "AM" } </div>
        </div>
      </div>

      <div className="flex-1 w-full bg-cover bg-center" 
      style={{ backgroundImage: `url(${wallpaper})`, cursor: `url(${cursor}), auto` }}>
        <div>
          <div className="h-170 w-full p-10 flex flex-col items-end justify-start">            
              {icons.filter((icons) => icons.src !== winLogo).map((icons, i) => {
                return <DraggableIcon key={i} src={icons.src} label={icons.label} func={icons.func} />
              })}

              {ui.settingsOpen &&
                <Settings 
                  onClose={ui.closeSettings}
                  currentWallpaper={wallpaper}
                  setWallpaper={setWallpaper}
                />
              }

              { ui.contactsOpen &&
                <Contact onClose={ui.closeContacts}/>
              }

              { ui.projectsOpen && 
                <Projects onClose={ui.closeProjects}/>
              }
          </div>

          {/* DOCK */}

          <div className="dock-container fixed bottom-4 sm:bottom-8 w-full flex justify-center z-10">
            <Dock icons={icons}/>
          </div>
          
        </div>

      </div>
    </div>
  );
};

const Dock = ({icons}) => {

  let mouseX = useMotionValue(null)
  
  return (
    <div 
      onMouseMove={(e) => {mouseX.set(e.pageX)}}
      onMouseLeave={() => mouseX.set(Infinity)} 
  className='h-full w-full flex items-center justify-center'>
      <div  className=' backdrop-blur-sm bg-gray-400/40 flex justify-center items-end rounded-2xl w-100 h-16' >
          {
            icons.filter((icon) => icon.src !== folder).map((icon, i) => (
              <DockIcons mouseX={mouseX} key={i} src={icon.src} alt={icon.label} onClick={icon.func}/>
            ))
          }
      </div>
    </div>
  )
}

//DOCK ICONS, CONTAINS THE ANIMATION FOR THE DOCK ICONS (FOLLOWED A YOUTUBE TUTORIAL FOR THIS PART)
const DockIcons = ({mouseX, src, alt, onClick}) => {
    let ref = useRef(null)
    const controls = useAnimation();
    const [hovered, setHovered] = useState(false)

    let distance = useTransform(mouseX, (value) => {
    if (value == null) return 9999
    let bounds = ref.current?.getBoundingClientRect()
    if (!bounds) return 0;
  
    const d = value - (bounds.x + bounds.width / 2)
    return d
  })

  let widthSync = useTransform(distance, [-125, 0, 125], [60, 120, 60])
  let width = useSpring(widthSync, {damping: 15, mass: 0.1, stiffness: 200})  //CONTROLS THE BOUNCINESS OF THE ICONS IN THE DOCK

  const handleClick = (e) => {
    controls.start({
      y: [0, -30, 0, -15, 0],
      transition: { duration: 1, ease: "easeOut" }
    });

    // Fires right away while bounce is happening
    if (onClick) onClick(e);
  };


  //THIS IS THE ACTUAL ICON ELEMENT. ONCLICK FUNCTIONALITY CAN BE ADDED TO THESE
  return (
    <motion.div style={{ width: width, height: width }} className="flex items-center justify-center" onClick={handleClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {
        hovered && 
        <div className="absolute -top-18 px-2 py-1 bg-gray-700/70 backdrop-blur-lg rounded-sm border border-gray-300/80 shadow-lg text-white text-xs whitespace-nowrap">{alt}</div>
      }
      <motion.img animate={controls} initial={{ y: 0 }} ref={ref} src={src} alt={alt} className='object-contain w-full h-full m-2 select-none'/>
    </motion.div>
  )
  
}

export default Home