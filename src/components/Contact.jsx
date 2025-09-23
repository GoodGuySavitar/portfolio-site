import React, { useRef } from 'react'
import Draggable from 'react-draggable'
import profilePic from '../assets/profilePic.jpeg'
import linkedinLogo from '../assets/Linkedin.png'
import mailLogo from '../assets/mail.png'
import githubLogo from '../assets/githubLogo.png'

const Contact = ({onClose}) => {
  const nodeRef = useRef(null)

  return (
    <div className="fixed inset-0 pointer-events-none flex items-start justify-center">
    <div className="w-full h-11/12 mt-5 pointer-events-none flex items-start justify-center ">
      <Draggable nodeRef={nodeRef} bounds="parent">
        <div ref={nodeRef} 
        className="w-1/3 h-1/2 mt-4 bg-black/50 backdrop-blur-lg rounded-2xl border border-gray-400/30 shadow-lg p-2 text-white flex items-start justify-between select-none pointer-events-auto">
          <div className='w-full h-full flex flex-col'>
            <div className="relative group w-3 h-3 bg-red-500 rounded-full  mr-2 mb-6 flex items-center justify-center transform transition-transform ease-in-out hover:scale-125"
            onClick={onClose}>
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
                        window.open("https://github.com/GoodGuySavitar", "_blank");
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
      </Draggable>
    </div>
    </div>
  )
}



export default Contact