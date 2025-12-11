import { Link } from 'react-router-dom'

const ProductListings = ({ products }) => {
  return (
    <div className='product-list'>
      {products.map((product) => (
        <div className='product-preview' key={product.id}>
          <Link to={`/products/${product.id}`}>
            <h2>{product.title}</h2>
          </Link>
          <p>Type: {product.category}</p>
          <p>Company: {product.supplier.name}</p>
        </div>
      ))}
    </div>
  )
}

export default ProductListings
