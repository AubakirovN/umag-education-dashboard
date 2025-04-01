// import Editor from "@/components/AppLayout/components/Editor/Editor";
import { LoadingBlock } from "@/components/AppLayout/components/LoadingBlock";
import { CustomModal } from "@/components/CustomModal";
import { createLesson } from "@/core/api";
import { Box, Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Dispatch, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

interface AddLessonModalProps {
  open: boolean;
  onClose: () => void;
  setChanges: Dispatch<SetStateAction<boolean>>;
}

export const AddLessonModal = ({
  open,
  onClose,
  setChanges,
}: AddLessonModalProps) => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  // {
  //   "title":"",
  //   "description":"", // optional
  //   "video_url": "", // optional
  //   "course_block_id":1
  //   }

  const initialValues: any = {
    title: "",
    description: "",
    video_url: "",
    course_block_id: id,
  };

  const form = useForm({
    initialValues: initialValues,
    validateInputOnBlur: true,
    validate: {
      title: (value) => {
        if (!value) {
          return t("form.validate.required");
        } else {
          return null;
        }
      },
      description: (value) => {
        if (!value) {
          return t("form.validate.required");
        } else {
          return null;
        }
      },
      video_url: (value) => {
        if (!value) {
          return t("form.validate.required");
        } else {
          return null;
        }
      },
      course_block_id: (value) => {
        if (!value) {
          return t("form.validate.required");
        } else {
          return null;
        }
      },
    },
  });

  const close = () => {
    form.reset();
    onClose();
  };

  const handleSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      await createLesson(values);
      close();
      setChanges((prev) => !prev);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CustomModal
      opened={open}
      onClose={close}
      title={t("blocks.modal.blockCreating")}
      scrolling
    >
      <form onSubmit={form.onSubmit(handleSubmit)} className="wws">
        <Box maw={500} mx="auto">
          <TextInput
            label="Название урока"
            placeholder="Введите название"
            {...form.getInputProps("title")}
            withAsterisk
          />
          {/* <Editor
            value={form.values.description}
            setValue={(val: any) => form.setFieldValue("description", val)}
          /> */}
          <TextInput
            label="Видео"
            placeholder="Введите ссылку"
            {...form.getInputProps("vide_url")}
            withAsterisk
          />
          <Group m="md" spacing="xs" position="right">
            <Button color="red" onClick={close}>
              {t("buttons.cancel")}
            </Button>
            <Button type="submit">{t("buttons.create")}</Button>
          </Group>
        </Box>
      </form>
      <LoadingBlock isLoading={isLoading} />
    </CustomModal>
  );
};
