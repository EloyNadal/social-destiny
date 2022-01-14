import { getManifest, getDbManifest } from "services/bungie/endpoints";
import { readdir, rename } from 'fs/promises';
import { createManifestFile, unzipFileAndDeleteZip } from "utils/files";

export default function handler(req, res) {

    if (req.method == 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
    }

    getManifest()
        .then(({ Response }) => {

            saveManifest(Response)
                .then(ok => res.status(200).json({result: 'success', message: 'manifest created'}))
                .catch(error => res.status(500).send({ message: error.message }));
        })
        .catch(error => res.status(500).send({ message: error.message }));
}


const existManifest = async (version) => {
    const directoriesNames = await readdir('./public/manifest/');
    return directoriesNames.filter(directory => directory === version).length;
}


async function saveManifest({ version, mobileWorldContentPaths }) {

    if(await existManifest(version)){
        return true;
    }

    const dirName = `./public/manifest/${version}`;
    const fileName = `./public/manifest/${version}/file_es.zip`;

    const arrayBuffer = await getDbManifest(mobileWorldContentPaths.es);

    await createManifestFile(dirName, fileName, arrayBuffer);
    await unzipFileAndDeleteZip(dirName, fileName);

    const files = await readdir(dirName);
    const file = files.filter(file => file.includes('.content'));

    if (file.length > 0) {
        await rename(`${dirName}/${file[0]}`, `${dirName}/database.db`);
    }

    return true;
}