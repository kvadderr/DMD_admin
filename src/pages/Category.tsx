import { useState } from "react";
import { Table, Typography, Flex, Button, Modal, Space } from "antd"
import type { ColumnsType } from 'antd/es/table';
import { useAppSelector } from "../store/storeHooks"
import { selectCategories } from "../store/slices/categorySlice"
import { Category } from "../@types/entity/Category";

import CategoryModal from "../components/category/CategoryModal";

const { Title, Text } = Typography;


const CategoryPage = () => {
  const categories = useAppSelector(selectCategories);
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const openModal = (item: Category | null) => {
    setSelectedCategory(item);
    setIsOpen(true)
  }

  const columns: ColumnsType<Category> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <Text key={text}>{text}</Text>,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, item) => (
        <Space size="middle" key={item.id}>
          <Button onClick={() => openModal(item)}>Изменить</Button>
          <Button danger>Удалить</Button>
        </Space>
      ),
    },
  ];

  return (
    <Flex vertical gap={10}>
      <Flex align="center" justify="space-between">
        <Title level={4}>Категории</Title>
        <Button type="primary" onClick={() => openModal(null)}>Добавить категорию</Button>
      </Flex>
      <Table columns={columns} dataSource={categories} rowKey={category => category.id}/>
      <Modal title="Данные категории" footer={null} open={isOpen} onCancel={() => setIsOpen(false)}>
        <CategoryModal category={selectedCategory} close={() => setIsOpen(false)}/>
      </Modal>
    </Flex>
  )
}

export default CategoryPage