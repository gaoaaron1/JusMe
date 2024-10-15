import React, { useContext, useState } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Item/Item';

const ShopCategory = (props) => {
  // Use context to import shop data
  const { all_product } = useContext(ShopContext);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Products to show per page (3x3)

  // Filter products based on category
  const filteredProducts = all_product.filter(item => item.category === props.category);

  // Calculate the products for the current page
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)}</span>
          out of {filteredProducts.length} products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>

      {/* Display Products for Current Page */}
      <div className="shopcategory-products">
        {currentProducts.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>

      {/* Page Buttons */}
      <div className="shopcategory-pagination">
        <button 
          onClick={() => setCurrentPage(1)} 
          className={currentPage === 1 ? 'active' : ''}
          disabled={currentPage === 1}  // Disable button if on the first page
        >
          Page 1
        </button>
        <button 
          onClick={() => setCurrentPage(2)} 
          className={currentPage === 2 ? 'active' : ''}
          disabled={currentPage === 2 || filteredProducts.length <= itemsPerPage}  // Disable if not enough products
        >
          Page 2
        </button>
      </div>
    </div>
  );
};

export default ShopCategory;
