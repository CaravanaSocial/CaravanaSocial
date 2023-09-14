import React from 'react'
import style from './PresetBlog.module.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import UploadImage from '../UploadImage'

const modules = {
    toolbar: [
        ['bold', 'italic', 'underline', 'strike'],  
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'font': [] }],
        [{ 'color': [] }, { 'background': [] }],          
        [{ 'align': [] }],

        ['image'],

        ['blockquote', 'code-block'],
               
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      
        [{ 'indent': '-1'}, { 'indent': '+1' }],         
        [{ 'direction': 'rtl' }],       
              
        ['clean'] 
    ],
  };

  const formats = [
    'header', 'font', 'list', 'bold', 'italic', 'underline', 'align', 'link', 'image'
  ];

  const fecha = new Date() 
  const day = fecha.getDate()
  const month = fecha.getMonth()
  const year = fecha.getFullYear()
  const nombresMeses = ['Enero', 'Febrero', 'Marzo', 'Abril','Mayo', 'Junio', 'Julio', 'Agosto','Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

 

export default function PresetBlog(){


    const [value, setValue] = React.useState('');

    console.log(value)

    const [activeButton, setActiveButton] = React.useState({
        editor:false,
        previewEdit:false
    })

    const [previewCard, setPreviewCard] = React.useState({
        image: 'image',
        title:'Titulo',
        author:'Autor',
        date: `${day} ${nombresMeses[month]} ${year}`
    })

    
    const handleClickButton = (event) => {
        event.preventDefault()
        const {name} = event.target
        setActiveButton(
            {...activeButton,[name]:!activeButton[name]}
            )
    }

    const handleChange = (event)=>{
        const{ name , value}= event.target;
        if(name=="image"){
            const [file] = event.target.files
            setPreviewCard({...previewCard,[name]:file})
        }else{
            setPreviewCard ({...previewCard,[name]:value})
        }
    }

    return (
        <div>
        <div className="bg-gray-200 min-h-screen flex justify-center items-center pt-9">
      <div className="w-4/5 flex flex-col justify-center items-center">
        <h1 className='text-3xl mb-10' >Crear nuevo Post</h1>
        <div className="bg-white rounded-lg p-4 shadow-md text-center" style={{ width: "400px" }}>
          {!activeButton?.previewEdit ? 
            <img src={previewCard?.image!=='image'?URL.createObjectURL(previewCard.image):'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWHyZc-mwHF19kk-e89eFaKsc19552ElAuzOpV8Dwxhw&s'} alt="Blog image" className="w-full h-48 object-cover rounded-t-lg" />
           : null}
          {activeButton?.previewEdit ? (
            <input type='file' name='image' onChange={handleChange} />
          ) : null}

          {/* Title */}
          <div className="w-full rounded-t-lg mb-1 text-3xl font-bold text-left">
            {!activeButton?.previewEdit ? <h1>{previewCard.title}</h1> : null}
            {activeButton?.previewEdit ? <input type="text" onChange={handleChange} value={previewCard.title} name='title' /> : null}
          </div>

          {/* Author */}
          <div className="text-xl font-semibold mt-2 text-left mb-2">
            {!activeButton?.previewEdit ? <h2>{previewCard.author}</h2> : null}
            {activeButton?.previewEdit ? <input type="text" onChange={handleChange} value={previewCard.author} name='author' /> : null}
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center px-2">
            {!activeButton.previewEdit ? (
              <button className="text-blue-600" onClick={handleClickButton} name='previewEdit'>Editar</button>
            ) : (
              <button className='text-2xl' onClick={handleClickButton} name='previewEdit'>✅</button>
            )}
            <p className="text-gray-600">{previewCard.date}</p>
          </div>
        </div>
        <div className="flex gap-1 justify-center mt-3 mb-6">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" name="editor" onClick={handleClickButton}>Editar Post</button>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Publicar Blog</button>
        </div>
      
      </div>
    </div>
    <div className={style.editorContainer}>
    {activeButton?.editor ? (
      <ReactQuill className={style.editor} theme="snow" value={value} onChange={setValue} modules={modules} formats={formats} />
    ) : null}
  </div>
  </div>
  );
}
   

