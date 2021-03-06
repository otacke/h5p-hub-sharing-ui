import React from 'react';
import PropTypes from 'prop-types';
import ImagePreview from './ImagePreview';

import './ImageUpload.scss';

const ImageUpload = ({onFile, clearImage, img, ariaLabel}) => {
  const input = React.createRef();

  /**
   * Handle image is selected
   */
  const handleChange = (event) => {

    if (event.target.files.length === 0) {
      return;
    }

    const file = event.target.files[0];
    onFile({
      src: URL.createObjectURL(file),
      file: file
    });
  };

  /**
   * Remove the image
   */
  const removeImage = () => {
    onFile({});
    if (clearImage) {
      clearImage();
    }
  };

  /**
   * Handle key events
   * @param  {Event} event
   */
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      // Enter means selecting a file
      input.current.click(); 
    }
    else if (['Delete', 'Backspace'].indexOf(event.key) !== -1) {
      // Delete or backspace means removing the image
      removeImage();
    }
  }

  return (
    <div className="image-upload-container" role="button" tabIndex="0" onKeyDown={handleKeyDown} aria-label={ariaLabel}>
      { 
        img.src && (
          <>
            <ImagePreview src={img.src} />
            <span className="icon-close" onClick={removeImage}/>
          </>
        )
      }
      <div className={`image-upload ${img.src ? 'image-selected' : ''}`}>
        <input tabIndex="-1" ref={input} type="file" onChange={handleChange}/>
      </div>
    </div>
  );
};

ImageUpload.propTypes = {
  onFile: PropTypes.func.isRequired,
  clearImage: PropTypes.func,
  img: PropTypes.object.isRequired,
  ariaLabel: PropTypes.string.isRequired
};

export default ImageUpload;