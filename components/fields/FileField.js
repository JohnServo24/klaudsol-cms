import { useRef } from "react";
import { useFormikContext, useField } from "formik";
import AppButtonLg from "../klaudsolcms/buttons/AppButtonLg";

const FileField = (props) => {
  const inputRef = useRef();
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  const { onChange, value, ...formattedField } = field;

  const setFileValue = (e) => {
    const file = e.target.files[0];

    setFieldValue(field.name, file);
  };

  const openUploadMenu = () => inputRef.current.click();

  // Temporary. Create css class later. Can't think of a name right now
  const styles = {
    display: "flex",
    justifyContent: "center",
    position: "relative",
  };

  const buttonStyle = {
    position: "absolute",
    top: "0",
    right: "0",
    bottom: "0",
    // For aliging with the input
    // The input has a marginBottom: .5rem for some reason
    marginBottom: "0.5rem",
  };

  return (
    <div style={styles}>
      <input
        type="file"
        {...props}
        {...formattedField}
        onChange={setFileValue}
        hidden="hidden"
        ref={inputRef}
      />
      <span className={props.className}>
        {value instanceof File ? value.name : value.originalName}
      </span>
      <AppButtonLg
        title="Browse..."
        className="btn_general_lg--invert_colors"
        style={buttonStyle}
        onClick={openUploadMenu}
      />
    </div>
  );
};

export default FileField;

// NOTES:
// This is an extension of the formik library, so this component only works if
// it is a child of a <Formik> component. It takes in a file as an input, then
// saves it as form data on state.

// HOW IT WORKS:
// This field accepts all of the atrributes of an input, and two special attributes:
// The 'name' of the <Field> element to mirror (fieldToMirror), and the optional
// format function (format). We need the name of the <Field> element that
// we need to mirror so that we can mirror it, and the format function lets us
// format our mirrored input.
