import React, { useState, useRef } from 'react'
import useDeepEffect from 'utils/hooks/useDeepEffect'

const EditerCk = props => {
    const { textData, changeEditor } = props
    const [editorLoaded, setEditorLoaded] = useState(false)
    const editorRef = useRef()
    const { CKEditor, ClassicEditor } = editorRef.current || {}
    useDeepEffect(() => {
        editorRef.current = {
          CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
          ClassicEditor: require('@ckeditor/ckeditor5-build-classic')
        }
        setEditorLoaded(true)
      }, [])

     return<div>
       {editorLoaded?
         <CKEditor
         
         editor={ClassicEditor}
         data={textData}
        //  onReady={(editor) => {
        //    console.log('Editor is ready to use!', editor)
        //  }}
         onChange={(event, editor) => {
           const data = editor.getData()     
          //  console.log({ event, editor, data })
           changeEditor(data)
         }}
        //  onBlur={(event, editor) => {
        //    console.log('Blur.', editor)
        //  }}
        //  onFocus={(event, editor) => {
        //    console.log(editor)
        //  }}
       />:
       <div>loading...</div>
       }
     </div>
};

export default EditerCk;
