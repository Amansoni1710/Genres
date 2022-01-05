

// using Refereces {Normalization} --> CONSISTENCY

let author = {
    name: 'Mosh'
}
let course = {
    author: 'id'
}

// Using Embedded Document (Denormalization)
// --> PERFORMANCE

let course = {
    author: {
        name: 'Mosh'
    }
}

// Hybrid Approch
let author = {
    name: 'Mosh',
    // 50 author properties
}
let course = {
    author:{
        id: 'ref',
        name: 'Aman'
    }
}