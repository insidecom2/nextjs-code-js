import React, { useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react'

const TextEditor = (props) => {
  const { textData, changeEditor, clickCurSor } = props
  const editorRef = useRef(null)

  const putCurSor = async (evt, editor) => {
    await editor.selection.select(editor.getBody(), true).click()
    await editor.selection.collapse(false)
    await changeEditor(editor)
  }

  return (
    <div>
      <Editor
        onInit={(evt, editor) => putCurSor(evt, editor)}
        onClick={(evt, editor) => clickCurSor(evt, editor)}
        onEditorChange={(evt, editor) => changeEditor(editor)}
        initialValue={textData}
        init={{
          height: 800,
          menubar: false,
          image_advtab: true,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar:
            'undo redo | formatselect | ' +
            'bold italic backcolor  | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist  | link | ',
          content_style:
            'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
    </div>
  )
}

export default TextEditor
