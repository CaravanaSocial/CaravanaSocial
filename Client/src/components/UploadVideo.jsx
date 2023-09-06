import React, {useEffect, useRef} from 'react'


 


const UploadWidget = () => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    useEffect(()=>{
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current.createUploadWidget({
            cloudName:"da785kmjd",
            uploadPreset:"rdvhkotr"
        }, function(error, result){
            console.log(result);
        })
    }, [])

  return (
    <button onClick={()=> widgetRef.current.open()}>
        Upload
    </button>
  )
}

export default UploadWidget