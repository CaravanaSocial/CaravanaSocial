import React from 'react'
import { useEffect, useRef} from 'react'

const VideoPlayer = ({videoUrl}) => {
    const cloudinaryRef = useRef()
    const videoRef = useRef()
    useEffect(()=>{
        if(cloudinaryRef.current) return;
        cloudinaryRef.current = window.cloudinary;
        cloudinaryRef.current.VideoPlayer(videoRef.current),{
            cloud_name: "da785kmjd"
        }
    }, [])
  return (
    <video
    ref={videoRef}
    data-cld-public-id={videoUrl}
    width={960}
    height={540}
    />
  )
}

export default VideoPlayer;