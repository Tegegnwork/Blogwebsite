import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostCard from "../components/postCard";

function Category() {
  const { name } = useParams();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/posts?category=${name}`)
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, [name]);

  return (
    <div className="container">
      <h1>{name} Posts</h1>

      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}

export default Category;
