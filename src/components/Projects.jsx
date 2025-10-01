import React, { useContext, useRef } from 'react'
import Draggable from 'react-draggable'
import vasundharaLogo from '../assets/vasundharaLogo.jpeg'
import tapriLogo from '../assets/tapri.png'
import githubLogo from '../assets/githubLogo.png'
import youtubeLogo from '../assets/youtube.png'
import { UiContext } from './Body'
import close from '../assets/close.png'
import githubWin from '../assets/githubWin.png'
import youtubeWin from '../assets/youtubeWin.png'

const Projects = ({onClose}) => {
  const nodeRef = useRef(null)
  const ui = useContext(UiContext)

  return (
    <div className="fixed inset-0 pointer-events-none flex items-start justify-center">
    <div className="w-full h-11/12 mt-5 pointer-events-none flex items-start justify-center ">
      <Draggable nodeRef={nodeRef} bounds="parent">
        {ui.isMac ? (<div ref={nodeRef} 
        className="w-2/3 h-5/6 mt-4 bg-black/50 backdrop-blur-lg rounded-2xl border border-gray-400/30 shadow-lg p-2 text-white flex items-start justify-between select-none pointer-events-auto">
        <div className='w-full h-full'>
            <div className='w-full h-full flex flex-col'>
              <div className="absolute group w-3 h-3 bg-red-500 rounded-full mr-2 mb-6 flex items-center justify-center transform transition-transform ease-in-out hover:scale-125"
              onClick={onClose}>
                <span className="text-[8px] text-red-800 font-extrabold opacity-0 group-hover:opacity-100">
                  ✕
                </span>
              </div>
              <div className='w-full h-11/12 p-4 mt-4 bg-gray-700/50 backdrop-blur-lg rounded-xl border border-gray-300/80 shadow-lg select-none flex flex-col items-start '> 
                  <div className='w-full h-12 text-xl font-semibold tracking-wide flex items-center'>Projects</div>
                  
                  <div className="w-full border-b border-gray-400 mt-2 my-4"/>
                  
                  <div className="w-full flex flex-col gap-6 overflow-y-auto max-h-[calc(100%-4rem)] scrollbar-custom ">

                    <ProjectItem 
                      title="Project Vasundhara"
                      logo={vasundharaLogo}
                      youtubeLink="https://youtu.be/qwkPjFJWj1o"
                      githubLink="https://github.com/GoodGuySavitar/ProjectVasundhara"
                      description="Project Vasundhara is an interactive Virtual Reality application that gamifies chemistry learning in a fun and immersive way. Players can combine elements to build and shape the world around them, gaining an engaging understanding of how different elements influence our environment. Developed entirely within a 36-hour hackathon, the project secured first place for its innovation and execution."
                      technologies="C#, Unity"
                      isWindows={false}
                    />

                    <div className="w-full border-b border-gray-400 mt-2 my-4"/>

                    <ProjectItem
                    title="Tapri"
                    logo={tapriLogo}
                    githubLink="https://github.com/GoodGuySavitar/Tapri"
                    description="Tapri is an interactive game that combines immersive storytelling with meaningful social themes. Players follow the journey of a young boy working at a chai shop on the highway, making choices that determine his fate. Through an intricate dialogue system, the game highlights the issue of child labor, encouraging players to reflect on the challenges faced by millions of children worldwide. Tapri delivers an engaging experience that entertains while fostering awareness and discussion on social change."
                    technologies="C#, Unity"
                    isWindows={false}
                    />
                  </div>
              </div>
            </div>
          </div>      
        </div>
        ) : (
          <div ref={nodeRef} className='w-1/2 h-3/4 bg-[#c3c3c3] text-black border-3
          border-l-white border-t-white shadow pointer-events-auto select-none flex flex-col overflow-hidden'>
            <div className='w-full h-8 flex justify-between items-center bg-[#000082] shrink-0'>
                <div className='text-lg text-white flex items-center ml-1'>
                    Projects
                </div>
              <div className='text-lg text-white flex items-center mr-1'>
                  <div
                      className="w-7 h-7 mr-0.5 bg-[#c3c3c3] flex items-center justify-center cursor-pointer select-none
                      border-3 border-t-white border-l-white border-b-[#828282] border-r-[#828282]
                      active:border-t-[#828282] active:border-l-[#828282] active:border-b-white active:border-r-white active:translate-y-[1px]"
                      onClick={(e) => { e.stopPropagation(); onClose(); }}
                      onTouchEnd={(e) => { e.preventDefault(); e.stopPropagation(); onClose(); }}
                  >
                        <img src={close} alt="close" className='w-4 select-none' draggable={false}/>
                    </div>
                </div>
            </div>
            <div className='w-full flex-1 min-h-0'>
              <div className="w-full h-full flex flex-col overflow-y-auto scrollbar-win95 pl-2 ">
                <ProjectItem 
                  title="Project Vasundhara"
                  logo={vasundharaLogo}
                  youtubeLink="https://youtu.be/qwkPjFJWj1o"
                  githubLink="https://github.com/GoodGuySavitar/ProjectVasundhara"
                  description="Project Vasundhara is an interactive Virtual Reality application that gamifies chemistry learning in a fun and immersive way. Players can combine elements to build and shape the world around them, gaining an engaging understanding of how different elements influence our environment. Developed entirely within a 36-hour hackathon, the project secured first place for its innovation and execution."
                  technologies="C#, Unity"
                  isWindows={true}
                />

                <div className="w-full border-b border-gray-400 mt-2 my-4"/>

                <ProjectItem
                title="Tapri"
                logo={tapriLogo}
                githubLink="https://github.com/GoodGuySavitar/Tapri"
                description="Tapri is an interactive game that combines immersive storytelling with meaningful social themes. Players follow the journey of a young boy working at a chai shop on the highway, making choices that determine his fate. Through an intricate dialogue system, the game highlights the issue of child labor, encouraging players to reflect on the challenges faced by millions of children worldwide. Tapri delivers an engaging experience that entertains while fostering awareness and discussion on social change."
                technologies="C#, Unity"
                isWindows={true}
                /> 

              <div className="w-full border-b border-gray-400 mt-2"/>
              </div> 
            </div>
         </div>
        )
      }
      </Draggable>
    </div>
    </div>
  )
}

const ProjectItem = ({ title, description, technologies, logo, githubLink, youtubeLink, isWindows }) => {
  return (
    <div className="flex flex-col">
      <p className={`${isWindows ? 'text-xl font-semibold mb-2' : 'text-2xl tracking-wide font-semibold mb-4'}`}>{title}</p>
      <div className='flex'>
        <img
          src={logo}
          alt={`${title} Logo`}
          className={`${isWindows ? 'w-48 h-48 mr-4 mt-2 select-none pointer-events-none' : 'w-48 h-48 mr-4 mt-1 select-none pointer-events-none'}`} />
        <div>
          <p className={`${isWindows ? 'text-lg' : 'tracking-wide text-lg'}`}>{description}</p>
          <p className={`${isWindows ? 'text-lg my-1' : 'tracking-wide text-lg my-1'}`}>Technologies: {technologies}</p>
          <div className="flex">
            <img
              src={isWindows ? githubWin : githubLogo}
              alt="GitHub"
              className="w-12 h-12 rounded-full overflow-hidden mt-2 cursor-pointer"
              draggable="false"
              onClick={() => window.open(githubLink, "_blank")}
            />
            {youtubeLink && (
              <img
                src={isWindows ? youtubeWin : youtubeLogo}
                alt="YouTube"
                className="w-12 h-12 rounded-full overflow-hidden mt-2 cursor-pointer"
                draggable="false"
                onClick={() => window.open(youtubeLink, "_blank")}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Projects