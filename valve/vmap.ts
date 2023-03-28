import templater, { TKeyValues } from "../templates/templater";
import * as path from 'path';

class CMapEntity {

    originX: string;
    originY: string;
    originZ: string;

    angleX: string;
    angleY: string;
    angleZ: string;

    scaleX: string;
    scaleY: string;
    scaleZ: string;

    className: string;
    vmdlModel: string;

    children: CMapEntity[] = []

    constructor(className: string, originX: string, originY: string, originZ: string, angleX: string, angleY: string, angleZ: string, scaleX: string, scaleY: string, scaleZ: string, vmdlModel: string) {
        this.className = className;
        this.originX = originX;
        this.originY = originY;
        this.originZ = originZ;
        this.angleX = angleX;
        this.angleY = angleY;
        this.angleZ = angleZ;
        this.scaleX = scaleX;
        this.scaleY = scaleY;
        this.scaleZ = scaleZ;
        this.vmdlModel = vmdlModel;
    }

    toString(): string {
        const values: TKeyValues = {};
        values['CLASS_NAME'] = this.className;

        values['ORIGIN_X'] = this.originX;
        values['ORIGIN_Y'] = this.originY;
        values['ORIGIN_Z'] = this.originZ;

        values['ANGLE_X'] = this.angleX;
        values['ANGLE_Y'] = this.angleY;
        values['ANGLE_Z'] = this.angleZ;

        values['SCALE_X'] = this.scaleX;
        values['SCALE_Y'] = this.scaleY;
        values['SCALE_Z'] = this.scaleY;

        values['VMDL_MODEL'] = this.vmdlModel;

        values['VMAP_CHILDREN'] = '';
        if(this.children.length > 0) {
            this.children.forEach((child: CMapEntity, index: number) => {
                values['VMAP_CHILDREN'] = values['VMAP_CHILDREN'] + child.toString();
                if(index < this.children.length - 1){
                    values['VMAP_CHILDREN'] = values['VMAP_CHILDREN'] + ',\r\n'
                }
            });
        }

        return templater.put('template.cmapentity', values) || '';
    }

}

class Vmap {

    readonly entities: CMapEntity[];

    constructor(entities: CMapEntity[] = []) {
        this.entities = entities;
    }

    load(fileIndex: string[]) {
        console.log('Loading map files..');
    }

    toString(): string {
        const values: TKeyValues = {};

        values['CMAP_WORLD_CHILDREN'] = '';
        if(this.entities.length > 0) {
            this.entities.forEach((entity: CMapEntity, index: number) => {
                values['CMAP_WORLD_CHILDREN'] = values['CMAP_WORLD_CHILDREN'] + entity.toString();
                if(index < this.entities.length - 1){
                    values['CMAP_WORLD_CHILDREN'] = values['CMAP_WORLD_CHILDREN'] + ',\r\n'
                }
            });
        }

        return templater.put('template.vmap', values) || '';
    }

}

export default Vmap;