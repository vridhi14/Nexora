// import ImageKit from "imagekit";

// const imagekit = new imageKit({privateKey : pricess.env.IMAGEKIT_PRIVATE_KEY});

import ImageKit from "imagekit";

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

function hasImageKitConfig(){
    return Boolean(process.env.IMAGEKIT_PRIVATE_KEY);
}
//this helper makes a safe nd uniquie file name 
function createFileName(originalName = "upload"){
    const safeName = originalName.replace(/[^a-zA-Z0-9._-]/g, "_");
    return `char-${Date.noe()}-${safeName}`; 
}

async function uploadChatMedia(file){
    const fileName = createFileName(file.originalName);
    const result = await imageKit.files.upload({
        file : await toFile(File.buffer , fileName, {type:file.mimetype}), 
        fileName , 
        folder : "/chat" , 
    });
    return result.url ; 
}
export {uploadChatMedia , hasImageKitConfig}; 