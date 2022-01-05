const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/embedding') 
    .then(()=>console.log("Connected to Db of embedding"))
    .catch(err => console.error('could not connect ...'))

const authorSchema = new mongoose.Schema({
        name: String,
        bio: String,
        website: String 
    });
const Author = mongoose.model('Author', authorSchema );

// const courseSchema = new mongoose.Schema({
//     name: String,
//     author: {
//         type: authorSchema,
//         required: true
//     }
// }) 
const courseSchema = new mongoose.Schema({
    name: String,
    author: [authorSchema]
}) 

const Course = mongoose.model('Course', courseSchema)




async function createAuthor(name, bio, website){
    const author = new Author({
        name,
        bio,
        website
    });
    const result = await author.save();
    console.log(result)
}

async function createCourse(name,author){
    const course = new Course({
        name,
        authors
    });
    const result = await course.save();
    console.log(result)
}

async function listCourses(){
    const courses = await Course
        .find()
        .populate('author','name -_id bio') // populate to get document by id of author with name and bio -_id to explot
        .select(['author','name']);
    console.log(courses);
}

async function listAuthors(){
    const authors = await Author
    .find()
    .select('name');
console.log(authors)
}

async function updateAuthor(courseID){
    const course = await Course.findById(courseID);
    course.author.name = "denver";
    console.log("updated.")
    course.save();
}

async function addAuthor(courseId,author){
    const course = await Course.findById(courseId)
    course.author.push(author)
    course.save();
    console.log("added")
}

async function removeAuthor(courseId,authorId){
    const course = await Course.findById(courseId)
    // console.log(course.author.id(authorId))
    const author = course.author.id(authorId)
    author.remove()
    course.save()
    console.log("removed")

    
}


async function updateAuthorD(courseID){
    const course = await Course.update({_id: courseID},{
        $set: {
            'author.name': 'Josn Smith'
        }
    })
    console.log("Done")
}

async function updateAuthorD1(courseID){
    const course = await Course.update({_id: courseID},{
        $unset: {
            'author': ''  // to delete from document
        }
    })
    console.log("Done")
}


// createAuthor('Aman', 'My bio', 'My Website');
// createCourse('Java course',[new Author({name: "aman"}),new Author({name: "aman"})])
// listCourses()
// listAuthors()
// updateAuthor('61c221cbea7d5e029b29a389')
// updateAuthorD('61c221cbea7d5e029b29a389')
// updateAuthorD1('61c221cbea7d5e029b29a389')
// addAuthor('61c2c9bda5e300c2bf725486',new Author({name:"new Author"}))
// removeAuthor('61c2c9bda5e300c2bf725486','61c2c9bda5e300c2bf725485')