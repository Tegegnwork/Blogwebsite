import React from 'react';
import './Blog.css';

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: 'Getting Started with React',
      excerpt: 'Learn the basics of React and start building your first application...',
      author: 'Jane Smith',
      date: '2024-01-15',
      category: 'React',
      image: 'https://via.placeholder.com/300x200'
    },
    {
      id: 2,
      title: 'CSS Best Practices',
      excerpt: 'Discover the best practices for writing maintainable and scalable CSS...',
      author: 'John Doe',
      date: '2024-01-10',
      category: 'CSS',
      image: 'https://via.placeholder.com/300x200'
    },
    {
      id: 3,
      title: 'JavaScript ES6 Features',
      excerpt: 'Explore the most useful ES6 features that will improve your code...',
      author: 'Mike Johnson',
      date: '2024-01-05',
      category: 'JavaScript',
      image: 'https://via.placeholder.com/300x200'
    }
  ];

  return (
    <div className="blog-container">
      <h2 className="blog-title">Latest Blog Posts</h2>
      <div className="blog-grid">
        {posts.map(post => (
          <article key={post.id} className="blog-card">
            <img src={post.image} alt={post.title} className="blog-image" />
            <div className="blog-content">
              <span className="blog-category">{post.category}</span>
              <h3 className="blog-post-title">{post.title}</h3>
              <p className="blog-excerpt">{post.excerpt}</p>
              <div className="blog-meta">
                <span className="blog-author">By {post.author}</span>
                <span className="blog-date">{new Date(post.date).toLocaleDateString()}</span>
              </div>
              <button className="blog-read-more">Read More →</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog;