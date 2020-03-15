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
            { name: 'updated_date', keypath: 'updated_date', options: { unique: false }},
            { name: 'active', keypath: 'active', options: { unique: false }}
        ]
    },
    {
        store: 'state',
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema:[
            { name: 'regional_id', keypath: 'regional_id', options: { unique: false }},
            { name: 'name', keypath: 'name', options: { unique: false }},
            { name: 'created_date', keypath: 'created_date', options: { unique: false }},
            { name: 'updated_date', keypath: 'updated_date', options: { unique: false }},
            { name: 'active', keypath: 'active', options: { unique: false }}
        ]
    },
    {
        store: 'meterOffice',
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema:[
            { name: 'name', keypath: 'name', options: { unique: false }},
            { name: 'region', keypath: 'region', options: {unique: false }},
            { name: 'phone', keypath: 'phone', options: { unique: false }},
            { name: 'address', keypath: 'address', options: { unique: false }},
            { name: 'description', keypath: 'description', options: { unique: false }},
            { name: 'created_date', keypath: 'created_date', options: { unique: false }},
            { name: 'updated_date', keypath: 'updated_date', options: { unique: false }},
            { name: 'active', keypath: 'active', options: { unique: false }}
        ]
    },
    {
        store: 'leagerbook',
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema:[
            { name: 'name', keypath: 'name', options: { unique: false }},
            { name: 'year', keypath: 'year', options: { unique: false }},
            { name: 'month', keypath: 'month', options: { unique: false }},
            { name: 'created_date', keypath: 'created_date', options: { unique: false }},
            { name: 'updated_date', keypath: 'updated_date', options: { unique: false }},
            { name: 'active', keypath: 'active', options: { unique: false }}
        ]
    },
    {
        store: 'leager_page',
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema:[
            { name: 'name', keypath: 'name', options: { unique: true }},
            { name: 'book_id', keypath: 'book_id', options: { unique: false }},
            { name: 'created_date', keypath: 'created_date', options: { unique: false }},
            { name: 'updated_date', keypath: 'updated_date', options: { unique: false }},
            { name: 'active', keypath: 'active', options: { unique: false }}
        ]
    }
]
