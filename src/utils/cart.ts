export interface CartItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export const getCart = (): CartItem[] => {
  return JSON.parse(localStorage.getItem('cart') || '[]');
};

export const addToCart = (item: CartItem) => {
  const cart = getCart();
  const existingItem = cart.find(i => i._id === item._id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
};

export const updateCartItemQuantity = (itemId: string, quantity: number) => {
  const cart = getCart();
  const item = cart.find(i => i._id === itemId);

  if (item) {
    item.quantity = quantity;
    localStorage.setItem('cart', JSON.stringify(cart));
  }
};

export const removeFromCart = (itemId: string) => {
  const cart = getCart();
  const updatedCart = cart.filter(item => item._id !== itemId);
  localStorage.setItem('cart', JSON.stringify(updatedCart));
};

export const clearCart = () => {
  localStorage.setItem('cart', '[]');
};

export const getCartTotal = (): number => {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};