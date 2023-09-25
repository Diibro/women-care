import { useContext } from "react"
import { MainContext } from "./AppContect"
import { Loader } from "./components";
const E_shop = () => {

  const data = useContext(MainContext);

  return (
    <div className="Shop-page">
      <div className="header">
        <h1>Products recommended by our specialists</h1>
      </div>
      <div className="content">
        {data.products.map((product, index) => (
          <div className="product" key={index}>
            {product.image ? <img src={product.image} alt={product.title} /> : <Loader />}
            <h4>{product.title}</h4>
            <button>View Product</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default E_shop