import React from 'react';
import ProductList from './productList.jsx';
import Cart from './cart.jsx';
import Products from '../data/products.js';
import '../assets/style/app.css';

/*
 define root component
*/
export default class App extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
          Panier : [],
          total : 0,
          totalPoids : 0,
          products: Products,
          filterText : ""
      };
  }

  // Ajoute un produit dans le panier lorsque l'on appuie sur l'image panier
  ajoutPanier(p) {
      if (p.stock > 0) {
          const existe = this.state.Panier.find(product => product.id === p.id)
          if (!existe) {
              const produit = {
                  ...p,
                  quantite: 1
              };
              this.state.Panier.push(produit);
          } 
          else {
              existe.quantite += 1;
          }

          const modifProduit = this.state.products.map(obj => {
              if (obj.id === p.id) {
                  return {
                      ...obj,
                      stock: obj.stock - 1
                  };
              }
              return obj;
          });

          this.setState({
              Panier: this.state.Panier,
              total: this.state.total + p.price,
              totalPoids: this.state.totalPoids + p.weight,
              products: modifProduit
          });
      }
  }

  // Modifie le stock des produits vis à vis des changements du input number
  // et le prix et le poids total en fonction
  updateQuantite(product,quantite){
      const modifPanier = this.state.Panier.map(obj => {
          if(obj.id === product.id){
              return{
                  ...obj,
                  quantite: quantite
              }
          }
          return obj;
      });
        const modifProduit = this.state.products.map(obj => {
          if(obj.id === product.id){
              return{
                  ...obj,
                  stock: obj.stock + (product.quantite - quantite)
              };
          }
          return obj;
        })
        this.setState({
          Panier: modifPanier,
          products: modifProduit,
          total: this.state.total + (product.price*(quantite - product.quantite)),
          totalPoids: this.state.totalPoids + (product.weight*(quantite - product.quantite))
        })

  }

  // Supprimer un produit dans le panier lorsque l'on appuie sur l'image poubelle
  supprimerPanier(product){
      const modifProduit = this.state.products.map(obj => {
          if(obj.id === product.id){
              return{
                  ...obj,
                  stock: obj.stock + parseInt(product.quantite)
              };
          }
          return obj;
      })
      this.setState({
          Panier: this.state.Panier.filter(e => e !== product),
          products: modifProduit,
          total: this.state.total - (product.price*(product.quantite)),
          totalPoids: this.state.totalPoids - (product.weight*(product.quantite))
      })
  }


    filterChanged(newFilterText){
        this.setState({filterText : newFilterText});
    }

  render() {
    return (
      <div className='app'>
        <ProductList ajoutPanier = {this.ajoutPanier.bind(this)} products = {this.state.products}
                     filterText = {this.state.filterText} filterChanged={this.filterChanged.bind(this)}/>
        <Cart produits = {this.state.Panier} supprimerPanier = {this.supprimerPanier.bind(this)}
              total = {this.state.total} totalPoids = {this.state.totalPoids} updateQuantite = {this.updateQuantite.bind(this)}/>
      </div>
    );
  }
}
