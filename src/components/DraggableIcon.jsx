import React, { useContext } from 'react'
import { useRef } from 'react'
import Draggable from 'react-draggable'
import { UiContext } from './Body'

const DraggableIcon = ({src, label, func}) => {
    const nodeRef = useRef(null)
    const ui = useContext(UiContext)

    const handleClick = () => {
        const isCoarsePointer = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: coarse)').matches
        if (isCoarsePointer) func()
    }

    const handleTouchEnd = (e) => {
        e.preventDefault()
        e.stopPropagation()
        func()
    }

    //MAKES A BASE DRAGGABLE ICON THAT CAN BE USED THROUGHOUT THE APP
    return (
        <Draggable nodeRef={nodeRef} 
        bounds="parent">
            {ui.isMac ? (<div ref={nodeRef} className='w-24 flex flex-col items-center justify-center mb-2 select-none transition-colors active:bg-blue-200/40 active:backdrop-blur-lg rounded-sm pr-1 pl-1 active:cursor-grabbing border border-transparent active:border-black/50 border-solid' onDoubleClick={func} onClick={handleClick} onTouchEnd={handleTouchEnd}>
                <img src={src} alt={label}  className='w-16 mx-auto' draggable={false} />
                <div className='w-full text-center text-md text-white mb-2 leading-tight break-words px-1'>{label}</div> 
            </div>
            ) : (
                <div ref={nodeRef} className='w-20 flex flex-col items-center justify-center mb-2 select-none transition-colors active:bg-blue-100/60 rounded-sm pr-1 pl-1 active:cursor-grabbing border border-transparent active:border-black/50 border-solid' onDoubleClick={func} onClick={handleClick} onTouchEnd={handleTouchEnd}>
                <img src={src} alt={label} className='w-12 mx-auto' draggable={false} />
                <div className='w-full text-center text-md text-white mb-2 leading-tight break-words px-1'>{label}</div> 
                </div>
            )}
        </Draggable>
    )
}

export default DraggableIcon