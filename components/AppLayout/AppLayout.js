import React from 'react';
import {
  TableOutlined,
  MenuOutlined,
  UserOutlined,
  HomeOutlined,
  ReadOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
const { SubMenu } = Menu;
import Link from 'next/link';

function AppLayout({ children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <div style={{ width: '265px', borderRight: '1px solid #c2c2c2' }}>
        <Menu
          mode='inline'
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
        >
          <SubMenu key='sub1' icon={<MenuOutlined />} title='Links'>
            <Menu.Item key='1' icon={<HomeOutlined />}>
              <Link href='/'>Home</Link>
            </Menu.Item>
            <Menu.Item key='2' icon={<UserOutlined />}>
              <Link href='/Students'>Students</Link>
            </Menu.Item>
            <Menu.Item key='3' icon={<ReadOutlined />}>
              <Link href='/Courses'>Courses</Link>
            </Menu.Item>
            <Menu.Item key='4' icon={<TableOutlined />}>
              <Link href='/Results'>Results</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
      <div style={{ flex: 1, backgroundColor: '#eee' }}>
        <div
          style={{
            margin: '2rem',
            padding: '2rem',
            backgroundColor: '#fff',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
