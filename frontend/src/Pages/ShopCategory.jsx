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
    const [sortOrder, setSortOrder] = useState('oldest');
    const itemsPerPage = 9;

    const filteredProducts = all_product.filter(
        (item) => item.category === props.category
    );

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortOrder === 'oldest') {
            return new Date(a.date) - new Date(b.date);
        } else if (sortOrder === 'most_expensive') {
            return b.new_price - a.new_price;
        } else if (sortOrder === 'alphabetical') {
            return a.name.localeCompare(b.name);
        }
        return 0;
    });

    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = sortedProducts.slice(
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
                        {Math.min(indexOfLastProduct, sortedProducts.length)}
                    </span>{' '}
                    out of {sortedProducts.length} products
                </p>
                <div className="shopcategory-sort">
                    Sort by 
                    <select 
                        value={sortOrder} 
                        onChange={(e) => setSortOrder(e.target.value)} 
                        className="sort-dropdown" // Add a class for styling
                    >
                        <option value="oldest">Oldest to Newest</option>
                        <option value="most_expensive">Most Expensive to Least Expensive</option>
                        <option value="alphabetical">Alphabetical (A-Z)</option>
                    </select>
                </div>
            </div>

            <button onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Close Form' : 'Add New Product'}
            </button>

            {showForm && (
                <AddProductForm 
                    onAddProduct={(newProduct) => {
                        addProduct(newProduct); 
                        setShowForm(false); 
                    }} 
                    onClose={() => setShowForm(false)} 
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
                    disabled={currentPage === 2 || sortedProducts.length <= itemsPerPage}
                >
                    Page 2
                </button>
            </div>
        </div>
    );
};

export default ShopCategory;
