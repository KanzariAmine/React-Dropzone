import React,{useRef, useState} from 'react'
import './DropZone.css'



function DropZone() {
  /**Create REf for the input  */
  const inputRef = useRef();

  const [hover,setHover] = useState(false);
  const [fileList, setFileList] = useState([])
  
  /**openDialogFile: Function to open dialog file. */
  const openDialogFile = () =>{
    inputRef.current.click();
  }

  /**StopEvent: Add this function in all event for drag && drop */
  const stopEvent = event => {
    event.preventDefault();
    event.stopPropagation();
  }

  const onDragOver = (event) =>{
    // console.log('Drag Hover');
    stopEvent(event);
    setHover(true)
  }

  const onDragLeave = (event) =>{
    // console.log('Drag Leave');
    stopEvent(event);
    setHover(false);
  }

  /**Get the item dropped on a valid target */
  const onDrop = (event) =>{
    stopEvent(event);
    let files = event.dataTransfer.files;
    let filesURL = fileListArray(files);
   
    setFileList([...fileList, filesURL])
  };

  /**Extract the coming data in simple array */
  const fileListArray = files => {
    for(let file of files){
      let url = createObjectURL(file)
      file["url"] = url;
      return file;
    }
  }
  
  /**Transforme the file in URL to display it in Browser */
  const createObjectURL = file =>{
    if(window.webkitURL){
      return window.webkitURL.createObjectURL(file)
    }else if(window.URL && window.URL.createObjectURL){
      return window.URL.createObjectURL(file);
    }else{
      return null;
    }
  }
  return (
    <>
    <div 
      className={hover ?  "drop-zone-container hover" : "drop-zone-container"} 
      onClick={openDialogFile} 
      onDragOver={onDragOver} 
      onDragLeave={onDragLeave} 
      onDrop={onDrop}
      >
      
      <label>
        Drag files to upload
        <input ref={inputRef} type="file" multiple/>
      </label>

    </div>
    <div className="image_list">
      <ul>
        {
          fileList.length ? fileList.map( file => 
            <li key={file.size}><img  src={file.url} alt={file.name}/></li>          
          )
          : null
        }
      </ul>
    </div>
    </>
  )
}

export default DropZone
