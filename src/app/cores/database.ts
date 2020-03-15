export const DatabaseTables: any = [
    {
        store: 'user',
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema:[
            { name: 'username', keypath: 'username', options: { unique: false }},
            { name: 'password', keypath: 'password', options: { unique: false }},
            { name: 'created_date', keypath: 'created_date', options: { unique: false }},
            { name: 'updated_date', keypath: 'updated_date', options: { unique: false }}
        ]
    },
    {
        store: 'regional',
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema:[
            { name: 'name', keypath: 'name', options: { unique: false }},
            { name: 'created_date', keypath: 'created_date', options: { unique: false }},
            { name: 'updated_date', keypath: 'updated_date', options: { unique: false }}
        ]
    },
    {
        store:'unit',
        storeConfig: {keyPath: 'id', autoIncrement: true},
        storeSchema : [
            {name: 'name', keyPath:'name', options: {unique:false}},
            {name: 'created_date', keyPath:'created_date', options: {unique:false}},
            {name: 'updated_date', keyPath:'updated_date', options: {unique:false}},
        ]
    }
]
