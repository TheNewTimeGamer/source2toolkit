import * as fs from 'fs';

type TKeyValues = {
    [key: string]: string
}

const templates: TKeyValues = {};

const load = (template: string) => {
    if(!templates[template]) {
        templates[template] = fs.readFileSync('templates/' + template).toString();
    }
    return templates[template];
}

const put = (template: string, values: TKeyValues) => {
    let rawTemplate = load(template);
    if(!rawTemplate) {
        console.error('Could not load template:\'' + template + "\'!");
        return false;
    }        

    Object.entries(values).forEach(([key, value]) => {
        rawTemplate = rawTemplate.replace('$'+ key, value);
    })
    return rawTemplate;
}

const write = (template: string, values: TKeyValues, output: string) => {    
    const outputTemplate = put(template, values);
    if(!outputTemplate) {
        return false;
    }
    fs.writeFileSync(output, outputTemplate);
    return true;
}

export default {
    load: load,
    put: put,
    write: write
}

export type { TKeyValues };