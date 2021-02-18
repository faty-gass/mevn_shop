
export function addToCart(state, payload) {
  if (state.products.find( prod => prod === payload)){
    const product = state.products.find( prod => prod === payload)
    product.countnb++
  } else {
    payload.countnb = 1
    state.products.push(payload)
  }
  
}

export function removeFrCart (state, payload){
  let prodIdx = state.products.indexOf(payload);
  state.products.splice(prodIdx, 1);
}

