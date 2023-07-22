const { Storage } = require('@google-cloud/storage');
const { format } = require('util');
const env = require('../config/env');
const url = require('url');
const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();

const storage = new Storage({
    projectId: "chicas-bc0ed",
    keyFilename: './serviceAccountKey.json'
});

const bucket = storage.bucket("gs://chicas-bc0ed.appspot.com/");




/**
//  * Subir el archivo a Firebase Storage
//  * @param {File} file objeto que sera almacenado en Firebase Storage
//  * @param {string} pathImage ruta del archivo en Firebase Storage
//  * @param {string} deletePathImage ruta del archivo a eliminar en Firebase Storage
//  */



module.exports = (file, pathImage, deletePathImage) => {
    return new Promise((resolve, reject) => {
        if (deletePathImage) {
            if (deletePathImage != null || deletePathImage != undefined) {
                const parseDeletePathImage = url.parse(deletePathImage);
                var ulrDelete = parseDeletePathImage.pathname.slice(23);
                const fileDelete = bucket.file(`${ulrDelete}`);
                fileDelete
                    .delete()
                    .then((imageDelete) => {
                        console.log('Se borró la imagen con éxito');
                        uploadFile(); // Llamada a uploadFile() después de eliminar la imagen
                    })
                    .catch((err) => {
                        console.log('Error al borrar la imagen:', err);
                        reject('Failed to remove photo. Unable to upload at the moment.');
                    });
            }
        } else {
            uploadFile();
        }

        function uploadFile() {
            if (pathImage) {
                if (pathImage != null || pathImage != undefined) {
                    let fileUpload = bucket.file(`${pathImage}`);
                    let stream = fileUpload.createWriteStream();
                    const blobStream = stream.pipe(
                        fileUpload.createWriteStream({
                            metadata: {
                                contentType: 'image/png',
                                metadata: {
                                    firebaseStorageDownloadTokens: uuid,
                                },
                            },
                            resumable: false,
                        })
                    );

                    blobStream.on('error', (error) => {
                        console.log('Error al subir archivo a Firebase:', error);
                        reject('Something is wrong! Unable to upload at the moment.');
                    });

                    blobStream.on('finish', () => {
                        const url = format(
                            `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${fileUpload.name}?alt=media&token=${uuid}`
                        );
                        console.log('URL DE CLOUD STORAGE', url);
                        resolve(url);
                    });

                    blobStream.end(file.buffer);
                }
            }
        }
    });
};




// const { Storage } = require('@google-cloud/storage');
// const { format } = require('util');
// const env = require('../config/env')
// const url = require('url');
// const { v4: uuidv4 } = require('uuid');
// const uuid = uuidv4();

// const storage = new Storage({
//     projectId: "chicas-bc0ed",
//     keyFilename: './serviceAccountKey.json'
// });

// const bucket = storage.bucket("gs://chicas-bc0ed.appspot.com/");

// /**
//  * Subir el archivo a Firebase Storage
//  * @param {File} file objeto que sera almacenado en Firebase Storage
//  * @param {string} pathImage ruta del archivo en Firebase Storage
//  * @param {string} deletePathImage ruta del archivo a eliminar en Firebase Storage
//  */
// module.exports = (file, pathImage, deletePathImage) => {
//     return new Promise((resolve, reject) => {
//         if (deletePathImage) {
//             if (deletePathImage != null || deletePathImage != undefined) {
//                 const parseDeletePathImage = url.parse(deletePathImage);
//                 var ulrDelete = parseDeletePathImage.pathname.slice(23);
//                 const fileDelete = bucket.file(`${ulrDelete}`);

//                 fileDelete
//                     .delete()
//                     .then((imageDelete) => {
//                         console.log('Se borró la imagen con éxito');
//                         uploadFile(); // Llamada a uploadFile() después de eliminar la imagen
//                     })
//                     .catch((err) => {
//                         console.log('Error al borrar la imagen:', err);
//                         reject('Failed to remove photo. Unable to upload at the moment.');
//                     });
//             }
//         } else {
//             uploadFile();
//         }

//         function uploadFile() {
//             if (pathImage) {
//                 if (pathImage != null || pathImage != undefined) {
//                     let fileUpload = bucket.file(`${pathImage}`);
//                     let stream = fileUpload.createWriteStream();
//                     const blobStream = stream.pipe(
//                         fileUpload.createWriteStream({
//                             metadata: {
//                                 contentType: 'image/png',
//                                 metadata: {
//                                     firebaseStorageDownloadTokens: uuid,
//                                 },
//                             },
//                             resumable: false,
//                         })
//                     );

//                     blobStream.on('error', (error) => {
//                         console.log('Error al subir archivo a Firebase:', error);
//                         reject('Something is wrong! Unable to upload at the moment.');
//                     });

//                     blobStream.on('finish', () => {
//                         // La URL pública se puede usar para acceder directamente al archivo mediante HTTP.
//                         const url = format(
//                             `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${fileUpload.name}?alt=media&token=${uuid}`
//                         );
//                         console.log('URL DE CLOUD STORAGE', url);
//                         resolve(url);
//                     });

//                     blobStream.end(file.buffer);
//                 }
//             }
//         }
//     });
// };









// // const { Storage } = require('@google-cloud/storage');
// // const { format } = require('util');
// // const env = require('../config/env')
// // const url = require('url');
// // const { v4: uuidv4 } = require('uuid');
// // const uuid = uuidv4();


// // const storage = new Storage({
// //     projectId: "chicas-bc0ed",
// //     keyFilename: './serviceAccountKey.json'
// // });

// // const bucket = storage.bucket("gs://chicas-bc0ed.appspot.com/");

// // /**
// //  * Subir el archivo a Firebase Storage
// //  * @param {File} file objeto que sera almacenado en Firebase Storage
// //  */
// // module.exports = (file, pathImage, deletePathImage) => {
// //     return new Promise((resolve, reject) => {

// //         console.log('delete path', deletePathImage)
// //         if (deletePathImage) {

// //             if (deletePathImage != null || deletePathImage != undefined) {
// //                 const parseDeletePathImage = url.parse(deletePathImage)
// //                 var ulrDelete = parseDeletePathImage.pathname.slice(23);
// //                 const fileDelete = bucket.file(`${ulrDelete}`)

// //                 fileDelete.delete().then((imageDelete) => {

// //                     console.log('se borro la imagen con exito')
// //                 }).catch(err => {
// //                     console.log('Failed to remove photo, error:', err)
// //                 });

// //             }
// //         }


// //         if (pathImage) {
// //             if (pathImage != null || pathImage != undefined) {

// //                 let fileUpload = bucket.file(`${pathImage}`);
// //                 let stream = fileUpload.createWriteStream();
// //                 const blobStream = stream.pipe(fileUpload.createWriteStream({
// //                     metadata: {
// //                         contentType: 'image/png',
// //                         metadata: {
// //                             firebaseStorageDownloadTokens: uuid,
// //                         }
// //                     },
// //                     resumable: false

// //                 }));

// //                 blobStream.on('error', (error) => {
// //                     console.log('Error al subir archivo a firebase', error);
// //                     reject('Something is wrong! Unable to upload at the moment.');
// //                 });

// //                 blobStream.on('finish', () => {
// //                     // The public URL can be used to directly access the file via HTTP.
// //                     const url = format(`https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${fileUpload.name}?alt=media&token=${uuid}`);
// //                     console.log('URL DE CLOUD STORAGE ', url);
// //                     resolve(url);
// //                 });

// //                 blobStream.end(file.buffer);
// //             }
// //         }
// //     });
// // }