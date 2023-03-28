import * as fs from 'fs';
import * as path from 'path';
import vmat from './vmat';
import vmdl from './vmdl';

class Source2Project {

    public readonly addonRoot: string;
    public readonly projectName: string;

    public readonly files: string[] = [];

    constructor(addonRoot: string, projectName: string){
        this.addonRoot = addonRoot;
        this.projectName = projectName;
    }

    create() {
        if(fs.existsSync(path.join(this.addonRoot, this.projectName))){
            console.error('Project: ' + '\'' + this.projectName + '\' already exists.');
            return false;
        }
        console.log('Creating empty project: \'' + this.projectName + '\':');
        console.log('Project Location:', path.join(this.addonRoot, this.projectName));
        fs.mkdirSync(path.join(this.addonRoot, this.projectName));
        fs.mkdirSync(path.join(this.addonRoot, this.projectName, 'materials'));
        fs.mkdirSync(path.join(this.addonRoot, this.projectName, 'models'));
        fs.mkdirSync(path.join(this.addonRoot, this.projectName, 'soundevents'));
        fs.mkdirSync(path.join(this.addonRoot, this.projectName, 'resourcemanifests'));
        fs.mkdirSync(path.join(this.addonRoot, this.projectName, 'resources'));
        return true;
    }

    indexFiles(root: string = path.join(this.addonRoot, this.projectName, 'resources')) {
        fs.readdirSync(root, { withFileTypes: true }).forEach((dirent: fs.Dirent) => {
            if(dirent.isFile()){
                this.files.push(path.join(root, dirent.name));
            }else if(dirent.isDirectory()) {
                this.indexFiles(path.join(root, dirent.name));
            }
        });
    }

    processFiles() {
        this.files.forEach((file: string) => {
            this.processFile(file);
        })
    }

    processFile(file: string) {
        const fileType = file.split('.')[1].toLowerCase();
        switch(fileType) {
            case 'png':
            case 'tga':
            case 'jpg':
            case 'jpeg':
                return vmat.processImage(file, path.join(this.addonRoot, this.projectName, 'materials'));
            case 'obj':
                return vmdl.processObj(file, path.join(this.addonRoot, this.projectName, 'models'));
            case 'mtl':
                return vmdl.processMtl(file);
            // case "csv":
                // return processCsv(file);
        }
    }
}

export default Source2Project;