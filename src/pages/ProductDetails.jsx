import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import api, { FILE_URL } from "../api";
import { addToCart } from "../redux/cartSlice";

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    api.get(`/products/${id}`).then(({ data }) => setProduct(data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="detail">
     <img
  src={
    product.image
      ? product.image.startsWith("http")
        ? product.image
        : `${FILE_URL}${product.image}`
      : "/placeholder.png"
  }
  alt={product.name}
/>
      <div>
        <span className="pill">{product.category}</span>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p>Brand: {product.brand || "—"}</p>
        <p>Rating: ⭐ {product.rating}</p>
        <h2>${product.price}</h2>
        <p>Stock: {product.stock}</p>
        <button className="primary" onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
      </div>
    </div>
  );
}
