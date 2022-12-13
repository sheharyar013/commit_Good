import "react-dropzone-uploader/dist/styles.css";

import React, { memo, useMemo } from "react";

import Dropzone from "react-dropzone-uploader";
import PropTypes from "prop-types";

// in bytes
const DEFAULT_FILE_SIZE = 10_485_760;

//eslint-disable-next-line
const Uploader = ({
  handleImageChange,
  accept = "image/*",
  index,
  name,
  initialFiles = [],
  multiple = false,
  maxSizeBytes = DEFAULT_FILE_SIZE,
}) => {
  const initialFilesMemoized = useMemo(() => initialFiles, []);
  return (
    <Dropzone
      initialFiles={initialFilesMemoized}
      multiple={multiple}
      onChangeStatus={(e, status) =>
        handleImageChange?.(e, status, name, index)
      }
      accept={accept}
      inputContent="Drag and Drop Files Here"
      maxSizeBytes={maxSizeBytes}
    />
  );
};

Uploader.propTypes = {
  handleImageChange: PropTypes.func,
  accept: PropTypes.string,
  index: PropTypes.number,
  name: PropTypes.string,
  initialFiles: PropTypes.array,
  multiple: PropTypes.bool,
  maxSizeBytes: PropTypes.number,
};

export default memo(Uploader);
