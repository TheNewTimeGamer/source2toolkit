import templater, { TKeyValues } from "../templates/templater";
import * as path from 'path';

export default {
    processImage: (file: string, output: string) => {
        const fileArgs = file.split(path.sep);
        const fileName = fileArgs[fileArgs.length-1];

        const vmatFile = path.join(output, 'mat_' + fileName.split('.')[0] + '.vmat');
        const relativeFilePath = path.join('resources', file.split('resources')[1]).replace(/\\/g, "/");

        console.log('processing image:', relativeFilePath);
        console.log('output:', vmatFile);

        const values: TKeyValues = {};
        values['TEXTURE_FLAG_TRANS'] = '0';
        values['TEXTURE_COLOR_VALUE'] = relativeFilePath;
        values['TEXTURE_TRANS_VALUE'] = '';
        templater.write('template.vmat', values, vmatFile);
    }
}