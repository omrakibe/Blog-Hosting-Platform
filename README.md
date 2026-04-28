# 📝 Blog Hosting Platform - Frontend

## 🚀 Overview

This is the **frontend** of a Blog Hosting Platform built using **React.js**.
It provides a user-friendly interface to create, view, update, and delete blog posts by interacting with a Spring Boot backend via REST APIs.

---

## 🛠️ Tech Stack

* React.js
* JavaScript (ES6+)
* HTML5 & CSS3
* Axios
* React Router

---

## ✨ Features

* 📄 View all blog posts
* 📝 Create new blog posts
* ✏️ Edit existing blogs
* ❌ Delete blogs
* 🔍 Search functionality (optional)
* 📱 Responsive design

---

## 📂 Project Structure

```
src/
 ├── components/
 │    ├── Navbar.js
 │    ├── BlogList.js
 │    ├── BlogForm.js
 │
 ├── pages/
 │    ├── Home.js
 │    ├── CreateBlog.js
 │
 ├── services/
 │    └── api.js
 │
 ├── App.js
 └── index.js
```

---

## ⚙️ Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/blog-frontend.git
cd blog-frontend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure Backend URL

Update API base URL inside your service file (`api.js`):

```javascript
const BASE_URL = "http://localhost:8080";
```

---

### 4️⃣ Run the app

```bash
npm start
```

App will run on:

```
http://localhost:3000
```

---

## 🌐 API Endpoints Used

* `GET /blogs` → Fetch all blogs
* `POST /blogs` → Create a blog
* `PUT /blogs/{id}` → Update a blog
* `DELETE /blogs/{id}` → Delete a blog

---

## 🔐 CORS Configuration

Ensure your backend allows requests from:

```
http://localhost:3000
```

---

## 🚀 Deployment

You can deploy this frontend using platforms like:

* Vercel
* Netlify

---

## 🤝 Contributing

Feel free to fork this repository and submit pull requests.

---

## 📄 License

This project is for educational purposes.
