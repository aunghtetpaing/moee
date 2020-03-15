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
        store: 'unit-specification',
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
            { name: 'name', keyPath: 'name', 'options': { unique: false } },
            { name: 'status', keyPath: 'status', 'options': { unique: false } },
            { name: 'created_date', keypath: 'created_date', options: { unique: false }},
            { name: 'updated_date', keypath: 'updated_date', options: { unique: false }},
        ]
    },
    {
        store: 'unit-specification-detail',
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
            { name: 'name', keyPath: 'name', 'options': { unique: false } },
            { name: 'unit_specification_id', keyPath: 'unit_specification_id', 'options': { unique: false } },
            { name: 'type_id', keyPath: 'type_id', 'options': { unique: false } },
            { name: 'amount', keyPath: 'amount', 'options': { unique: false } },
            { name: 'created_date', keypath: 'created_date', options: { unique: false }},
            { name: 'updated_date', keypath: 'updated_date', options: { unique: false }},
        ]
    }
]
