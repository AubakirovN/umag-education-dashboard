import React from "react";
import { CKEditor, type CKEditorProps } from "ckeditor4-react";

const BaseCKEditor: React.FC<CKEditorProps<unknown>> = (props) => {
  return (
    <div>
      <CKEditor
        config={{
          pasteFromWord_inlineImages: true,
          fontSize_sizes:
            "8/8px;10/10px;12/12px;14/14px;16/16px;18/18px;20/20px;22/22px;24/24px;48/48px;72/72px;",
          toolbar: "Full",
          extraPlugins: "colorbutton, print, font, pastefromwordimage, uploadimage",
          colorButton_enableMore: false,
          versionCheck: false,
        }}
        {...props}
      />
    </div>
  );
};

export default BaseCKEditor;

