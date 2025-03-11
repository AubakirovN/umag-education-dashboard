import { CKEditor, type CKEditorProps } from "ckeditor4-react";

export const BaseCKEditor: React.FC<CKEditorProps<Object>> = (props) => {
  return (
    <CKEditor
      config={{
        pasteFromWord_inlineImages: true,
        fontSize_sizes:
          "8/8px;10/10px;12/12px;14/14px;16/16px;18/18px;20/20px;22/22px;24/24px;48/48px;72/72px;",
        toolbar: "Full",
        extraPlugins: "colorbutton, print, font",
        colorButton_enableMore: false,
        versionCheck: false,
      }}
      {...props}
    />
  );
};
