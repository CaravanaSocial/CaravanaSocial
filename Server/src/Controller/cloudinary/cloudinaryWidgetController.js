


const uploadFile = async (file) => {

    if (!file) {
      throw new Error('No file provided')
    }
  
 
    cloudinary.uploader.upload(file.path, (error, result) => {
      if (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw new Error("Error uploading file")
      } else {
        console.log('File uploaded to Cloudinary:', result);
        
       return result;
      }
    });
}

module.exports ={
    uploadFile
}