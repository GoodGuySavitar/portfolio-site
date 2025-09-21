import React from 'react'
import { useRef } from 'react'
import Draggable from 'react-draggable'

const DraggableIcon = ({src, label, func}) => {
    const nodeRef = useRef(null)
    
    //MAKES A BASE DRAGGABLE ICON THAT CAN BE USED THROUGHOUT THE APP
    return (
        <Draggable nodeRef={nodeRef} 
        bounds="parent">
            <div ref={nodeRef} className='flex flex-col items-center justify-center mb-2 select-none transition-colors active:bg-blue-200/40 active:backdrop-blur-lg rounded-sm pr-1 pl-1 active:cursor-grabbing border border-transparent active:border-black/50 border-solid'>
                <img src={src} alt={label} onDoubleClick={func} className='w-16' draggable={false} />
                <div className='text-md text-white mb-2'>{label}</div> 
            </div>
        </Draggable>
    )
}

export default DraggableIcon