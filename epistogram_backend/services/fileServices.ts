import fs from "fs"
const { NodeSSH } = require('node-ssh')
const ssh = new NodeSSH()
import { UploadedFile } from "express-fileupload";
import { globalConfig } from "../server";


export const getFileExtension = (fileName: string) => {
    console.log("FileName: " + fileName)
    return (fileName.substr(fileName.lastIndexOf('.') + 1))
}

export const createFile = (file: UploadedFile, localpath: string, fileName: string) => {
    //console.log("Ez a privateKey: " + config.scpConfig.privateKey)
    if (!fs.existsSync("./temp/")) {
        fs.mkdir("./temp/", { recursive: true }, err => { return err });
    } else {
        fs.mkdir("./temp/", { recursive: true }, err => { return err });
    }
    file.mv('./temp/' + file.name.toLowerCase()).then(() => {
        console.log("The file moved successfully")
    }).catch((e) => {
        console.log(e)
    })

    const scpConfig = {
        host: globalConfig.vps.host,
        port: globalConfig.vps.scpPort,

        username: globalConfig.vps.username,
        passphrase: globalConfig.vps.passphrase,

        privateKey: globalConfig.vps.privateKey
    }

    ssh.connect(scpConfig).then(() => {
        console.log("./temp/" + file.name)
        ssh.putFile("./temp/" + file.name.toLowerCase(), localpath + "/" + fileName + "." + getFileExtension(file.name.toLowerCase()))
            .then(() => {
                fs.rm("./temp/" + file.name.toLowerCase(), () => {
                    console.log("Ideiglenes fájl törölve")
                })
                console.log("File feltöltve")
            })
            .catch((error: string) => {
                console.log(error.toString())
            })
    }).catch((e: any) => console.log(e))
    /*if (!fs.existsSync(path)){
        fs.mkdir(path,{recursive: true}, err => {return err});
    } else {
        fs.mkdir(path,{recursive: true}, err => {return err});
    }
    file.mv(`${path}/${name}.${extension}`)
    fs.rename('./',`${path}/${name}.${extension}`, (err) => {
        throw new Error("A fájl feltöltése sikertelen: " + err)
    })*/
}

export const searchImages = async (path: string) => {
    return fs.readdirSync(path);
}


