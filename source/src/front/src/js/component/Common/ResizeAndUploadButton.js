import React from 'react';
import "../../../css/component/Common/NavigationButton.module.css"

function ResizeAndDownloadButton() {
    const fileInputRef = React.createRef();

    const resizeImage = (file, maxWidth, maxHeight) => {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.src = URL.createObjectURL(file);

            image.onload = () => {
                const canvas = document.createElement('canvas');
                const aspectRatio = image.width / image.height;

                if (image.width > maxWidth || image.height > maxHeight) {
                    if (maxWidth / aspectRatio < maxHeight) {
                        canvas.width = maxWidth;
                        canvas.height = maxWidth / aspectRatio;
                    } else {
                        canvas.height = maxHeight;
                        canvas.width = maxHeight * aspectRatio;
                    }
                } else {
                    canvas.width = image.width;
                    canvas.height = image.height;
                }

                const ctx = canvas.getContext('2d');
                ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

                canvas.toBlob((blob) => {
                    const a = document.createElement("a");
                    document.body.appendChild(a);
                    a.style = "display: none";
                    a.href = URL.createObjectURL(blob);
                    a.download = file.name;
                    a.click();
                    window.URL.revokeObjectURL(a.href);
                    document.body.removeChild(a);
                }, 'image/jpeg', 1);
            };

            image.onerror = (err) => {
                reject(err);
            };
        });
    };

    const handleFileChange = async (e) => {
        const files = e.target.files;

        if (!files || files.length === 0) {
            alert('파일을 선택해주세요.');
            return;
        }

        const resizedFilePromises = Array.from(files).map(file => resizeImage(file, 470, 440));
        await Promise.all(resizedFilePromises);
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div>
            <input
                type="file"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleFileChange}
                multiple
                accept="image/*" // 여기서 이미지만 허용합니다.
            />
            <button className={"NavButton"} onClick={handleClick}   style={{ fontSize: "5px", width: 45, height:45  }}>썸네일 생성</button>
        </div>
    );
}

export default ResizeAndDownloadButton;
