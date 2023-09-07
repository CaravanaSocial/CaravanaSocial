


const uploadFile = (file) => {

    if (!file) {
      return res.status(400).json({ error: 'No file provided' });
    }
  
 
    cloudinary.uploader.upload(file.path, (error, result) => {
      if (error) {
        console.error('Error uploading to Cloudinary:', error);
        res.status(500).json({ error: 'Error uploading file' });
      } else {
        console.log('File uploaded to Cloudinary:', result);
        
        res.json(result);
      }
    });
}

module.exports ={
    uploadFile
}