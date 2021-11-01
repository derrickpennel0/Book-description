const { ApolloServer, gql } = require("apollo-server")

const port = process.env.PORT || 4501;


// This is our blog which contains all the information of the author
const blogs = [

    {
        title: "I am a hero",
        author: "Dawuda Nuraini",
        aboutAuthor: "Teacher at Adonten SHS",
        description: "There’s also a section on their that shows guys how to make a little more cash on top of their monthly day job wage, which is vital in some cases just to keep your head above water.  A lot of new dads have the added stress of not having their wives’ or girlfriends’ wage coming in each month, due to the temporary career change in being a full time mum of a baby. ",
        date: "22nd October,2020",
        likes: 10
    },
    {
        title: "The North Face Brand",
        author: "Christian Mario",
        aboutAuthor: "Owner of The North Face",
        description: "People across the country really like the way The North Face comes up with new products. Their socks,shirts, shorts, jerseys, shoes and tanks tops are all comfortable",
        date: "14th July,2021",
        likes: 15,

    },
    {
        title: "Puma brand",
        author: "Jeph Sam",
        aboutAuthor: "Owner of Puma",
        description: "People across the country really like the way Puma comes up with new products. Their socks,shirts, shorts, jerseys, shoes and tanks tops are all comfortable",
        date: "10th July,2021",
        likes: 100,
    },
    {
        title: "The Adidas Company",
        author: "Derrick Adjei-Mensah",
        aboutAuthor: "Owner of adidas Company",
        description: "People across the country really like the way Adidas comes up with new products. Their socks,shirts, shorts, jerseys, shoes and tanks tops are all comfortable",
        date: "15th June,2022",
        likes: 250,
    },
];

// Schemas to shape our code 
const schemas = gql `
   type Blog {
       title: String!
       aboutAuthor: String!
       author: String!
       date: String
       description: String!
       likes: Int 
   }

   type Query {
       blogs: [Blog]
       blog(title: String!): Blog
   }

   type Mutation {
       createBlog(title: String!
       aboutAuthor: String!
       author: String!
       date: String
       description: String!
       likes: Int):Blog
   }
   `;

const blogsResolvers = {
    Query: {
        blogs: () => blogs,
        blog: (parent, args) => blogs.find((blog) => blog.title === args.title)
    },

    Mutation: {
        createBlog: (parent, args) => {
            const { title, author, aboutAuthor, date, description, likes } = args;
            const blog = { title, author, aboutAuthor, date, description, likes };
            blogs.push(blog);
            return blog;
        }
    }
}
const server = new ApolloServer({
    typeDefs: schemas,
    resolvers: blogsResolvers,
    playground: true,
    introspection: true,
});
server.listen(port).then(({ url }) => {
    console.log(`The server at ${url} is running!`);
}).catch(err => console.log(err.message));