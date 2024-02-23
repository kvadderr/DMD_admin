import { useEffect, useState } from "react";
import { Table, Typography, Flex, Button, Modal, Space, App } from "antd"
import type { ColumnsType } from 'antd/es/table';
import { useAppDispatch, useAppSelector } from "../store/storeHooks"
import { selectCategories, removeCategory } from "../store/slices/categorySlice"
import { Category } from "../@types/entity/Category";
import { useDeleteCategoryMutation } from "../api/category";
import CategoryModal from "../components/audio/CategoryModal";

const { Title, Text } = Typography;


const CategoryPage = () => {
  const categories = useAppSelector(selectCategories);
  const { notification } = App.useApp();
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [deleteCategory, { error, data: deleteData }] = useDeleteCategoryMutation();
  const dispatch = useAppDispatch();
  const openModal = (item: Category | null) => {
    setSelectedCategory(item);
    setIsOpen(true)
  }

  const deleteCategoryFromTable = (item: Category) => {
    deleteCategory(item);
  }

  useEffect(() => {
    error && notification.info({
      message: `Ошибка`,
      description: 'Невозможно удалить категорию! Она уже используется',
    })
    deleteData && dispatch(removeCategory({id: deleteData}))
  }, [error, deleteData])


  const columns: ColumnsType<Category> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <Text key={text}>{text}</Text>,
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'description',
      render: (text) => <Text key={text}>{text}</Text>,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, item) => (
        <Space size="middle" key={item.id}>
          <Button onClick={() => openModal(item)}>Изменить</Button>
          <Button danger onClick={() => deleteCategoryFromTable(item)}>Удалить</Button>
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
      <Table columns={columns} dataSource={categories} rowKey={category => category.id} />
      <Modal title="Данные категории" footer={null} open={isOpen} onCancel={() => setIsOpen(false)}>
        <CategoryModal category={selectedCategory} close={() => setIsOpen(false)} />
      </Modal>
    </Flex>
  )
}

export default CategoryPage