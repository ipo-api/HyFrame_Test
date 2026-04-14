const documentation = require('./documentation.json');

let typeString = '';

export class unit {
    static getInterfaceName(interfaceName) {
        if (interfaceName.indexOf('Array<') > -1) {
            interfaceName = interfaceName.replace('Array<', '');
            interfaceName = interfaceName.replace('>', '');
        }
        return interfaceName.replace('[]', '');
    }

    // 创建自定义类型数据
    static createTypeDetail = (interfaceName: string, name?: string) => {
        let types = ['number', 'string', 'boolean', 'null', 'undefined', 'symbol', 'object', 'array', 'any', 'function', 'interface'];
        const type = documentation.interfaces.find(item => item.name === unit.getInterfaceName(interfaceName));
        if (type) {
            const typeArr = type.properties;
            typeArr.forEach(element => {
                if (element.rawdescription) {
                    if (types.indexOf(element.type.replace('[]', '')) === -1) {
                        typeString += `/** ${element.rawdescription.replace('\n', '')} */\n`;
                        typeString += `${element.name}:${element.type}\n`;
                        if (element.type !== interfaceName) {
                            unit.createTypeDetail(element.type, element.name);
                            typeString += `------------------- \n`;
                        }
                    } else {
                        let typeMsg = '/** ' + element.rawdescription.replace('\n', '') + ' */\n';
                        let colon = ':';
                        if (element.optional) {
                            colon = '?:';
                        }
                        let type = ''
                        if (name) {
                            type += name + '.';
                        }
                        type += element.name + colon + element.type + '\n';
                        typeString += typeMsg + type;
                    }
                }
            });
        }
        return typeString;
    }

    static getServiceFuncitonType(classElement, data, baseType) {
        let controlType;
        let options;
        let config;
        let tempClassType = [];
        let classType;
        let classTypeList = classElement.jsdoctags || [];
        classTypeList.forEach(item => {
            tempClassType.push(item.name.escapedText + ':' + item.type);
            typeString = '[' + item.type + '] \n';
            config = unit.createTypeDetail(item.type);
        })

        classType = `(${tempClassType.toString()})`;

        // 是否为必填
        let required = false;
        if (classElement.jsdoctags) {
            if (classElement.jsdoctags.findIndex(item => item.tagName.escapedText === 'required') > -1) {
                required = true;
            }
        }
        // 获取自定义类型说明
        // const config = unit.createTypeDetail(classType);

        data[classElement.name] = {
            name: classElement.name,
            type: { name: classElement.name, required },
            table: {
                type: { summary: classType },
                defaultValue: { summary: classElement.defaultValue ? classElement.defaultValue : {} },
            },
            control: { type: controlType ? controlType : 'text' },
            // description: 'sadadasdasd'
        }
        if (options && options.length > 0) {
            data[classElement.name]['options'] = options
        }

        // 是否存在自定义类型
        if (config) {
            data[classElement.name].table.type['detail'] = config;
        }
    }

