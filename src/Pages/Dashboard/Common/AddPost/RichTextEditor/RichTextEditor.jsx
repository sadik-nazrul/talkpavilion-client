import { useRef } from "react";
import JoditEditor from "jodit-react";
import { Controller } from "react-hook-form";

const RichTextEditor = ({ control }) => {
  const editor = useRef(null);

  return (
    <div>
      <Controller
        name="postDescription"
        control={control}
        rules={{ required: "Post description is required" }}
        defaultValue=""
        render={({ field: { onChange, onBlur, value } }) => (
          <JoditEditor
            ref={editor}
            value={value}
            tabIndex={1}
            onBlur={onBlur}
            onChange={onChange}
          />
        )}
      />
    </div>
  );
};

export default RichTextEditor;
