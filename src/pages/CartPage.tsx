import React from 'react';
import { Row, Col, List, Card, Typography, InputNumber, Button, Empty, Image, Space, Popconfirm, message } from 'antd';
import { DeleteOutlined, ShoppingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

interface CartItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(items);
    setLoading(false);
  }, []);

  const updateQuantity = (itemId: string, quantity: number) => {
    const updatedItems = cartItems.map(item =>
      item._id === itemId ? { ...item, quantity } : item
    );
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  const removeItem = (itemId: string) => {
    const updatedItems = cartItems.filter(item => item._id !== itemId);
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
    message.success('商品已移除');
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.setItem('cart', '[]');
    message.success('購物車已清空');
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (!localStorage.getItem('token')) {
      message.warning('請先登入');
      navigate('/login');
      return;
    }
    // 將導向結帳頁面
    navigate('/checkout');
  };

  if (loading) {
    return <div>加載中...</div>;
  }

  if (cartItems.length === 0) {
    return (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description="購物車是空的"
      >
        <Button type="primary" onClick={() => navigate('/products')}>
          繼續購物
        </Button>
      </Empty>
    );
  }

  return (
    <div>
      <Row gutter={24}>
        <Col xs={24} lg={16}>
          <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <Title level={2}>購物車</Title>
              <Popconfirm
                title="確定要清空購物車嗎？"
                onConfirm={clearCart}
                okText="確定"
                cancelText="取消"
              >
                <Button danger>清空購物車</Button>
              </Popconfirm>
            </div>
            <List
              itemLayout="horizontal"
              dataSource={cartItems}
              renderItem={item => (
                <List.Item
                  actions={[
                    <Popconfirm
                      title="確定要移除此商品嗎？"
                      onConfirm={() => removeItem(item._id)}
                      okText="確定"
                      cancelText="取消"
                    >
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                      />
                    </Popconfirm>
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Image width={80} src={item.image} />}
                    title={item.name}
                    description={
                      <Space direction="vertical">
                        <Text>NT$ {item.price}</Text>
                        <InputNumber
                          min={1}
                          max={10}
                          value={item.quantity}
                          onChange={(value) => updateQuantity(item._id, value || 1)}
                        />
                      </Space>
                    }
                  />
                  <div>NT$ {item.price * item.quantity}</div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card className="cart-summary">
            <Title level={3}>訂單摘要</Title>
            <div style={{ marginBottom: 16 }}>
              <Row justify="space-between">
                <Col>商品小計：</Col>
                <Col>NT$ {total}</Col>
              </Row>
              <Row justify="space-between">
                <Col>運費：</Col>
                <Col>NT$ 60</Col>
              </Row>
              <Divider />
              <Row justify="space-between">
                <Col><Text strong>總計：</Text></Col>
                <Col><Text strong>NT$ {total + 60}</Text></Col>
              </Row>
            </div>
            <Button
              type="primary"
              size="large"
              block
              icon={<ShoppingOutlined />}
              onClick={handleCheckout}
            >
              結帳
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CartPage;