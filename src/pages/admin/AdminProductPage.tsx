import React from 'react';
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  message,
  Popconfirm,
  Typography
} from 'antd';
import { PlusOutlined, UploadOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';

const { Title } = Typography;
const { Option } = Select;

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  description: string;
}

const AdminProductPage: React.FC = () => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [editingProduct, setEditingProduct] = React.useState<Product | null>(null);
  const [form] = Form.useForm();

  React.useEffect(() => {
    // 模擬產品數據
    const mockProducts = [
      {
        _id: '1',
        name: '智能手機',
        price: 29999,
        image: 'https://via.placeholder.com/300',
        category: '電子產品',
        stock: 10,
        description: '最新款智能手機'
      },
      // ... 更多產品
    ];

    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  const handleAdd = () => {
    setEditingProduct(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (record: Product) => {
    setEditingProduct(record);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      // 模擬刪除請求
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProducts(products.filter(item => item._id !== id));
      message.success('產品刪除成功');
    } catch (error) {
      message.error('刪除失敗');
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingProduct) {
        // 模擬更新請求
        const updatedProducts = products.map(item =>
          item._id === editingProduct._id ? { ...item, ...values } : item
        );
        setProducts(updatedProducts);
        message.success('產品更新成功');
      } else {
        // 模擬新增請求
        const newProduct = {
          _id: Date.now().toString(),
          ...values
        };
        setProducts([...products, newProduct]);
        message.success('產品新增成功');
      }
      setModalVisible(false);
    } catch (error) {
      message.error('請填寫所有必填欄位');
    }
  };

  const uploadProps: UploadProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 上傳成功`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 上傳失敗`);
      }
    },
  };

  const columns = [
    {
      title: '圖片',
      dataIndex: 'image',
      key: 'image',
      render: (image: string) => (
        <img src={image} alt="產品" style={{ width: 50, height: 50, objectFit: 'cover' }} />
      ),
    },
    {
      title: '名稱',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '價格',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `NT$ ${price}`,
    },
    {
      title: '分類',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: '庫存',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Product) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            編輯
          </Button>
          <Popconfirm
            title="確定要刪除此產品嗎？"
            onConfirm={() => handleDelete(record._id)}
            okText="確定"
            cancelText="取消"
          >
            <Button type="primary" danger icon={<DeleteOutlined />}>
              刪除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={2}>產品管理</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          新增產品
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={products}
        rowKey="_id"
        loading={loading}
      />

      <Modal
        title={editingProduct ? '編輯產品' : '新增產品'}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="產品名稱"
            rules={[{ required: true, message: '請輸入產品名稱' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="price"
            label="價格"
            rules={[{ required: true, message: '請輸入價格' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={0}
              formatter={value => `NT$ ${value}`}
              parser={value => value!.replace('NT$ ', '')}
            />
          </Form.Item>

          <Form.Item
            name="category"
            label="分類"
            rules={[{ required: true, message: '請選擇分類' }]}
          >
            <Select>
              <Option value="電子產品">電子產品</Option>
              <Option value="家電">家電</Option>
              <Option value="生活用品">生活用品</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="stock"
            label="庫存"
            rules={[{ required: true, message: '請輸入庫存數量' }]}
          >
            <InputNumber style={{ width: '100%' }} min={0} />
          </Form.Item>

          <Form.Item
            name="description"
            label="產品描述"
            rules={[{ required: true, message: '請輸入產品描述' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            name="image"
            label="產品圖片"
          >
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>選擇圖片</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminProductPage;