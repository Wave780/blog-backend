import { prisma } from "../utils/prisma.js";


// GET /posts
const postsController = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
  try {
    const posts = await prisma.post.findMany({
         skip: (page - 1) * limit,
         take: limit,
      where: {
        deletedAt: null,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch posts.",
      error: error.message,
    });
  }
};


// GET /posts/:id
const postByIdController = async (req, res) => {
  try {
    
    const id  = Number(req.params.id)
    if(isNaN(id)){
      return res.status(400).json({
        status: false,
        message: "Invalid Post ID"
      });
    }
    const post =  await prisma.post.findFirst({
      where:{
        id,
        deletedAt: null
      },
       include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    if(!post){
      return res.status(404).json({
        status: false,
        message: "Post not found"
      })
    }

    return res.status(200).json({
      status: true,
      message: 'Post fetched successfully',
      data: post
    })

  } catch (err) {
    return res.status(500).json({
      status: false,
      message: 'Failed to fetch post',
      error: err.message
    })
  }

}

//Create  a new post 
const createPostController =  async (req, res) => {
  res.json({
    post: req.validated,
  })
}


export { postsController, postByIdController, createPostController };
