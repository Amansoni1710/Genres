const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/vidly') 
    .then(()=>console.log("Connected to Db of playground"))
    .catch(err => console.error('could not connect ...'))

const Author = mongoose.model('Author', new mongoose.Schema({
    name: String,
    bio: String,
    website: String 
}));

const Course = mongoose.model('Course',new mongoose.Schema({
    name: String,
    author: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    }
}))

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
        author
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

// createAuthor('Aman', 'My bio', 'My Website');
// createCourse('B.Tech',"61c1d1be652c6ac725b8e749")
listCourses()
// listAuthors()
