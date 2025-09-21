import React, { useRef, useState } from 'react'
import wallpaper1 from '../assets/wallpaper.jpg'
import wallpaper2 from '../assets/wallpaper2.jpg'
import wallpaper3 from '../assets/wallpaper3.jpg'
import wallpaper4 from '../assets/wallpaper4.jpg'
import wallpaper5 from '../assets/wallpaper5.jpg'
import wallpaper6 from '../assets/wallpaper6.jpg'
import wallpaper7 from '../assets/wallpaper7.jpg'
import wallpaper8 from '../assets/wallpaper8.jpg'
import wallpaper9 from '../assets/wallpaper9.jpg'
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
import Resume from './Resume'

const Home = () => {
  
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [wallpaper, setWallpaper] = useState(wallpaper1);

  const openProjects = () => {
    console.log("Projects clicked clicked");
  }
  
  const openGithub = () => {
    window.open("https://github.com/GoodGuySavitar", "_blank");
  }
  
  const openSettings = () => {
    if (!settingsOpen) {
      setSettingsOpen(true);
      console.log("Settings opened");
    }
  }

  const openResume = () => {
    if (!settingsOpen) {
      setResumeOpen(true);
      console.log("Resume opened");
    }
  }
  const icons = [
      { src: folder, label: 'Projects', func: openProjects },
      { src: githubLogo, label: 'GitHub', func: openGithub },
      { src: notesLogo, label: 'Resume', func: openResume},
      { src: contactLogo, label: 'Contacts'},
      { src: settingsIcon, label: 'Settings', func: openSettings },
      { src: winLogo, label: 'Windows95' }
  ]

  //MAIN HOME SCREEN, CONTAINS DOCK AND ICONS. ICONS ARE BEING FILTERED SO THAT WINDOWS95 ICON DOES NOT APPEAR ON THE SCREEN AND IN THE DOCK THE FOLDER DOESNT APPEAR 

  return (
    <div className="h-screen w-screen  flex flex-col absolute">
      {/* <div className="h-5 w-full bg-black flex items-center justify-center absolute">
        <div className="w-1/10 h-8 bg-black mt-6 rounded-[6px] z-10"></div>
      </div> */}

      <div className="flex-1 w-full bg-cover bg-center" 
      style={{ backgroundImage: `url(${wallpaper})`, cursor: `url(${cursor}), auto` }}>
        <div>
          <div className="h-170 w-full p-10 flex flex-col items-end justify-start">            
              {icons.filter((icons) => icons.src !== winLogo).map((icons, i) => {
                return <DraggableIcon key={i} src={icons.src} label={icons.label} func={icons.func}/>
              })}

              {/* Settings Modal */}

              {settingsOpen &&
                <Settings 
                  onClose={() => setSettingsOpen(false)}
                  currentWallpaper={wallpaper}
                  setWallpaper={setWallpaper}
                />
              }

              {
                <Resume
                onClose={() => setResumeOpen(false)}
                />
              }

          </div>

          {/* DOCK */}

          <div>
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
    <motion.div style={{ width: width, height: width }} className="flex items-center justify-center" onClick={handleClick}>
      <motion.img animate={controls} initial={{ y: 0 }} ref={ref} src={src} alt={alt} className='object-contain w-full h-full m-2 select-none'/>
    </motion.div>
  )
  
}

export default Home