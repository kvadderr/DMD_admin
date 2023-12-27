import { Table, Typography, Flex, Button, Modal, Space, Checkbox, Tag } from "antd"
import type { ColumnsType } from 'antd/es/table';
import { Meditation } from "../@types/entity/Meditation";
import { useAppSelector } from "../store/storeHooks";
import { selectMeditation } from "../store/slices/meditationSlice";
import { useState } from "react";

const { Text, Title } = Typography

const MeditationPage = () => {

  const [isOpen, setIsOpen] = useState(false);

  const meditations = useAppSelector(selectMeditation)
  const columns: ColumnsType<Meditation> = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'description',
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: 'Доступ',
      dataIndex: 'isSubscribed',
      key: 'isSubscribed',
      render: (isChecked) => <Checkbox checked={isChecked}>Подписка</Checkbox>,
    },
    {
      title: 'Категории',
      key: 'categories',
      dataIndex: 'categories',
      render: (_, { categories }) => (
        <>
          {categories.map((category) => {
            let color = 'green';
            return (
              <Tag color={color} key={category.id}>
                {category.name.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, item) => (
        <Space size="middle" key={item.id}>
          <Button>Изменить</Button>
        </Space>
      ),
    },
  ];

  return (
    <Flex vertical gap={10}>
      <Flex align="center" justify="space-between">
        <Title level={4}>Медитации</Title>
        <Button type="primary" onClick={() => setIsOpen(true)}>Добавить медитацию</Button>
      </Flex>
      <Table columns={columns} dataSource={meditations} />
      <Modal title="Данные медитации" footer={null} open={isOpen} onCancel={() => setIsOpen(false)}>
      </Modal>
    </Flex>
  )
}

export default MeditationPage