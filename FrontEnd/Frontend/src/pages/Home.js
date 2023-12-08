import React from "react";
import "../styles/Home.css";
import { useState, useRef } from "react";

function Home (props) {
    const fileInputRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    }

    const handleFileUpload = async (event) => {
        setIsLoading(true);
        const file = event.target.files[0];
        console.log(file);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsLoading(false);
    }

    const handleDragOver = (event) => {
        event.preventDefault();
    }

    const handleDrop = (event) => {
        event.preventDefault();
        if (event.dataTransfer.items) {
            const file = event.dataTransfer.items[0].getAsFile();
            console.log(file);
            handleFileUpload({target: {files: [file]}});
        }
    }

    return(
        <>
            <div className="home-container" onDragOver={handleDragOver} onDrop={handleDrop}>
                <div>
                    <h1>Code Coverage Tool</h1>
                </div>    
                <div className="home-main-div">
                    

                    <button className="upload-btn" onClick={handleButtonClick}>🔼 Upload</button>
                    <input type="file" ref={fileInputRef} onChange={handleFileUpload} style={{display: 'none'}} />
                    {isLoading && <p>Uploading...</p>}
                </div>
            </div>        
        </>
    );
}

export default Home;