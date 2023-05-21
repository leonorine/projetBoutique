import React from 'react';
import '../assets/style/product.css';
import '../assets/style/productList.css';
import panier from '../assets/images/panier.jpg';
import './cart.jsx';
class ProductList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const produitsFiltres = this.props.products.filter(product =>
        product.name.toLowerCase().includes(this.props.filterText.toLowerCase())
    );
    return (
        <div className='productList'>
          <h4>Boutique</h4>
            <input
                type="text" placeholder="filtrer les produits" className='filter'
                value={this.props.filterText}
                onChange={(event) => this.props.filterChanged(event.target.value)}
            />
          <div className='productsZone'>
            {produitsFiltres.map(product => (
                <div className='product' key={product.id}>
                  <div className='info'>
                    <p className='name'>{product.name}</p>
                    <p className='description'>{product.description}</p>
                      <p className='weight'>{product.weight}</p>

                  </div>
                    <div className='imageProduit'>
                        <img src={product.image} alt={product.name} />
                    </div>
                    <p className='stock'>qté {product.stock}</p>
                    <p className='price'>{product.price}</p>

                    <img className='button' src={panier} alt="panier" onClick = {()=> this.props.ajoutPanier(product)}></img>

                </div>
            ))}

          </div>
        </div>
    );
  }
}

export default ProductList;
