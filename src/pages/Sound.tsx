import { List, Typography, Flex, Button, Modal, Card, App } from "antd"
import { useAppDispatch, useAppSelector } from "../store/storeHooks"
import { useState, useEffect } from "react"
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Sound } from "../@types/entity/Sound"
import { removesound, selectsounds } from "../store/slices/soundSlice"
import { useDeleteSoundMutation } from "../api/sound"
import SoundModal from "../components/audio/SoundModal";

const { Meta } = Card;
const { Title } = Typography
const SoundPage = () => {

  const [isOpen, setIsOpen] = useState(false);
  const { notification } = App.useApp();
  const dispatch = useAppDispatch();

  const slogans = useAppSelector(selectsounds)
  const [selectedSlogan, setSelectedSlogan] = useState<Sound | null>(null);
  const [deleteSlogan, { error, data: deleteData }] = useDeleteSoundMutation();
  const openModal = (item: Sound | null) => {
    setSelectedSlogan(item);
    setIsOpen(true)
  }

  useEffect(() => {
    error && notification.info({
      message: `Ошибка`,
      description: 'Невозможно удалить звук!',
    })
    deleteData && dispatch(removesound({ id: deleteData }))
  }, [error, deleteData])

  return (
    <Flex vertical gap={10}>
      <Flex align="center" justify="space-between">
        <Title level={4}>Звуки</Title>
        <Button type="primary" onClick={() => openModal(null)}>Добавить звук</Button>
      </Flex>
      <List
        dataSource={slogans}
        grid={{ gutter: 16, column: 4 }}
        renderItem={(slogan) => (
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src={slogan.image} />}
            actions={[
              <EditOutlined key="edit" onClick={() => openModal(slogan)} />,
              <DeleteOutlined key="setting" onClick={() => deleteSlogan(slogan)} />,
            ]}
          >
            <Meta title={slogan.name} />
          </Card>
        )}
      />
      <Modal title="Звук" footer={null} open={isOpen} onCancel={() => setIsOpen(false)}>
        <SoundModal slogan={selectedSlogan} close={() => setIsOpen(false)} />
      </Modal>
    </Flex>
  )
}

export default SoundPage