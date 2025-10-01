import React, { useContext, useRef } from 'react'
import Draggable from 'react-draggable'
import profilePic from '../assets/ProfilePic.jpeg'
import linkedinLogo from '../assets/Linkedin.png'
import mailLogo from '../assets/mail.png'
import githubLogo from '../assets/githubLogo.png'
import { UiContext } from './Body'
import close from '../assets/close.png'
import githubWin from "../assets/githubWin.png"
import linkedinWin from "../assets/linkedinWin.png"
import gmail from "../assets/gmail1.png"

const Contact = ({onClose}) => {
  const nodeRef = useRef(null)
  const ui = useContext(UiContext)

  return (
    <div className="fixed inset-0 pointer-events-none flex items-start justify-center">
    <div className="w-full h-11/12 mt-5 pointer-events-none flex items-start justify-center ">
      <Draggable nodeRef={nodeRef} bounds="parent">
        {ui.isMac ? (<div ref={nodeRef} 
        className="w-1/3 h-1/2 mt-4 bg-black/50 backdrop-blur-lg rounded-2xl border border-gray-400/30 shadow-lg p-2 text-white flex items-start justify-between select-none pointer-events-auto">
          <div className='w-full h-full flex flex-col'>
            <div className="relative group w-3 h-3 bg-red-500 rounded-full  mr-2 mb-6 flex items-center justify-center transform transition-transform ease-in-out hover:scale-125"
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            onTouchEnd={(e) => { e.preventDefault(); e.stopPropagation(); onClose(); }}>
              {/* X appears only on hover */}
              <span className="text-[8px] text-red-800 font-extrabold opacity-0 group-hover:opacity-100">
                      ✕
              </span>
            </div>
            <div className='h-full bg-gray-700/50 backdrop-blur-lg rounded-xl border border-gray-300/80 shadow-lg'>
              <div className='w-full text-md font-bold tracking-wider flex flex-col items-center'>
                <div className='w-32 h-32 rounded-full overflow-hidden shadow-lg mt-4 mb-2'>
                      <img src={profilePic} alt="Profile Picture"   draggable="false"
                      className="select-none pointer-events-none"/>
                </div> 
                <div className='text-lg font-semibold tracking-wider'>
                  Asmit Singh Chauhan
                </div>
                <div className='font-normal'>+91 88670 96611</div>
                <div className='w-2/3 mt-4 flex justify-evenly'>

                  <div className="flex flex-col items-center">
                    <img src={linkedinLogo} 
                      alt="LinkedIn" 
                      className="w-12 h-12 rounded-full overflow-hidden" 
                      draggable="false" 
                      onClick={() => {
                        window.open("https://www.linkedin.com/in/asmit-chauhan/", "_blank");
                      }} />
                    <p className='font-normal' >LinkedIn</p>
                  </div>

                  <div className="flex flex-col items-center">
                    <img src={mailLogo} 
                      alt="Email" 
                      className="w-12 h-12 rounded-full overflow-hidden" 
                      draggable="false" 
                      onClick={() => {
                        window.open("mailto:blr.asmit@gmail.com", "_blank");
                      }} />
                    <p className='font-normal'>Email</p>
                  </div>

                  <div className="flex flex-col items-center">
                    <img src={githubLogo} 
                      alt="Email" 
                      className="w-12 h-12 rounded-full overflow-hidden" 
                      draggable="false" 
                      onClick={() => {
                        window.open("https://github.com/GoodGuySavitar", "_blank");
                      }} />
                    <p className='font-normal'>GitHub</p>
                  </div>
                </div>
              </div>
            </div>
          </div>     
        </div>
      ) : (
        <div ref={nodeRef} className='w-1/3 h-1/2 bg-[#c3c3c3] text-black border-3
        border-l-white border-t-white shadow pointer-events-auto select-none flex flex-col overflow-hidden'>
           <div className='w-full h-8 flex justify-between items-center bg-[#000082] shrink-0'>
               <div className='text-lg text-white flex items-center ml-1'>
                   Contacts
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
           <div className='w-full flex-1 min-h-0 mt-2'>
            <div className='w-full h-full flex flex-col items-center justify-start overflow-auto scrollbar-win95 p-2'>
              <div className='w-32 h-32 sm:w-40 sm:h-40 flex justify-center items-center 
                    border-2 border-t-white border-l-white border-b-[#828282] border-r-[#828282]'>
                  <div className='w-28 h-28 sm:w-36 sm:h-36'>
                      <img src={profilePic} alt="Profile Picture"   draggable="false"
                    className="select-none pointer-events-none"/>
                  </div>
                </div>
                <div className='text-lg font-semibold tracking-wider'>
                  Asmit Singh Chauhan
                </div>
                <div className='font-normal'>
                  +91 88670 96611
                </div>
                <div className='w-2/3 mt-4 flex justify-evenly'>
                  <div className="flex flex-col items-center">
                    <img src={linkedinWin} alt="LinkedIn" className="w-12 h-12 rounded-full overflow-hidden" draggable="false" onClick={() => { window.open("https://www.linkedin.com/in/asmit-chauhan/", "_blank"); }} />
                    <p className='font-normal' >LinkedIn</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <img src={gmail} alt="Email" className="w-12 h-12 rounded-full overflow-hidden" draggable="false" onClick={() => { window.open("mailto:blr.asmit@gmail.com", "_blank"); }} />
                    <p className='font-normal'>Email</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <img src={githubWin} alt="Email" className="w-12 h-12 rounded-full overflow-hidden" draggable="false" onClick={() => { window.open("https://github.com/GoodGuySavitar", "_blank"); }} />
                    <p className='font-normal'>GitHub</p>
                  </div>
                </div>
              </div>
            </div>
       </div>
      )}
      </Draggable>
    </div>
    </div>
  )
}



export default Contact