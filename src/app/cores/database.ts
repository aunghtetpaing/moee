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
            { name: 'created_date', keypath: 'created_date', options: { unique: false }},
            { name: 'updated_date', keypath: 'updated_date', options: { unique: false }},
            { name: 'active', keypath: 'active', options: { unique: false }}
        ]
    },
    {
        store: 'leager_page',
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema:[
            { name: 'name', keypath: 'name', options: { unique: false }},
            { name: 'book_id', keypath: 'book_id', options: { unique: false }},
            { name: 'created_date', keypath: 'created_date', options: { unique: false }},
            { name: 'updated_date', keypath: 'updated_date', options: { unique: false }},
            { name: 'active', keypath: 'active', options: { unique: false }}
        ]
    },
    {
        store: 'moneyType',
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema:[
            { name: 'name', keypath: 'name', options: { unique: true }},
            { name: 'created_date', keypath: 'created_date', options: { unique: false }},
            { name: 'updated_date', keypath: 'updated_date', options: { unique: false }},
            { name: 'active', keypath: 'active', options: { unique: false }}
        ]
    },
    {
        store: 'metertype',
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema:[
            { name: 'name', keypath: 'name', options: { unique: true }},
            { name: 'created_date', keypath: 'created_date', options: { unique: false }},
            { name: 'updated_date', keypath: 'updated_date', options: { unique: false }},
            { name: 'active', keypath: 'active', options: { unique: false }}
        ]
    },
    {
        store: 'transformer',
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema:[
            { name: 'name', keypath: 'name', options: { unique: true }},
            { name: 'code', keypath: 'code', options: { unique: false }},
            { name: 'type', keypath: 'type', options: { unique: false }},
            { name: 'volt', keypath: 'volt', options: { unique: false }},
            { name: 'installation_date', keypath: 'installation_date', options: { unique: false }},
            { name: 'created_date', keypath: 'created_date', options: { unique: false }},
            { name: 'updated_date', keypath: 'updated_date', options: { unique: false }},
            { name: 'active', keypath: 'active', options: { unique: false }}
        ]
    },
    {
        store: 'meter',
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema:[
            { name: 'start_date', keypath: 'start_date', options: { unique: false }},
            { name: 'meter_no', keypath: 'meter_no', options: { unique: true }},
            { name: 'code', keypath: 'code', options: { unique: false }},  
            { name: 'type', keypath: 'type', options: { unique: false }},  
            { name: 'house_power', keypath: 'house_power', options: { unique: false }},  
            { name: 'transformer', keypath: 'transformer', options: { unique: false }},  
            { name: 'money_type', keypath: 'money_type', options: { unique: false }}, 
            { name: 'person_name', keypath: 'person_name', options: { unique: false }}, 
            { name: 'person_address', keypath: 'person_address', options: { unique: false }},
            { name: 'person_phone', keypath: 'person_phone', options: { unique: false }},
            { name: 'created_date', keypath: 'created_date', options: { unique: false }},
            { name: 'updated_date', keypath: 'updated_date', options: { unique: false }},
            { name: 'active', keypath: 'active', options: { unique: false }}
        ]
    },
    {
        store: 'transformer_repair',
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema:[
            { name: 'repair_date', keypath: 'repair_date', options: { unique: false }},
            { name: 'description', keypath: 'description', options: { unique: true }},
            { name: 'created_date', keypath: 'created_date', options: { unique: false }},
            { name: 'updated_date', keypath: 'updated_date', options: { unique: false }},
            { name: 'active', keypath: 'active', options: { unique: false }}
        ]
    }
]