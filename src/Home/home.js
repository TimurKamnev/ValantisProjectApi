import React, { useState, useEffect } from 'react';
import axios from 'axios';
import md5 from 'md5';

const App = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [password] = useState('Valantis');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
        const authString = md5(`${password}_${timestamp}`);

        const response = await axios.post(
          'https://api.valantis.store:41000/',
          {
            action: 'get_ids',
            params: { offset: (currentPage - 1) , limit: 50 },
          },
          {
            headers: { 'X-Auth': authString },
          }
        );

        const ids = response.data.result;
        if (ids && ids.length > 0) {
          const itemsResponse = await axios.post(
            'https://api.valantis.store:41000/',
            {
              action: 'get_items',
              params: { ids },
            },
            {
              headers: { 'X-Auth': authString },
            }
          );

          setProducts(itemsResponse.data.result);

          const totalItems = response.data.result.length;
          const totalPagesCount = Math.ceil(totalItems);
          setTotalPages(totalPagesCount);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentPage, password]);  

  const handlePageChange = newPage => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <div className='list-products'>
        <h1>Product List</h1>
        {products.map(product => (
          <ul key={product.id}>
            <div>
              <p><strong>ID:</strong> {product.id}</p>
              <p><strong>Name:</strong> {product.product}</p>
              <p><strong>Price:</strong> {product.price}</p>
              <p><strong>Brand:</strong>{product.brand || 'N/A'}</p>
            </div>
          </ul>
        ))}
      </div>
      <div className='pagination'>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous Page
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next Page
        </button>
      </div>
    </>
  );
};

export default App;



