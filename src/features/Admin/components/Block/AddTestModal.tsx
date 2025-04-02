// import { LoadingBlock } from "@/components/AppLayout/components/LoadingBlock";
// import { CustomModal } from "@/components/CustomModal";
// import { createLesson } from "@/core/api";
// import { Box, Button, Flex, Group, Text, TextInput } from "@mantine/core";
// import { useForm } from "@mantine/form";
// import { Dispatch, SetStateAction, useState } from "react";
// import { useTranslation } from "react-i18next";
// import { useParams } from "react-router-dom";
// import { BaseCKEditor } from "../CKEditor/BaseCKEditor";

// interface AddTestModalProps {
//   open: boolean;
//   onClose: () => void;
//   setChanges: Dispatch<SetStateAction<boolean>>;
// }

// export const AddTestModal = ({
//   open,
//   onClose,
//   setChanges,
// }: AddTestModalProps) => {
//   const { id } = useParams();
//   const { t } = useTranslation();
//   const [isLoading, setIsLoading] = useState(false);

//   const initialValues: any = {
//     title: "",
//     description: "",
//     video_url: "",
//     course_block_id: id,
//   };

//   const form = useForm({
//     initialValues: initialValues,
//     validateInputOnBlur: true,
//     validate: {
//       question: (value) => {
//         if (!value) {
//           return t("form.validate.required");
//         } else {
//           return null;
//         }
//       },
//       answers: (value) => {
//         if (!value)
//       }
//       course_block_id: (value) => {
//         if (!value) {
//           return t("form.validate.required");
//         } else {
//           return null;
//         }
//       },
//     },
//   });

//   const close = () => {
//     form.reset();
//     onClose();
//   };

//   const handleSubmit = async (values: any) => {
//     setIsLoading(true);
//     try {
//       await createLesson(values);
//       close();
//       setChanges((prev) => !prev);
//     } catch (e) {
//       console.error(e);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <CustomModal
//       opened={open}
//       onClose={close}
//       title={t("blocks.modal.blockCreating")}
//       scrolling
//     >
//       <form onSubmit={form.onSubmit(handleSubmit)} className="wws">
//         <Box maw={500} mx="auto">
//           <Flex direction='column' gap={10}>
//           <TextInput
//             label="Название урока"
//             placeholder="Введите название"
//             {...form.getInputProps("title")}
//             withAsterisk
//           />
//           <Text fz={14}>Описание <span style={{color: '#fa5252'}}>*</span></Text>
//           <BaseCKEditor
//             onChange={(e) => {
//               form.setFieldValue("description", e.editor.getData());
//             }}
//             initData={form.values.description}
//             style={{
//               border: form.errors.description
//                 ? "1px solid #fa5252"
//                 : "1px solid #d1d1d1",
//             }}
//           />
//           <TextInput
//             label="Видео"
//             placeholder="Введите ссылку"
//             {...form.getInputProps("video_url")}
//             withAsterisk
//           />
//           </Flex>
//           <Group m="md" spacing="xs" position="right">
//             <Button color="red" onClick={close}>
//               {t("buttons.cancel")}
//             </Button>
//             <Button type="submit">{t("buttons.create")}</Button>
//           </Group>
//         </Box>
//       </form>
//       <LoadingBlock isLoading={isLoading} />
//     </CustomModal>
//   );
// };
