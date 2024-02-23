import { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/storeHooks";
import { Flex, Input, Button, Upload, Space } from "antd";
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import type { UploadChangeParam } from 'antd/es/upload';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import { addslogan, editslogan } from "../../store/slices/sloganSlice";
import { Slogan } from "../../@types/entity/Slogan";
import { useCreateSloganMutation, useUpdateSloganMutation } from "../../api/slogan";

type Props = {
  slogan: Slogan | null;
  close: () => void;
}


const SloganModal = ({ slogan, close }: Props) => {
  const voiceBasicData = {
    title: "",
    image: "",
  }
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [createVoice, { data:  dataCreate, isLoading: isLoadingCreate }] = useCreateSloganMutation();
  const [updateVoice, { isLoading: isLoadingUpdate }] = useUpdateSloganMutation();
  const [voiceData, setVoiceData] = useState<Partial<Slogan>>(voiceBasicData);

  useEffect(() => {
    setVoiceData(slogan ? slogan: voiceBasicData)
  }, [slogan])

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedVoice = { ...voiceData, title: e.target.value };
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

  const save = async () => {
    if (slogan && voiceData) {
      await updateVoice(voiceData).unwrap()
      dispatch(editslogan(voiceData))
    } else if (voiceData) {
      await createVoice(voiceData).unwrap()
    };
    close();
  }

  useEffect(() => {
    dataCreate && dispatch(addslogan(dataCreate))
  }, [dataCreate])

  return (
    <Flex vertical gap={10}>
      <Space>
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action={import.meta.env.VITE_FILE_STORAGE_URL + "/uploadVoice"}
          onChange={handleChange}
        >
          {voiceData.image ? <img src={voiceData.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : uploadButton}
        </Upload>
        <Space direction="vertical">
          <Input addonBefore={'Слоган'} value={voiceData.title} onChange={handleNameChange} />
          <Button type="primary" htmlType="submit" loading={isLoadingCreate || isLoadingUpdate || loading} onClick={save}>Сохранить</Button>  
        </Space>
      </Space>
    </Flex>

  )
}

export default SloganModal;