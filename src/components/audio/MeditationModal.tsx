import { useEffect, useState } from "react";
import { Input, Button, Form, Checkbox, Upload, Space, Tag, Flex } from "antd";
import { useCreateMeditationMutation, useUpdateMeditationMutation } from "../../api/meditation";
import { useAppDispatch, useAppSelector } from "../../store/storeHooks";
import { Meditation } from "../../@types/entity/Meditation";
import { selectCategories } from "../../store/slices/categorySlice";
import { Category } from "../../@types/entity/Category";

import { addMeditation, editMeditatation } from "../../store/slices/meditationSlice";
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import type { UploadChangeParam } from 'antd/es/upload';
import { useForm } from "antd/es/form/Form";
const { CheckableTag } = Tag;

type Props = {
  meditatation: Meditation | null;
  close: () => void;
}

const MeditationModal = ({ meditatation, close }: Props) => {
  const [form] = useForm();
  const dispatch = useAppDispatch();
  const [createMeditation, { data: dataCreate, isLoading: createIsLoading }] = useCreateMeditationMutation();
  const [updateMeditation, { isLoading: updateIsLoading }] = useUpdateMeditationMutation();

  const categories = useAppSelector(selectCategories);
  const [selectedTags, setSelectedTags] = useState<Category[]>([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [photo, setPhoto] = useState<string | null>();

  const handleChange = (tag: Category, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t.id !== tag.id);
    setSelectedTags(nextSelectedTags);
  };

  const handleChangePhoto: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'done') {
      setPhoto(info.file.response.Location);
    }
  };

  useEffect(() => {
    if(dataCreate) {
      dispatch(addMeditation(dataCreate));
      close();
    } 
  }, [dataCreate])

  const onFinish = async (values: any) => {
    values.categories = selectedTags;
    values.photo = photo;
    values.isSubscribed = isSubscribed;
    meditatation = { ...(meditatation || {}), ...values };
    if (meditatation?.id) {
      meditatation && await updateMeditation(meditatation).unwrap()
      dispatch(editMeditatation(meditatation))
      close();
    } else {
      meditatation && await createMeditation(meditatation).unwrap()
    };


  }

  useEffect(() => {
    form.resetFields()
    if (meditatation) {
      setSelectedTags([...meditatation.categories]);
      setPhoto(meditatation.photo);
      setIsSubscribed(meditatation.isSubscribed);
    } else {
      setSelectedTags([]);
      setPhoto(null);
      setIsSubscribed(false)
    }
  }, [meditatation])

  return (
    <Flex gap={20}>
      <Upload
        name="avatar"
        listType="picture-card"
        showUploadList={false}
        onChange={handleChangePhoto}
        action={import.meta.env.VITE_FILE_STORAGE_URL + "/uploadImage"}>
        {photo ? <img src={photo} alt="avatar" style={{ height: 400, objectFit: 'cover' }} /> : "Загрузить"}
      </Upload>
      <Flex vertical>
        <Form form={form} name="loginForm" initialValues={meditatation || undefined} autoComplete="off" onFinish={onFinish}>
          <Form.Item name="name" rules={[{ required: true, message: 'Пожалуйста, введите название!' }]}>
            <Input addonBefore='Название' />
          </Form.Item>
          <Form.Item name="description" rules={[{ required: true, message: 'Пожалуйста, введите описание!' }]}>
            <Input.TextArea rows={4} placeholder="Описание" />
          </Form.Item>
          <Form.Item name="isSubscribed">
            <Checkbox checked={isSubscribed} onChange={() => setIsSubscribed(!isSubscribed)}>Доступ по подписке</Checkbox>
          </Form.Item>
          <Form.Item>
            <Space size={[0, 8]} wrap>
              {categories.map((category) => (
                <CheckableTag
                  key={category.id}
                  checked={selectedTags.some(tag => tag.id === category.id)}
                  onChange={(checked) => handleChange(category, checked)}
                >
                  {category.name}
                </CheckableTag>
              ))}
            </Space>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={createIsLoading || updateIsLoading}>Сохранить</Button>
          </Form.Item>
        </Form>
      </Flex>
    </Flex>
  )
}

export default MeditationModal;