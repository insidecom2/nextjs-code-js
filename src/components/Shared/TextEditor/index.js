import React, { useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react'

const TextEditor = (props) => {
  const { textData, changeEditor } = props
  const editorRef = useRef(null)
  // const log = () => {
  //   if (editorRef.current) {
  //     console.log(editorRef.current.getContent())
  //   }
  // }

  return (
    <div>
      <Editor
        // onInit={(evt, editor) => (editorRef.current = editor)}
        onKeyUp={(evt,editor) => changeEditor(editor.getContent())}
        initialValue={textData}
        init={{
          height: 500,
          menubar: false,
          image_advtab: true,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar:
            'undo redo | formatselect | ' +
            'bold italic backcolor | image | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style:
            'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          image_list: [
            {
              title: 'My image 1',
              value:
                'https://i.pinimg.com/originals/4f/83/5f/4f835fc43e3552f4dfc9cb53f67cbf9e.jpg'
            },
            { title: 'My image 2', 
              value: 'http://www.moxiecode.com/my2.gif' 
            }
          ]
        }}
      />
    </div>
  )
}

export default TextEditor
