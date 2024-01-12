import { Avatar, List, Typography, Flex, Button, Modal, Popconfirm, App } from "antd"
import { useAppDispatch, useAppSelector } from "../store/storeHooks"
import { selectVoices, removeVoice } from "../store/slices/voiceSlice"
import { useState, useEffect } from "react"
import { useDeleteVoiceMutation } from "../api/voice"
import VoiceModal from "../components/voice/VoiceModal"
import { Voice } from "../@types/entity/Voice"

const { Title } = Typography
const Voices = () => {

  const [isOpen, setIsOpen] = useState(false);
  const { notification } = App.useApp();
  const dispatch = useAppDispatch();
  const voices = useAppSelector(selectVoices);
  const [selectedVoice, setSelectedVoice] = useState<Voice | null>(null);
  const [deleteVoice, { error, data: deleteData }] = useDeleteVoiceMutation();
  const openModal = (item: Voice | null) => {
    setSelectedVoice(item);
    setIsOpen(true)
  }

  useEffect(() => {
    error && notification.info({
      message: `Ошибка`,
      description: 'Невозможно удалить диктора! Его записи используются',
    })
    deleteData && dispatch(removeVoice({id: deleteData}))
  }, [error, deleteData])

  return (
    <Flex vertical gap={10}>
      <Flex align="center" justify="space-between">
        <Title level={4}>Дикторы</Title>
        <Button type="primary" onClick={() => openModal(null)}>Добавить диктора</Button>
      </Flex>
      <List
        dataSource={voices}
        renderItem={(voice) => (
          <List.Item
            actions={[<Button onClick={() => openModal(voice)}>Редактировать</Button>,
            <Popconfirm
              title="Удаление диктора"
              description="Вы уверены  что хотите удалить?"
              okText="Да"
              onConfirm={() => deleteVoice(voice)}
              cancelText="Нет">
              <Button danger>Удалить</Button>
            </Popconfirm>]}>
            <List.Item.Meta
              avatar={<Avatar src={voice.photo} shape="square" size={64} />}
              title={voice.name}
              description={voice.description}
            />
          </List.Item>
        )}
      />
      <Modal title="Данные диктора" footer={null} open={isOpen} onCancel={() => setIsOpen(false)}>
        <VoiceModal voice={selectedVoice} close={() => setIsOpen(false)} />
      </Modal>
    </Flex>
  )
}

export default Voices