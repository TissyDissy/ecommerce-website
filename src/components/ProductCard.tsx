import React from 'react';
import { Card, Typography, Rate, Tag, Button } from 'antd';
import { ShoppingCartOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;
const { Text } = Typography;

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    price: number;
    image: string;
    rating: number;
    stock: number;
    description: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = React.useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find((item: any) => item._id === product._id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <Card
      hoverable
      cover={
        <img
          alt={product.name}
          src={product.image}
          style={{ height: 200, objectFit: 'cover' }}
        />
      }
      actions={[
        <Button
          key="addToCart"
          type="link"
          icon={<ShoppingCartOutlined />}
          onClick={handleAddToCart}
        >
          加入購物車
        </Button>,
        <Button
          key="favorite"
          type="link"
          icon={isFavorite ? <HeartFilled /> : <HeartOutlined />}
          onClick={toggleFavorite}
        />
      ]}
      onClick={() => navigate(`/product/${product._id}`)}
    >
      <Meta
        title={product.name}
        description={
          <>
            <Text strong style={{ fontSize: 16, color: '#f5222d' }}>
              NT$ {product.price}
            </Text>
            <br />
            <Rate disabled defaultValue={product.rating} style={{ fontSize: 12 }} />
            <br />
            {product.stock > 0 ? (
              <Tag color="success">庫存: {product.stock}</Tag>
            ) : (
              <Tag color="error">缺貨中</Tag>
            )}
          </>
        }
      />
    </Card>
  );
};

export default ProductCard;