import React from 'react';
import './Category.css';

const Category = () => {
  const categories = [
    { id: 1, name: 'React', count: 15, color: '#61dafb' },
    { id: 2, name: 'JavaScript', count: 23, color: '#f7df1e' },
    { id: 3, name: 'CSS', count: 12, color: '#264de4' },
    { id: 4, name: 'Node.js', count: 8, color: '#68a063' },
    { id: 5, name: 'Python', count: 19, color: '#3776ab' },
    { id: 6, name: 'HTML', count: 10, color: '#e34c26' }
  ];

  return (
    <div className="category-container">
      <h3 className="category-title">Categories</h3>
      <div className="category-list">
        {categories.map(category => (
          <div key={category.id} className="category-item">
            <a href={`/category/${category.name.toLowerCase()}`} className="category-link">
              <span className="category-name">{category.name}</span>
              <span className="category-badge">{category.count}</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;