import React, { useRef } from 'react';
import './FileUpload.css';

const FileUpload = ({ label, onChange, preview, accept, error }) => {
    const fileInputRef = useRef(null);

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            onChange(file);
        }
    };

    return (
        <div className="file-upload">
            <label className="file-upload-label">{label}</label>
            <div 
                className={`file-upload-area ${error ? 'error' : ''}`}
                onClick={handleClick}
            >
                {preview ? (
                    <div className="file-preview">
                        <img 
                            src={typeof preview === 'string' ? preview : URL.createObjectURL(preview)}
                            alt="Preview"
                        />
                    </div>
                ) : (
                    <div className="file-upload-placeholder">
                        <span className="upload-icon">📁</span>
                        <span>Click to upload</span>
                    </div>
                )}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept={accept}
                    onChange={handleChange}
                    style={{ display: 'none' }}
                />
            </div>
            {error && <div className="file-upload-error">{error}</div>}
        </div>
    );
};

export default FileUpload; 