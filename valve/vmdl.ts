import templater, { TKeyValues } from "../templates/templater";
import * as path from 'path';
import * as fs from 'fs';

const processObj = (file: string, output: string) => {
    const fileArgs = file.split(path.sep);
    const fileName = fileArgs[fileArgs.length-1];

    const vmatFile = path.join(output, fileName.split('.')[0] + '.vmdl');
    const relativeFilePath = path.join('resources', file.split('resources')[1]).replace(/\\/g, "/");

    console.log('processing model:', relativeFilePath);
    patchObj(file);
    console.log('output:', vmatFile);

    const values: TKeyValues = {};
    values['MESH_FILENAME'] = relativeFilePath;
    templater.write('template.vmdl', values, vmatFile);
}

const patchObj = (file: string) => {
    let data = fs.readFileSync(file).toString();
    if(data.includes('usemtl materials/mat_')){
        return false;
    }
    if(data.includes('usemtl materials/')){
        data = data.replace("usemtl materials/", "usemtl materials/mat_");
    }
    if(data.includes('usemtl mat_')){
        data = data.replace("usemtl ", "usemtl materials/");
    }else{
        data = data.replace("usemtl ", "usemtl materials/mat_");
    }
    return fs.writeFileSync(file, data);
}

const processMtl = (file: string) => {

}


export default {
    processObj: processObj,
    patchObj: patchObj,
    processMtl: processMtl
}