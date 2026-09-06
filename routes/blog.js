const { Router } = require("express")
const multer = require('multer');
const path = require('path');

const Blog = require("../models/blog")
const Comments = require("../models/comments")

const router = Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/`))
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage })



router.get('/add-new', (req, res) => {
  return res.render('addBlog', {
    user: req.user,
  })
})


router.post("/", upload.single('coverImage'), async (req, res) => {
  const { title, body } = req.body;
  const blog = await Blog.create({
    body,
    title,
    createdBy: req.user._id,
    coverImageURL: `/uploads/${req.file.filename}`,
  });
  return res.redirect(`/blog/${blog._id}`);
});

router.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate('createdBy')
  const comment = await Comments.find({ blogId: req.params.id }).populate('createdBy')
  console.log(blog);

  if (!blog) {
    return res.status(404).send('Blog not found');
  }
  return res.render('blogDetail', { blog, comment, user: req.user });
});

router.post('/:blogId', async (req, res) => {
  await Comments.create({
    content: req.body.content,
    blogId: req.params.blogId,
    createdBy: req.user._id
  })
  return res.redirect(`/blog/${req.params.blogId}`);
});


// delete Rooute
router.post('/:id/delete', async(req, res) => {
  try {
    if (!req.user) {
      return res.send(404).send('Please log in first!')
    }
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).send('Blog not Found!')
    }

    if (blog.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).send('You are not allowed to delete this blog');
    }

    await Comments.deleteMany({ blogId: blog._id });
    await Blog.findByIdAndDelete(blog._id);

    return res.redirect('/');

  } catch (error) {
    return res.status(500).send('Unable to delete the blog');
  }
})


module.exports = router;