import { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/storeHooks";
import { Flex, Input, Button, Upload, Space } from "antd";
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import type { UploadChangeParam } from 'antd/es/upload';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import ReactAudioPlayer from "react-audio-player";
import { addslogan, editslogan } from "../../store/slices/sloganSlice";
import { useCreateSloganMutation, useUpdateSloganMutation } from "../../api/slogan";
import { Sound } from "../../@types/entity/Sound";
import { useCreateSoundMutation, useUpdateSoundMutation } from "../../api/sound";
import { addsound, editsound } from "../../store/slices/soundSlice";

const { Dragger } = Upload;
type Props = {
  slogan: Sound | null;
  close: () => void;
}


const SoundModal = ({ slogan, close }: Props) => {
  const voiceBasicData = {
    name: "",
    image: "",
    sound: ""
  }
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [createVoice, { data: dataCreate, isLoading: isLoadingCreate }] = useCreateSoundMutation();
  const [updateVoice, { isLoading: isLoadingUpdate }] = useUpdateSoundMutation();
  const [voiceData, setVoiceData] = useState<Partial<Sound>>(voiceBasicData);

  useEffect(() => {
    setVoiceData(slogan ? slogan : voiceBasicData)
  }, [slogan])

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedVoice = { ...voiceData, name: e.target.value };
    setVoiceData(updatedVoice);
  };

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      setLoading(false);
      const updatedVoice = { ...voiceData, image: info.file.response.Location };
      setVoiceData(updatedVoice);
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Обновить изображение</div>
    </div>
  );

  const props: UploadProps = {
    name: 'file',
    multiple: false,
    action: import.meta.env.VITE_FILE_STORAGE_URL + "/uploadSound",
    onChange(info) {
      if (info.file.status === 'uploading') {
        setLoading(true);
        return;
      }
      if (info.file.status === 'done') {
        setLoading(false);
        const updatedVoice = { ...voiceData, sound: info.file.response.Location };
        setVoiceData(updatedVoice);
        console.log(voiceData)
      }
    }
  };

  const save = async () => {
    if (slogan && voiceData) {
      await updateVoice(voiceData).unwrap()
      dispatch(editsound(voiceData))
    } else if (voiceData) {
      await createVoice(voiceData).unwrap()
    };
    close();
  }

  useEffect(() => {
    dataCreate && dispatch(addsound(dataCreate))
  }, [dataCreate])

  return (
    <Flex vertical gap={10}>
      <Space>
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action={import.meta.env.VITE_FILE_STORAGE_URL + "/uploadImage"}
          onChange={handleChange}
        >
          {voiceData.image ? <img src={voiceData.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : uploadButton}
        </Upload>
        <Space direction="vertical">
          <Input addonBefore={'Название'} value={voiceData.name} onChange={handleNameChange} />
          {voiceData.sound !== "" && <ReactAudioPlayer src={voiceData.sound} controls />}
        </Space>
      </Space>
      <Dragger {...props}>
        <p className="ant-upload-text">Загрузите новое аудио</p>
      </Dragger>
      <Button type="primary" htmlType="submit" loading={isLoadingCreate || isLoadingUpdate || loading} onClick={save}>Сохранить</Button>
    </Flex>

  )
}

export default SoundModal;