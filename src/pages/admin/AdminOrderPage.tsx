import React from 'react';
import {
  Table,
  Tag,
  Space,
  Button,
  Modal,
  Form,
  Select,
  Input,
  message,
  Typography,
  Descriptions,
  Drawer
} from 'antd';
import { EyeOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  _id: string;
  orderNumber: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  paymentMethod: string;
  shippingAddress: string;
  createdAt: string;
}

const AdminOrderPage: React.FC = () => {
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);
  const [drawerVisible, setDrawerVisible] = React.useState(false);
  const [form] = Form.useForm();

  React.useEffect(() => {
    // 模擬訂單數據
    const mockOrders = [
      {
        _id: '1',
        orderNumber: 'ORD001',
        userId: 'USER001',
        items: [
          {
            productId: 'PROD001',
            name: '智能手機',
            price: 29999,
            quantity: 1
          }
        ],
        totalAmount: 29999,
        status: '已付款',
        paymentMethod: '信用卡',
        shippingAddress: '台北市信義區...',
        createdAt: '2024-03-25 10:30:00'
      },
      // ... 更多訂單
    ];

    setTimeout(() => {
      setOrders(mockOrders);
      setLoading(false);
    }, 1000);
  }, []);

  const handleViewOrder = (record: Order) => {
    setSelectedOrder(record);
    setDrawerVisible(true);
  };

  const handleUpdateStatus = async (orderId: string, status: string) => {
    try {
      // 模擬更新請求
      await new Promise(resolve => setTimeout(resolve, 1000));
      const updatedOrders = orders.map(order =>
        order._id === orderId ? { ...order, status } : order
      );
      setOrders(updatedOrders);
      message.success('訂單狀態更新成功');
    } catch (error) {
      message.error('更新失敗');
    }
  };

  const columns = [
    {
      title: '訂單編號',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
    },
    {
      title: '總金額',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (amount: number) => `NT$ ${amount}`,
    },
    {
      title: '狀態',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = 'default';
        switch (status) {
          case '已付款':
            color = 'green';
            break;
          case '未付款':
            color = 'red';
            break;
          case '處理中':
            color = 'blue';
            break;
          case '已完成':
            color = 'purple';
            break;
          default:
            color = 'default';
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: '創建時間',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Order) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => handleViewOrder(record)}
          >
            查看
          </Button>
          <Select
            defaultValue={record.status}
            style={{ width: 120 }}
            onChange={(value) => handleUpdateStatus(record._id, value)}
          >
            <Option value="未付款">未付款</Option>
            <Option value="已付款">已付款</Option>
            <Option value="處理中">處理中</Option>
            <Option value="已完成">已完成</Option>
            <Option value="已取消">已取消</Option>
          </Select>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Title level={2}>訂單管理</Title>

      <Table
        columns={columns}
        dataSource={orders}
        rowKey="_id"
        loading={loading}
      />

      <Drawer
        title="訂單詳情"
        placement="right"
        width={600}
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        {selectedOrder && (
          <>
            <Descriptions title="訂單信息" bordered column={1}>
              <Descriptions.Item label="訂單編號">{selectedOrder.orderNumber}</Descriptions.Item>
              <Descriptions.Item label="總金額">NT$ {selectedOrder.totalAmount}</Descriptions.Item>
              <Descriptions.Item label="狀態">{selectedOrder.status}</Descriptions.Item>
              <Descriptions.Item label="付款方式">{selectedOrder.paymentMethod}</Descriptions.Item>
              <Descriptions.Item label="收貨地址">{selectedOrder.shippingAddress}</Descriptions.Item>
              <Descriptions.Item label="創建時間">{selectedOrder.createdAt}</Descriptions.Item>
            </Descriptions>

            <Title level={4} style={{ margin: '24px 0 12px' }}>訂單商品</Title>
            <Table
              columns={[
                {
                  title: '商品名稱',
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
                  title: '數量',
                  dataIndex: 'quantity',
                  key: 'quantity',
                },
                {
                  title: '小計',
                  key: 'subtotal',
                  render: (_, record: OrderItem) => `NT$ ${record.price * record.quantity}`,
                },
              ]}
              dataSource={selectedOrder.items}
              pagination={false}
              rowKey="productId"
            />
          </>
        )}
      </Drawer>
    </div>
  );
};

export default AdminOrderPage;