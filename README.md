# ✍️ Blogify – Blogging Platform

A dynamic blogging platform where users can create, publish, and share their thoughts. Blogify provides user authentication, blog management, image uploads, and an interactive commenting system.

## ✨ Features

- 🔐 **User Authentication** – Sign up, sign in, and logout functionality using JWT.
- 📝 **Create Blogs** – Write and publish blogs with titles and content.
- 🖼️ **Image Uploads** – Upload cover images for blog posts using Multer.
- 💬 **Comment System** – Add comments to blog posts.
- 👤 **User Profiles** – Associate blogs and comments with their authors.
- 🗑️ **Blog Management** – Delete your own blog posts.
- 📖 **Blog Details** – View individual blog posts and their comments.
- 🕒 **Latest Posts** – Display blogs sorted by creation date.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | Backend framework |
| MongoDB | Database |
| Mongoose | MongoDB object modeling |
| EJS | Server-side templating |
| JavaScript | Application logic |
| JWT | Authentication |
| Multer | File uploads |
| Cookie-parser | Cookie handling |
| CSS | Styling |

## 📂 Project Structure


Blogify/
│
├── middleware/       # Authentication middleware
├── models/           # Database schemas
├── public/           # Static files and uploaded images
├── routes/           # User and blog routes
├── service/          # Authentication services
├── views/            # EJS templates
│
├── index.js          # Application entry point
├── package.json
├── package-lock.json
└── .gitignore


## ⚙️ Installation & Setup

**1. Clone the repository**

```bash
git clone https://github.com/zeeshansayyed09/Blogify.git
```

**2. Navigate to the project directory**

```bash
cd Blogify
```

**3. Install dependencies**

```bash
npm install
```

**4. Configure environment variables**

Create a `.env` file in the root directory:

```env
PORT=6100
MONGODB_URI=your_mongodb_connection_string
```

Add any additional authentication secrets required by your authentication service.

**5. Start the application**

```bash
npm start
```

Open your browser and visit:

```text
http://localhost:6100
```

## 🔒 Authentication

Blogify uses JSON Web Tokens (JWT) for user authentication. Authentication tokens are stored in cookies and verified through custom Express middleware to identify logged-in users.

## 🎯 What I Learned

- Building server-side applications using Node.js and Express.js.
- Working with MongoDB and Mongoose.
- Implementing JWT-based authentication.
- Handling file uploads using Multer.
- Structuring applications with routes, models, middleware, and services.
- Rendering dynamic pages using EJS.
- Managing relationships between users, blogs, and comments.

## 🚀 Future Improvements

- Edit and update existing blog posts.
- User profile management.
- Like and bookmark functionality.
- Rich text editor for writing blogs.
- Improved UI and responsive design.

## 👨‍💻 Author

**Zeeshan Sayyed**

- GitHub: [@zeeshansayyed09](https://github.com/zeeshansayyed09)

---

⭐ If you find this project interesting, consider giving it a star!
