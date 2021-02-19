
export function addToCart(state, payload) {
  if (state.products.find( prod => prod._id === payload._id)){
    const product = state.products.find( prod => prod._id === payload._id)
    product.countnb++
  } else {
    payload.countnb = 1
    state.products.push(payload)
  }
}

export function removeFrCart (state, payload){
  let prodIdx = state.products.indexOf(state.products.find( prod => prod._id === payload));
  state.products.splice(prodIdx, 1);
}

export function addOne (state, payload){
  let product = state.products.find( prod => prod._id === payload);
  product.countnb ++
}

export function removeOne (state, payload){
  let product = state.products.find( prod => prod._id === payload);
  if (product.countnb < 2){
    let prodIdx = state.products.indexOf(product);
    state.products.splice(prodIdx, 1);
  } else {
    product.countnb --
  }
}

export function deleteAll (state){
  state.products = [];
}

