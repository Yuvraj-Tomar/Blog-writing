import { useParams } from "react-router-dom";

const BlogDetails = () => {
  const { id } = useParams();
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Blog Title {id}</h2>
      <p className="mt-2">Blog content will be shown here...</p>
    </div>
  );
};

export default BlogDetails;
