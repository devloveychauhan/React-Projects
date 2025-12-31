import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const PAGESIZE = 10;
  const fetchData = async () => {
    const data = await fetch(`https://dummyjson.com/products?limit=500`);
    const product = await data.json();
    // console.log(product.products);
    setData(product.products);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalProduct = data.length; // 200
  const noOfPAGES = Math.ceil(totalProduct / PAGESIZE);
  const start = currentPage * PAGESIZE;
  const end = start + PAGESIZE;

  const pageClickHandler = (e) => {
    setCurrentPage(parseInt(e.target.innerText));
  };

  const prevPageHandler = () =>{
    setCurrentPage((prev) => prev - 1)
  }
  const nextPageHandler = () =>{
    setCurrentPage((prev) => prev + 1)
  }

  console.log(currentPage)
  return (
    <>
      <section className="allProducts">
        {data.slice(start, end).map((p) => (
          <div key={p.id} className="cardItem">
            <h1 className="productTitle">{p.title}</h1>
            <img className="thumbnail" src={p.thumbnail} alt={p.title} />
          </div>
        ))}
      </section>

      <div className="pageNumbersContainer">
        <button disabled={currentPage === 0} onClick={prevPageHandler} className="pages">◀️</button>
        {[...Array(noOfPAGES).keys()].map((n) => (
          <button key={n} onClick={(e) => pageClickHandler(e)} className={"pages " + (n === currentPage ? "active" : "")}>
            {n}
          </button>
        ))}
        <button disabled={currentPage === noOfPAGES - 1} onClick={nextPageHandler} className="pages">▶️</button>
      </div>
    </> 
  );
}

export default App;
