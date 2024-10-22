import React, { useContext, useState } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Item/Item';
import AddProductForm from './AddProductForm';

const ShopCategory = (props) => {
    const { all_product, addProduct } = useContext(ShopContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [showForm, setShowForm] = useState(false);
    const itemsPerPage = 9;

    const filteredProducts = all_product.filter(
        (item) => item.category === props.category
    );

    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = filteredProducts.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );

    return (
        <div className='shop-category'>
            <img className='shopcategory-banner' src={props.banner} alt="" />
            <div className="shopcategory-indexSort">
                <p>
                    <span>
                        Showing {indexOfFirstProduct + 1}-
                        {Math.min(indexOfLastProduct, filteredProducts.length)}
                    </span>{' '}
                    out of {filteredProducts.length} products
                </p>
                <div className="shopcategory-sort">
                    Sort by <img src={dropdown_icon} alt="" />
                </div>
            </div>

            <button onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Close Form' : 'Add New Product'}
            </button>

            {showForm && (
                <AddProductForm 
                    onAddProduct={(newProduct) => {
                        addProduct(newProduct); 
                        setShowForm(false); // Close form after submission
                    }} 
                    onClose={() => setShowForm(false)} // Pass onClose prop
                />
            )}

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

            <div className="shopcategory-pagination">
                <button
                    onClick={() => setCurrentPage(1)}
                    className={currentPage === 1 ? 'active' : ''}
                    disabled={currentPage === 1}
                >
                    Page 1
                </button>
                <button
                    onClick={() => setCurrentPage(2)}
                    className={currentPage === 2 ? 'active' : ''}
                    disabled={currentPage === 2 || filteredProducts.length <= itemsPerPage}
                >
                    Page 2
                </button>
            </div>
        </div>
    );
};

export default ShopCategory;
