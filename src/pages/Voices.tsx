import { Avatar, List, Typography, Flex, Button, Modal } from "antd"
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
        renderItem={(voice, index) => (
          <List.Item
            actions={[<Button onClick={() => openModal(voice)}>Редактировать</Button>, <Button danger>Удалить</Button>]}>
            <List.Item.Meta
              avatar={
                <Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />
              }
              title={voice.name}
              description={voice.description}
            />
          </List.Item>
        )}
      />
      <Modal title="Данные диктора" footer={null} open={isOpen} onCancel={() => setIsOpen(false)}>
        <VoiceModal voice={selectedVoice}/>
      </Modal>
    </Flex>
  )
}

export default Voices