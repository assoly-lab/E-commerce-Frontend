import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";



export default function FlyOut({children,FlyoutContent,width }: {children: React.ReactNode,FlyoutContent: React.ReactNode,width:string}){
    const [open, setOpen] = useState(false);

  
    return (
      <div
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="relative w-fit h-fit"
      >
        <span  className="group text-black">
          {children}
          <span
            style={{
              transform: open ? "scaleX(1)" : "scaleX(0)",
            }}
            className='absolute -bottom-2 -left-0 right-0  h-1 origin-left scale-x-0 rounded-full bg-[#e76642] transition-transform duration-300 ease-out' 
          />
        </span>
        <AnimatePresence>
          { open &&(
            <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            style={{ translateX: "-50%",width:width && `${width}px` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute h-fit left-1/2 top-12 bg-[#fdfdfd] shadow-xl text-black rounded-md z-50  "
            >
              <div className="absolute -top-6 left-0 right-0 h-12 bg-transparent" />
              <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#fdfdfd]" />
              {FlyoutContent}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };





  