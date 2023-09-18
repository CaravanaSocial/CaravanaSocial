import React from 'react'
import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';
import { Quill } from 'react-quill';
import { ImageActions } from '@xeger/quill-image-actions';
import { ImageFormats } from '@xeger/quill-image-formats';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2';
import * as actions from '../../Redux/Actions/Actions'

Quill.register('modules/imageActions', ImageActions);
Quill.register('modules/imageFormats', ImageFormats);


const modules = {
    imageActions: {},
    imageFormats: {},
    toolbar:  [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ header: 1 }, { header: 2 }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [
        {
          color: [],
        },
        { background: [] },
      ],
      [{ font: [] }],
      [{ align: [] }],
      ["link", "image"],
      ["clean"],
    ],
  };
const formats = [ "align", "width", "bold", "italic", "underline", "blockquote", "header", "script", "code-block", "strike", "size", "color", "background", "font", "image", "align", "calltoaction", "link", "height", "float", "imagewithstyle", ]
const fecha = new Date() 
const day = fecha.getDate()
const month = fecha.getMonth()
const year = fecha.getFullYear()
const nombresMeses = ['Enero', 'Febrero', 'Marzo', 'Abril','Mayo', 'Junio', 'Julio', 'Agosto','Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];


  


export default function PresetBlog(){

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const created = useSelector(state => state.createdBlog)
    const [template, setTemplate] = React.useState('');

    const [activeButton, setActiveButton] = React.useState({
        editor:false,
        previewEdit:false
    })

    const [previewImage, setPreviewImage] = React.useState('image')

    const [previewCard, setPreviewCard] = React.useState({
        image: 'image',
        title:'Titulo',
        author:'Autor',
        date: `${day} ${nombresMeses[month]} ${year}`
    })

    const {image, title, author, date} = previewCard

    
    const handleClickButton = (event) => {
        event.preventDefault()
        const {name} = event.target
        setActiveButton(
            {...activeButton,[name]:!activeButton[name]}
            )
    }

    function imageToBase64 (file){
      const reader = new FileReader()

      reader.onload = (event) => {
        const base64 = event.target.result
        setPreviewCard({...previewCard, image:base64})
      }

      reader.readAsDataURL(file)
    }

    const handleChange = (event)=>{
        const{ name, value, files }= event.target;
        if(name=="previewImage"){
            imageToBase64(files[0])
            setPreviewImage(files[0])
        }else{
            setPreviewCard ({...previewCard,[name]:value})
        }
    }
    

    const handleSubmit = ()=>{
      dispatch(actions.postBlog({template, image, title, author, date}))
      Swal.fire(
        'Buen trabajo!',
        'Has creado con exito el Post!',
        'success'
      )
      setTimeout(function ok(){navigate(`/blog/${created}`)}, 2000)
    }

    return (
        <div>
        <div className="bg-white-200 h-full flex justify-center items-center pt-9 my-5">
      <div className="w-4/5 flex flex-col justify-center items-center">
        <h1 className='text-3xl mb-10' >Crear nuevo Post</h1>
        <div className="justify-center items-center border rounded-lg border-gray-400 shadow-md p-4 w-[400px]">
          {!activeButton?.previewEdit ? 
            <img src={previewImage!=='image'?URL.createObjectURL(previewImage):'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWHyZc-mwHF19kk-e89eFaKsc19552ElAuzOpV8Dwxhw&s'} alt="Blog image" className="w-full h-48 object-cover rounded-t-lg" />
           : null}
          {activeButton?.previewEdit ? (
            <input type='file' name='previewImage' onChange={handleChange} />
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
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleSubmit}>Publicar Blog</button>
        </div>
      
      </div>
    </div>
    <div>
    {activeButton?.editor ? (
      <ReactQuill className="mx-10 mb-10" theme="snow" value={template} onChange={setTemplate} modules={modules} formats={formats} />
    ) : null}
  </div>
  </div>
  );
}
   

