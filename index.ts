import Source2Project from "./valve/source2";
import Vmap from "./valve/vmap";

const source2Project = new Source2Project('D:/SteamLibrary/steamapps/common/Half-Life Alyx/content/hlvr_addons', 'test');

source2Project.create();
source2Project.indexFiles();
// source2Project.processFiles();

const vmap = new Vmap();
vmap.load(source2Project.files);

