import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/storeHooks";
import { Flex, Button, Upload, Select, List, Typography } from "antd";
import ReactAudioPlayer from 'react-audio-player';
import type { UploadProps } from 'antd';
import { useCreateAudioMutation, useDeleteAudioMutation } from "../../api/audio";
import { selectVoices } from "../../store/slices/voiceSlice";
import { addMeditatationAudio, removeMeditatationAudio } from "../../store/slices/meditationSlice";
import { Audio } from "../../@types/entity/Audio";
import { Meditation } from "../../@types/entity/Meditation";
const { Dragger } = Upload;

type Props = {
  audios?: Audio[];
  close: () => void;
  meditation: Meditation | null;
}

const AudioModal = ({ audios, meditation }: Props) => {
  
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [createAudio, { data: dataCreate, isLoading: isLoadingCreate }] = useCreateAudioMutation();
  const [deleteAudio, { data: dataDelete, error }] = useDeleteAudioMutation();
  const [link, setLink] = useState("");
  const [selectedVoicer, setSelectedVoicer] = useState<number>()
  const [audioData, setAudioData] = useState<Audio[]>([])
  const voices = useAppSelector(selectVoices);
  const save = async () => {
    const data: Audio = {
      link: link,
      meditation_id: meditation?.id,
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
  
  useEffect(() => {
    setAudioData(audios ? audios : [])
  }, [audios])
  useEffect(() => {
    if (dataCreate) {
      dispatch(addMeditatationAudio(dataCreate))
      const updatedAudios = [...audioData, dataCreate];
      setAudioData(updatedAudios)
    } 
  }, [dataCreate])

  const deleteAudioFromList = (id: number | undefined) => {
    deleteAudio({id: id})
    dispatch(removeMeditatationAudio({id: id}))
    const updatedAudios = audioData.filter(audio => audio.id !== id);
    setAudioData(updatedAudios)
  }

  useEffect(() => {
    
  }, [dataDelete, error])
  return (
    <Flex vertical gap={10}>
      <List
        itemLayout="horizontal"
        dataSource={audioData}
        renderItem={(item) => (
          <List.Item actions={[<a key="list-loadmore-more" onClick={() => deleteAudioFromList(item.id)}>Удалить</a>]}>
            <Flex align="center" gap={30}>
              <ReactAudioPlayer src={item.link} controls />
              <Typography.Text>{item.voice?.name}</Typography.Text>
            </Flex>
          </List.Item>
        )}
      />
      <Dragger {...props}>
        <p className="ant-upload-text">Загрузите новое аудио</p>
      </Dragger>
      <Select
        value={selectedVoicer}
        onChange={handleChange}
        options={selectOptions} />
      <Button type="primary" loading={isLoadingCreate || loading} onClick={save}>Сохранить</Button>
    </Flex>

  )
}

export default AudioModal;