    static getAttribute(classElement, data, baseType) {
        let controlType;
        let options;
        let classType = classElement.type || '';
        if (!classType) {
            if (classElement.jsdoctags) {
                classElement.jsdoctags.forEach(element => {
                    if (element.tagName.escapedText === 'typedef') {
                        if (element.name) {
                            classType = element.name.escapedText + element.comment;
                        }
                        if (element.typeExpression) {
                            element.typeExpression.type.types.forEach((element2, index) => {
                                if (element.typeExpression.type.types.length === index + 1) {
                                    classType += element2.literal.text;
                                } else {
                                    classType += element2.literal.text + ' | ';
                                }
                            });
                        }
                    }
                });
            }
        }

        if (classType) {
            let newType = classType.replace(/"/g, '');
            newType = newType.replace(/\s+/g, '');
            const newOptions = newType.split('|');
            if (newOptions.length === 1) {
                const type = baseType.find(item => item.name === newOptions[0]);
                if (!type && newOptions[0]) {
                    if (newOptions[0].indexOf('[]') > -1 || newOptions[0].indexOf('Array') > -1) {
                        controlType = 'object';
                    } else if (newOptions[0].indexOf('EventEmitter') > -1) {
                        controlType = 'text';
                    } else {
                        controlType = 'object';
                    }
                } else {
                    controlType = type ? type.type : 'text';
                }
            }
            if (newOptions.length === 2) {
                let index = 0;
                const typeArr = [];
                newOptions.forEach(element => {
                    const find = baseType.find(item => item.name === element);
                    if (find) {
                        typeArr.push(find);
                        index++;
                    }
                });

                if (index > 0) {
                    controlType = typeArr[0].type;
                } else {
                    options = newOptions;
                    controlType = 'radio';
                }
            }
            if (newOptions.length > 2) {
                options = newOptions;
                controlType = 'select';
            }
        }

        // 是否为必填
        let required = false;
        if (classElement.jsdoctags) {
            if (classElement.jsdoctags.findIndex(item => item.tagName.escapedText === 'required') > -1) {
                required = true;
            }
        }
        // 获取自定义类型说明
        typeString = '';
        const config = unit.createTypeDetail(classType);

        data[classElement.name] = {
            name: classElement.name,
            type: { name: classElement.name, required },
            table: {
                type: { summary: classType },
                defaultValue: { summary: classElement.defaultValue ? classElement.defaultValue : {} },
            },
            control: { type: controlType ? controlType : 'text' },
            description: classElement.description || ''
        }
        if (options && options.length > 0) {
            data[classElement.name]['options'] = options
        }

        // 是否存在自定义类型
        if (config) {
            data[classElement.name].table.type['detail'] = config;
        }
    }

    // 创建类型表
    static createArgTypes = (name: string, type?: 'component' | 'directive' | 'service' | 'pipe') => {
        if (!type) {
            type = 'component';
        }

        // 处理的对象名
        let arr;
        // 根据control要的参数，创建基础数据类型
        const baseType = [
            { name: 'number', type: 'number' },
            { name: 'string', type: 'text' },
            { name: 'boolean', type: 'boolean' },
            { name: 'EventEmitter<any>', type: 'text' },
            { name: 'any', type: 'text' },
            { name: 'object', type: 'object' },
        ];
        // 根据组件名获取组件内部注释的信息
        let argType;
        if (type === 'component') {
            arr = ['inputsClass', 'outputsClass'];
            argType = documentation.components.find(item => item.name === name);
        }
        if (type === 'directive') {
            argType = documentation.directives.find(item => item.name === name);
            arr = ['inputsClass', 'outputsClass'];
        }
        if (type === 'service') {
            arr = ['methods'];
            argType = documentation.injectables.find(item => item.name === name);
        }
        if (type === 'pipe') {
            arr = ['methods'];
            argType = documentation.pipes.find(item => item.name === name);
        }
        // 创建返回数据并添加点击事件
        const data = {};
        arr.forEach(element => {
            const thisClass = argType[element];
            if (thisClass && thisClass.length > 0) {
                thisClass.forEach(classElement => {
                    if (type === 'service') {
                        unit.getServiceFuncitonType(classElement, data, baseType);
                    }
                    if (type === 'component') {
                        unit.getAttribute(classElement, data, baseType)
                    }
                    if (type === 'directive') {
                        unit.getAttribute(classElement, data, baseType);
                    }
                });
            }
        })
        return data;
    }

    // 创建标签
    static createLabel = (labelName, argTypes) => {
        let attribute = ` `;
        for (let key in argTypes) {
            if (argTypes[key].table.type.summary.indexOf('EventEmitter') === 0) {
                attribute += `(${key})="${key}($event)" `
            } else {
                attribute += `[${key}]="${key}" `
            }
        }
        return `<${labelName}${attribute}>`;
    }
}

