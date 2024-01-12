import { Avatar, List, Typography, Flex, Button, Modal, Popconfirm } from "antd"
import { useAppSelector } from "../store/storeHooks"
import { selectVoices } from "../store/slices/voiceSlice"
import { useState } from "react"

import VoiceModal from "../components/voice/VoiceModal"
import { Voice } from "../@types/entity/Voice"

const { Title } = Typography
const Voices = () => {

  const [isOpen, setIsOpen] = useState(false);
  const voices = useAppSelector(selectVoices);
  const [selectedVoice, setSelectedVoice] = useState<Voice | null>(null);

  const openModal = (item: Voice | null) => {
    setSelectedVoice(item);
    setIsOpen(true)
  }

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