const { postBlogController } = require("../Controller/Blog/postBlogController")
const { getAllBlogController } = require("../Controller/Blog/getAllBlogController")
const { getByIdController } = require("../Controller/Blog/getByIdController")
const { patchBlogController } = require("../Controller/Blog/patchBlogController")
const { deleteBlogController } = require("../Controller/Blog/deleteBlogController")


const postBlogHandler = async(req, res) => {
    try {
        const {id, author, title, image, template, date} = req.body;
        
        const createdBlog = await postBlogController(id, author, title, image, template, date);
    
        return res.status(200).json(createdBlog)
    } catch (error) {
        return res.status(400).send(error.message)
    }
};

const getAllBlogHandler = async (req, res) => {
    try {
        
        const allBlogs = await getAllBlogController();

        return res.status(200).json(allBlogs);
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

const getByIdHandler = async (req, res) => {
    try {
        const { id } = req.params;
        
        const blogId = await getByIdController(id)

        return res.status(200).json(blogId);
    } catch (error) {
        return res.status(400).send(error.message)
    }
} 

const patchBlogHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const { author, title, image, template, date } = req.body;

        const response = await patchBlogController(id, author, title, image, template, date) ;
        
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

const deleteBlogHandler = async (req, res) => {
    try {
        const { id } = req.params;

        const blogDelete = await deleteBlogController(id);

        return res.status(200).json(blogDelete);
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

module.exports = {
    postBlogHandler,
    getAllBlogHandler,
    getByIdHandler,
    patchBlogHandler,
    deleteBlogHandler
}