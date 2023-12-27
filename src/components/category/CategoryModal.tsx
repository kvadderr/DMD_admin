
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

const CategoryModal = ({ category }: Props) => {
  const [createCategory, {isLoading: isLoadingCreate}] = useCreateCategoryMutation();
  const [updateCategory, {isLoading: isLoadingUpdate}] = useUpdateCategoryMutation();
  const [currentCategory, setCurrentCategory] = useState<Category | null>();
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
      console.log(currentCategory)
      await updateCategory(currentCategory).unwrap()
      dispatch(editCategory(currentCategory))
    } else if (currentCategory) {
      await createCategory(currentCategory).unwrap()
      dispatch(addCategory(currentCategory))
    };
    
  }

  return (
    <Flex vertical gap={10}>
      <Input addonBefore={'Название категории'} value={currentCategory ? currentCategory.name : ''} onChange={handleNameChange}/>
      <Button type="primary" htmlType="submit" onClick={onClick} loading={isLoadingCreate || isLoadingUpdate}>Сохранить</Button>
    </Flex>

  )
}

export default CategoryModal;