import { useState } from "react";
import { Table, Typography, Flex, Button, Modal, Space, Checkbox, Tag } from "antd"
import type { ColumnsType } from 'antd/es/table';
import { Meditation } from "../@types/entity/Meditation";
import { useAppSelector } from "../store/storeHooks";

import MeditaionModal from "../components/meditation/MeditationModal";
import AudioModal from "../components/audio/AudioModal";

import { Audio } from "../@types/entity/Audio";
import { selectCategories } from "../store/slices/categorySlice";
import { selectMeditation } from "../store/slices/meditationSlice";

const { Text, Title } = Typography

const MeditationPage = () => {
  const categories = useAppSelector(selectCategories)
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAudio, setIsOpenAudio] = useState(false);
  const [selectedMeditation, setSelectedMeditation] = useState<Meditation | null>(null);
  const [audios, setAudios] = useState<Audio[]>();
  const meditations = useAppSelector(selectMeditation)

  const openModal = (item: Meditation | null) => {
    setSelectedMeditation(item);
    setIsOpen(true)
  }

  const openModalAudio = (item: Meditation) => {
    setSelectedMeditation(item)
    setAudios(item.audios);
    setIsOpenAudio(true)
  }

  const selectOptions = categories.map(category => ({
    text: category.name,
    value: category.id,
  }));

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
      sorter: (a, b) => (a.isSubscribed ? 1 : -1) - (b.isSubscribed ? 1 : -1),
      render: (isChecked) => <Checkbox checked={isChecked}>Подписка</Checkbox>,
    },
    {
      title: 'Категории',
      key: 'categories',
      dataIndex: 'categories',
      filters: selectOptions,
      onFilter: (value, record) => record.categories.some(category => category.id === value),
      render: (_, { categories }) => (
        <>
          {categories?.map((category) => {
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
          <Button onClick={() => openModal(item)}>Изменить</Button>
          <Button onClick={() => openModalAudio(item)}>Аудио</Button>
        </Space>
      ),
    },
  ];

  return (
    <Flex vertical gap={10}>
      <Flex align="center" justify="space-between">
        <Title level={4}>Медитации</Title>
        <Button type="primary" onClick={() => openModal(null)}>Добавить медитацию</Button>
      </Flex>
      <Table columns={columns} dataSource={meditations} rowKey={meditation => meditation.id}/>
      <Modal width={1200} title="Данные медитации" footer={null} open={isOpen} onCancel={() => setIsOpen(false)}>
        <MeditaionModal meditatation={selectedMeditation} close={() => setIsOpen(false)}/>
      </Modal>
      <Modal width={600} title="Данные аудио" footer={null} open={isOpenAudio} onCancel={() => setIsOpenAudio(false)}>
        <AudioModal audios={audios} meditation={selectedMeditation} close={() => setIsOpen(false)}/>
      </Modal>
    </Flex>
  )
}

export default MeditationPage