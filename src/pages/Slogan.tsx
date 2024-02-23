import { Avatar, List, Typography, Flex, Button, Modal, Card, App } from "antd"
import { useAppDispatch, useAppSelector } from "../store/storeHooks"
import { useState, useEffect } from "react"
import { Slogan } from "../@types/entity/Slogan"
import { removeslogan, selectslogans } from "../store/slices/sloganSlice"
import { useDeleteSoundMutation } from "../api/sound"
import SloganModal from "../components/audio/SloganModal"
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDeleteSloganMutation } from "../api/slogan"

const { Meta } = Card;
const { Title } = Typography
const Slogans = () => {

  const [isOpen, setIsOpen] = useState(false);
  const { notification } = App.useApp();
  const dispatch = useAppDispatch();

  const slogans = useAppSelector(selectslogans)
  const [selectedSlogan, setSelectedSlogan] = useState<Slogan | null>(null);
  const [deleteSlogan, { error, data: deleteData }] = useDeleteSloganMutation();
  const openModal = (item: Slogan | null) => {
    setSelectedSlogan(item);
    setIsOpen(true)
  }

  useEffect(() => {
    error && notification.info({
      message: `Ошибка`,
      description: 'Невозможно удалить диктора! Его записи используются',
    })
    deleteData && dispatch(removeslogan({ id: deleteData }))
  }, [error, deleteData])

  return (
    <Flex vertical gap={10}>
      <Flex align="center" justify="space-between">
        <Title level={4}>Слоганы</Title>
        <Button type="primary" onClick={() => openModal(null)}>Добавить слог</Button>
      </Flex>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={slogans}
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
            <Meta description={slogan.title} />
          </Card>
        )}
      />
      <Modal title="Данные слогана" footer={null} open={isOpen} onCancel={() => setIsOpen(false)}>
        <SloganModal slogan={selectedSlogan} close={() => setIsOpen(false)} />
      </Modal>
    </Flex>
  )
}

export default Slogans