import Source2Project from "./valve/source2";
import Vmap from "./valve/vmap";
import * as fs from 'fs';

const source2Project = new Source2Project('D:/SteamLibrary/steamapps/common/Half-Life Alyx/content/hlvr_addons', 'test');

source2Project.create();
source2Project.indexFiles();
source2Project.processFiles();

const vmap = new Vmap();
vmap.load(source2Project.files);
vmap.write();

console.log('Loaded', vmap.entities.length, 'base entities.');
//console.log('Writing debug output.json');
//fs.writeFileSync('output.json', JSON.stringify(vmap));