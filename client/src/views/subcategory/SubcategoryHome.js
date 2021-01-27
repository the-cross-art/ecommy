import React, { useState, useEffect } from "react";
import { getSubcategory } from "../../api/subcategory";
import { Link, useParams } from "react-router-dom";
import { ProductCard } from "../../components";

const SubcategoryHome = () => {
  const { slug } = useParams();
  const [subcategory, setSubcategory] = useState();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSubcategory(slug)
      .then((res) => {
        setSubcategory(res.data.category);
        setProducts(res.data.products);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  return (
    <div className="container-fluid">
      {/* <div className="row">
        <div className="col">
          {loading ? (
            <h4 className="text-center jumbotron p-3 mt-5 mb-5 display-4">
              Loading...
            </h4>
          ) : (
            <h4 className="text-center jumbotron p-3 mt-5 mb-5 display-4">
              {products.length} Products in "{subcategory && subcategory.name}"
              category
            </h4>
          )}
        </div>
      </div>

      <div className="row">
        {products.map((p) => (
          <div className="col-md-3" key={p._id}>
            <ProductCard product={p} />
          </div>
        ))}
      </div> */}
      {slug}
    </div>
  );
};

export default SubcategoryHome;
