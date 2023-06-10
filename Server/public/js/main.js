document.addEventListener('DOMContentLoaded', async () => {

    
    let filesResponse = await fetch('/upload');
    filesResponse = await filesResponse.json();
    const files = filesResponse.files;

    // affiche un apperçu des fichiers si fichier image
    const displayFiles = () => {
        const filesContainer = document.getElementById('filesContainer');
        // filesContainer.innerHTML = '';
        console.log(files);
        files.forEach(async (file) => {
            let format = file.split('.')[1];
            if(format == 'png' || format == 'jpg' || format == 'jpeg' || format == 'gif'){
                console.log("on passe ici");
                const fileContainer = document.createElement('div');
                fileContainer.classList.add('card');
                const filePreviewImg = document.createElement('img');
                let imgBrut = await fetch(`/upload/${encodeURIComponent(file)}`);
                imgBrut = await imgBrut.text();
                filePreviewImg.src = imgBrut;
                filePreviewImg.alt = file;
                filePreviewImg.classList.add('card-img');
                const fileTitle = document.createElement('div');
                fileTitle.classList.add('card-title');
                fileTitle.innerHTML = file;
                fileContainer.appendChild(fileTitle);
                fileContainer.appendChild(filePreviewImg);
                filesContainer.appendChild(fileContainer);
                fileContainer.addEventListener('click', () => {
                    window.open(`/upload/download/${encodeURIComponent(file)}`);
                });
            }else if(format == "zip" || format == "rar" || format == "7z" || format == "tar"){
                const fileContainer = document.createElement('div');
                fileContainer.classList.add('card');
                const filePreviewImg = document.createElement('img');
                filePreviewImg.src = '/img/zip.png';
                filePreviewImg.alt = file;
                filePreviewImg.classList.add('card-img');
                const fileTitle = document.createElement('div');
                fileTitle.classList.add('card-title');
                fileTitle.innerHTML = file;
                fileContainer.appendChild(fileTitle);
                fileContainer.appendChild(filePreviewImg);
                filesContainer.appendChild(fileContainer);
                fileContainer.addEventListener('click',  () => {
                    window.open(`/upload/download/${encodeURIComponent(file)}`);
                });
            }else if (format == "pdf"){
                const fileContainer = document.createElement('div');
                fileContainer.classList.add('card');
                const filePreviewImg = document.createElement('img');
                filePreviewImg.src = '/img/pdf.png';
                filePreviewImg.alt = file;
                const fileTitle = document.createElement('div');
                fileTitle.classList.add('card-title');
                fileTitle.innerHTML = file;
                filePreviewImg.classList.add('card-img');
                fileContainer.appendChild(fileTitle);
                fileContainer.appendChild(filePreviewImg);
                filesContainer.appendChild(fileContainer);
                fileContainer.addEventListener('click', () => {
                    window.open(`/upload/download/${encodeURIComponent(file)}`);
                });
            }
        });
    }

    displayFiles();


    const form = document.getElementById('form');

    const sendFile = async () =>{
        
        const file = document.getElementById('myFileInput').files;
        
        const formData = new FormData();    

        Object.keys(file).forEach(key => {
            formData.append(file.item(key).name, file.item(key));
        });

        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });

        const json = await response.json();

        console.log(json);
    }

    document.getElementById('myFileInput').addEventListener('change', (e) => {
        if(e.target.files.length > 0){
            sendFile();
            e.target.files = [];
        }
    });
});