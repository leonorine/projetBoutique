import React from 'react';
import '../assets/style/cart.css'

import poubelle from "../assets/images/poubelle.jpg";
import Products from '../data/products';
import products from "../data/products";

export default class Cart extends React.Component {
  constructor(props) {
    super(props);

  }




  render() {

    return (
      <div className='cart'>
          <p className="weight">poids total : {this.props.totalPoids} </p>
          <h4>Panier</h4>
          <div className='productsZone'>
          {this.props.produits.map(product => (
              <div className='product' key={product.id} >
                  <div className='info'>
                      <p className='name'>{product.name}</p>
                  </div>
                  <div className='imageProduit'>
                      <img src={product.image} alt={product.name} />
                  </div>
                  <input type="number" min="1" max ={product.stock} value = {product.quantite}
                         onChange={e => this.props.updateQuantite(product,e.target.value)} />

                  <img className='button' src={poubelle} alt="poubelle" onClick = {()=> this.props.supprimerPanier(product)}></img>

              </div>
          ))}
          </div>

        <div className='total'> total commande :
            {this.props.total}€

        </div>
      </div>
    );
  }
}