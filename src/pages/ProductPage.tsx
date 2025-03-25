import React from 'react';
import { Row, Col, Input, Select, Slider, Card, Typography, Space, Empty, Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import ProductCard from '../components/ProductCard';

const { Title } = Typography;
const { Option } = Select;

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  stock: number;
  description: string;
}

const ProductPage: React.FC = () => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [priceRange, setPriceRange] = React.useState<[number, number]>([0, 50000]);

  React.useEffect(() => {
    // 模擬產品數據
    const mockProducts = [
      {
        _id: '1',
        name: '智能手機',
        price: 29999,
        image: 'https://via.placeholder.com/300',
        category: '電子產品',
        rating: 4.5,
        stock: 10,
        description: '最新款智能手機'
      },
      {
        _id: '2',
        name: '筆記型電腦',
        price: 39999,
        image: 'https://via.placeholder.com/300',
        category: '電子產品',
        rating: 4.8,
        stock: 5,
        description: '輕藏高效能筆電'
      },
      // ... 更多產品
    ];

    setTimeout(() => {
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  React.useEffect(() => {
    let result = [...products];

    // 搜索篩選
    if (searchTerm) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 分類篩選
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }

    // 價格篩選
    result = result.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    setFilteredProducts(result);
  }, [searchTerm, selectedCategory, priceRange, products]);

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={6}>
          <Card>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Title level={4}>篩選</Title>
              <Input
                placeholder="搜索產品..."
                prefix={<SearchOutlined />}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Select
                style={{ width: '100%' }}
                defaultValue="all"
                onChange={setSelectedCategory}
              >
                <Option value="all">所有分類</Option>
                <Option value="電子產品">電子產品</Option>
                <Option value="家電">家電</Option>
                <Option value="生活用品">生活用品</Option>
              </Select>
              <div>
                <Title level={5}>價格範圍</Title>
                <Slider
                  range
                  min={0}
                  max={50000}
                  defaultValue={priceRange}
                  onChange={(value: [number, number]) => setPriceRange(value)}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>NT$ {priceRange[0]}</span>
                  <span>NT$ {priceRange[1]}</span>
                </div>
              </div>
            </Space>
          </Card>
        </Col>
        <Col xs={24} md={18}>
          {filteredProducts.length > 0 ? (
            <Row gutter={[16, 16]}>
              {filteredProducts.map((product) => (
                <Col xs={24} sm={12} md={8} lg={6} key={product._id}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          ) : (
            <Empty description="沒有找到符合條件的產品" />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ProductPage;