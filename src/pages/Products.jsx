
import { useEffect, useState } from "react";
import api from "../api";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [loading, setLoading] = useState(true);

  const [visibleCount, setVisibleCount] = useState(20);

  useEffect(() => {
    loadProducts();
  }, [search, category, sort, minPrice, maxPrice]);

  useEffect(() => {
    setVisibleCount(20);
  }, [search, category, sort, minPrice, maxPrice]);

  const loadProducts = async () => {
    try {
      setLoading(true);

      const { data } = await api.get("/products", {
        params: {
          search,
          category,
          sort,
          minPrice,
          maxPrice,
        },
      });

      setProducts(data);
    } catch (error) {
      console.error("Failed to load products:", error);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setSort("");
    setMinPrice("");
    setMaxPrice("");
    setVisibleCount(20);
  };

  const visibleProducts = products.slice(0, visibleCount);

  return (
    <div className="products-page">
      <div className="products-topbar">
        <div className="search-box">
          <span className="search-icon">🔍</span>

          <input
            type="text"
            placeholder="Search for products, brands and more"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button
          className="search-btn"
          onClick={loadProducts}
        >
          Search
        </button>
      </div>

      <div className="products-layout">
        <aside className="filter-sidebar">
          <div className="filter-header">
            <h3>Filters</h3>

            <button
              onClick={clearFilters}
              className="clear-btn"
            >
              CLEAR ALL
            </button>
          </div>

          <div className="filter-section">
            <h4>Category</h4>

            <label>
              <input
                type="radio"
                name="category"
                value=""
                checked={category === ""}
                onChange={(e) => setCategory(e.target.value)}
              />
              All
            </label>

            <label>
              <input
                type="radio"
                name="category"
                value="Electronics"
                checked={category === "Electronics"}
                onChange={(e) => setCategory(e.target.value)}
              />
              Electronics
            </label>

            <label>
              <input
                type="radio"
                name="category"
                value="Mobile"
                checked={category === "Mobile"}
                onChange={(e) => setCategory(e.target.value)}
              />
              Mobiles
            </label>

            <label>
              <input
                type="radio"
                name="category"
                value="Fashion"
                checked={category === "Fashion"}
                onChange={(e) => setCategory(e.target.value)}
              />
              Fashion
            </label>

            <label>
              <input
                type="radio"
                name="category"
                value="Home"
                checked={category === "Home"}
                onChange={(e) => setCategory(e.target.value)}
              />
              Home
            </label>

            <label>
              <input
                type="radio"
                name="category"
                value="Books"
                checked={category === "Books"}
                onChange={(e) => setCategory(e.target.value)}
              />
              Books
            </label>
          </div>

          <div className="filter-section">
            <h4>Price</h4>

            <div className="price-inputs">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />

              <span>to</span>

              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>

          <div className="filter-section">
            <h4>Customer Rating</h4>

            <label>
              <input type="checkbox" />
              4★ & above
            </label>

            <label>
              <input type="checkbox" />
              3★ & above
            </label>
          </div>

          <div className="filter-section">
            <h4>Availability</h4>

            <label>
              <input type="checkbox" />
              Include Out of Stock
            </label>
          </div>
        </aside>

        <main className="products-content">
          <div className="products-heading">
            <div>
              <h2>All Products</h2>

              <p>
                {products.length} products
              </p>
            </div>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">
                Sort By: Relevance
              </option>

              <option value="price_asc">
                Price: Low to High
              </option>

              <option value="price_desc">
                Price: High to Low
              </option>

              <option value="rating">
                Customer Rating
              </option>

              <option value="newest">
                Newest First
              </option>
            </select>
          </div>

          {loading ? (
            <div className="products-loading">
              <div className="loader"></div>
              <p>Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="no-products">
              <div>🔍</div>

              <h2>No products found</h2>

              <p>
                Try changing your search or filters.
              </p>

              <button
                onClick={clearFilters}
                className="clear-filter-button"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <div className="products-grid">
                {visibleProducts.map((product) => (
                  <div
                    className="product-wrapper"
                    key={product._id}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>

              {visibleCount < products.length && (
                <div className="read-more-container">
                  <button
                    className="read-more-btn"
                    onClick={() =>
                      setVisibleCount((prev) => prev + 20)
                    }
                  >
                    Read More
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

