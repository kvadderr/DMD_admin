import { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/storeHooks";
import { Flex, Input, Button, Upload, Space } from "antd";
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import type { UploadChangeParam } from 'antd/es/upload';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useCreateVoiceMutation, useUpdateVoiceMutation } from "../../api/voice";
import { Voice } from "../../@types/entity/Voice";
import { addVoice, editVoice } from "../../store/slices/voiceSlice";

type Props = {
  voice: Voice | null;
  close: () => void;
}


const VoiceModal = ({ voice, close }: Props) => {
  const voiceBasicData = {
    name: "",
    photo: "",
    description: ""
  }
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [createVoice, { data:  dataCreate, isLoading: isLoadingCreate }] = useCreateVoiceMutation();
  const [updateVoice, { isLoading: isLoadingUpdate }] = useUpdateVoiceMutation();
  const [voiceData, setVoiceData] = useState<Partial<Voice>>(voiceBasicData);

  useEffect(() => {
    setVoiceData(voice ? voice: voiceBasicData)
  }, [voice])

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedVoice = { ...voiceData, name: e.target.value };
    setVoiceData(updatedVoice);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedVoice = { ...voiceData, description: e.target.value };
    setVoiceData(updatedVoice);
  };

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      setLoading(false);
      const updatedVoice = { ...voiceData, photo: info.file.response.Location };
      setVoiceData(updatedVoice);
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Обновить аватар</div>
    </div>
  );

  const save = async () => {
    if (voice && voiceData) {
      await updateVoice(voiceData).unwrap()
      dispatch(editVoice(voiceData))
    } else if (voiceData) {
      await createVoice(voiceData).unwrap()
    };
    close();
  }

  useEffect(() => {
    dataCreate && dispatch(addVoice(dataCreate))
  }, [dataCreate])

  return (
    <Flex vertical gap={10}>
      <Space>
        <Upload
          name="avatar"
          listType="picture-circle"
          className="avatar-uploader"
          showUploadList={false}
          action={import.meta.env.VITE_FILE_STORAGE_URL + "/uploadVoice"}
          onChange={handleChange}
        >
          {voiceData.photo ? <img src={voiceData.photo} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 100 }} /> : uploadButton}
        </Upload>
        <Space direction="vertical">
          <Input addonBefore={'Имя диктора'} value={voiceData.name} onChange={handleNameChange} />
          <Input addonBefore={'Данные'} value={voiceData.description} onChange={handleDescriptionChange} />
        </Space>
      </Space>
      <Button type="primary" htmlType="submit" loading={isLoadingCreate || isLoadingUpdate || loading} onClick={save}>Сохранить</Button>
    </Flex>

  )
}

export default VoiceModal;