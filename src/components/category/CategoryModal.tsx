
import { Flex, Input, Button } from "antd";

import { Category } from "../../@types/entity/Category";
import { useEffect, useState } from "react";
import { useCreateCategoryMutation, useUpdateCategoryMutation } from "../../api/category";
import { useAppDispatch } from "../../store/storeHooks";
import { addCategory, editCategory } from "../../store/slices/categorySlice";

type Props = {
  category: Category | null;
  close: () => void;
}

const CategoryModal = ({ category, close }: Props) => {
  const [createCategory, {data: dataCreate, isLoading: isLoadingCreate}] = useCreateCategoryMutation();
  const [updateCategory, {isLoading: isLoadingUpdate}] = useUpdateCategoryMutation();
  const [currentCategory, setCurrentCategory] = useState<Partial<Category> | null>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setCurrentCategory(null)
    category && setCurrentCategory(category)
  }, [category])

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedCategory = { ...currentCategory, name: e.target.value };
    setCurrentCategory(updatedCategory);
  };

  const onClick = async () => {
    if (category && currentCategory) {
      await updateCategory(currentCategory).unwrap()
      dispatch(editCategory(currentCategory))
    } else if (currentCategory) {
      await createCategory(currentCategory).unwrap()
    };
    close();
  }

  useEffect(() => {
    dataCreate && dispatch(addCategory(currentCategory))
  }, [dataCreate])
  
  return (
    <Flex vertical gap={10}>
      <Input addonBefore={'Название категории'} value={currentCategory ? currentCategory.name : ''} onChange={handleNameChange}/>
      <Button type="primary" htmlType="submit" onClick={onClick} loading={isLoadingCreate || isLoadingUpdate}>Сохранить</Button>
    </Flex>

  )
}

export default CategoryModal;