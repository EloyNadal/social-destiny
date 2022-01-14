import { writeFile, mkdir, readdir, rename, unlink } from 'fs/promises';
import { createReadStream, stat } from "fs";
import { Extract } from 'unzipper';

export const createManifestFile = async (directoryName, fileName, arrayBuffer) => {
    const controller = new AbortController();
    const { signal } = controller;

    await mkdir(directoryName);

    const data = new Uint8Array(arrayBuffer);
    await writeFile(fileName, data, { signal });
    
    return;
}

export const unzipFileAndDeleteZip = async (directoryName, fileName) => {

    await createReadStream(fileName)
        .pipe(Extract({ path: directoryName })).promise();

    await unlink(fileName);
}


