document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('uploadForm');

    const sendFile = async () =>{
        
        const file = document.getElementById('fileToUpload').files;
        
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

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        sendFile();
    });
});