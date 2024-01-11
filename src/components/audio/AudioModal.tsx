import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/storeHooks";
import { Flex, Button, Upload, Select } from "antd";

import type { UploadProps } from 'antd';
import { useCreateAudioMutation, useUpdateAudioMutation } from "../../api/audio";
import { selectVoices } from "../../store/slices/voiceSlice";
import { Audio } from "../../@types/entity/Audio";
const { Dragger } = Upload;

type Props = {
  audio: Audio | null;
  close: () => void;
  meditationId?: number;
}

const AudioModal = ({ audio, close, meditationId }: Props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [createAudio, { isLoading: isLoadingCreate }] = useCreateAudioMutation();
  const [updateAudio, { isLoading: isLoadingUpdate }] = useUpdateAudioMutation();
  const [link, setLink] = useState("");
  const [selectedVoicer, setSelectedVoicer] = useState<number>()
  const voices = useAppSelector(selectVoices);
  const save = async () => {
    const data: Audio = {
      link: link,
      meditation_id: meditationId,
      voice_id: selectedVoicer
    }
    createAudio(data).unwrap()
  }

  const props: UploadProps = {
    name: 'file',
    multiple: false,
    action: import.meta.env.VITE_FILE_STORAGE_URL + "/uploadAudio",
    onChange(info) {
      if (info.file.status === 'uploading') {
        setLoading(true);
        return;
      }
      if (info.file.status === 'done') {
        setLoading(false);
        setLink(info.file.response.Location)
      }
    }
  };

  const selectOptions = voices.map(voice => ({
    value: voice.id,
    label: voice.name,
  }));

  const handleChange = (value: number) => {
    setSelectedVoicer(value);
  };
  

  return (
    <Flex vertical gap={10}>
      <Dragger {...props}>
        <p className="ant-upload-text">Загрузите новое аудио</p>
      </Dragger>
      <Select
        value={selectedVoicer}
        onChange={handleChange}
        options={selectOptions} />
      <Button type="primary" loading={isLoadingCreate || isLoadingUpdate || loading} onClick={save}>Сохранить</Button>
    </Flex>

  )
}

export default AudioModal;