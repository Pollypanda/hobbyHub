import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Layout from './routes/Layout.jsx';
import App from './App.jsx';
import PostFeed from './pages/PostFeed.jsx';
import EditPost from './pages/EditPost.jsx'; // Import EditPost component
import PostForm from './pages/PostForm.jsx';
import PostDetail from './pages/PostDetail.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<App />} />
        <Route path="post-feed" element={<PostFeed />} />
        <Route path="post-form" element={<PostForm />} />
        <Route path="post-detail/:postId" element={<PostDetail />} /> Add post ID parameter

        <Route path="edit-post/:postId" element={<EditPost />} /> {/* Add route for EditPost with post ID parameter */}
      </Route>
      <Route
        path="*"
        element={
          <main style={{ padding: "1rem" }}>
            <p>There is nothing here!</p>
            <Link to="/">Back to Home</Link>
          </main>
        }
      />
    </Routes>
  </BrowserRouter>
);
