import { useEffect, useState } from "react";
import { Flex, Input, Button, message, Upload } from "antd";
import type { UploadChangeParam } from 'antd/es/upload';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { useAppDispatch } from "../../store/storeHooks";
import { addVoice, editVoice } from "../../store/slices/voiceSlice";
import { useCreateVoiceMutation, useUpdateVoiceMutation } from "../../api/voice";
import { Voice } from "../../@types/entity/Voice";

import EasyYandexS3 from "easy-yandex-s3";

type Props = {
  voice: Voice | null;
}

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};



const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};


const VoiceModal = ({ voice }: Props) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [createCategory, { isLoading: isLoadingCreate }] = useCreateVoiceMutation();
  const [updateCategory, { isLoading: isLoadingUpdate }] = useUpdateVoiceMutation();
  const [currentVoice, setCurrentVoice] = useState<Partial<Voice> | null>(null);
  const dispatch = useAppDispatch();
  
  let s3 = new EasyYandexS3({
    auth: {
      accessKeyId: import.meta.env.VITE_KEY,
      secretAccessKey: import.meta.env.VITE_SECRET_KEY,
    },
    Bucket: 'dmdmeditationimage?key=voice', // например, "my-storage",
    debug: true, // Дебаг в консоли, потом можете удалить в релизе
  });

  const date = new Date();

  useEffect(() => {
    voice ? setCurrentVoice(voice) : setCurrentVoice(null)
  }, [voice])

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };


  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedVoice = { ...currentVoice, name: e.target.value };
    setCurrentVoice(updatedVoice);
  };

  const onClick = async () => {
    if (voice && currentVoice) {

    } else if (currentVoice) {

    };

  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Обновить аватар</div>
    </div>
  );
  
  
  
  return (
    <Flex vertical gap={10}>
      <Upload
        name="avatar"
        listType="picture-circle"
        className="avatar-uploader"
        showUploadList={false}
        headers={{'Access-Control-Allow-Origin': 'http://localhost:5173', "Authorization": "YCPNQb-vwfNPS8Ov90tWOSvY-2UFkMutpVskjs25"}}
        method="PUT"
        action="https://storage.yandexcloud.net/dmdmeditationimage/voice/edwefwefwef.png"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
      <Input addonBefore={'Имя диктора'} value={currentVoice ? currentVoice.name : ''} onChange={handleNameChange} />
      <Input addonBefore={'Данные'} value={currentVoice ? currentVoice.name : ''} onChange={handleNameChange} />
      <Button type="primary" htmlType="submit" onClick={onClick} loading={isLoadingCreate || isLoadingUpdate}>Сохранить</Button>
    </Flex>

  )
}

export default VoiceModal;