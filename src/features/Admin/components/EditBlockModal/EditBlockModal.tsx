import { LoadingBlock } from "@/components/AppLayout/components/LoadingBlock";
import { AsyncSelect } from "@/components/AsyncSelect";
import { CustomModal } from "@/components/CustomModal";
import {
  editBlock,
  getCourseBlockById,
  getCourseBlocksById,
  getCourses,
} from "@/core/api";
import { Box, Button, Flex, Grid, Group, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MRT_PaginationState } from "mantine-react-table";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BaseCKEditor } from "../CKEditor/BaseCKEditor";
import { useParams } from "react-router-dom";

interface EditBlockModalProps {
  open: boolean;
  onClose: () => void;
  setChanges: Dispatch<SetStateAction<boolean>>;
  block: any;
}

export const EditBlockModal = ({
  open,
  onClose,
  setChanges,
  block,
}: EditBlockModalProps) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [temp, setTemp] = useState(false);
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState<string>("");
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 15,
  });
  const [isLoading, setIsLoading] = useState(false);

  const initialValues: any = {
    title: "",
    description: "",
    course_data: [
      {
        course_id: null,
        block_number: 0,
        max_attempts: 0,
        pass_count: 0,
      },
    ],
  };

  const form = useForm({
    initialValues: initialValues,
    validateInputOnBlur: true,
    validate: {
      title: (value) => (!value ? t("form.validate.required") : null),
      description: (value) => (!value ? t("form.validate.required") : null),
      course_data: (blocks) => {
        for (const block of blocks) {
          if (
            !block.course_id ||
            block.block_number <= 0 ||
            block.max_attempts <= 0 ||
            block.pass_count <= 0
          ) {
            return "Заполните все поля в каждом блоке";
          }
        }
        return null;
      },
    },
  });

  const close = () => {
    onClose();
    form.reset();
  };

  const handleAddBlock = () => {
    form.insertListItem("course_data", {
      course_id: null,
      block_number: 0,
      max_attempts: 0,
      pass_count: 0,
    });
  };

  const handleRemoveBlock = (index: number) => {
    form.removeListItem("course_data", index);
  };

  const handleSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      await editBlock(block?.id, values);
      close();
      setChanges((prev) => !prev);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const loadOptions = async () => {
    const params = {
      page: pagination.pageIndex + 1,
      per_page: pagination.pageSize,
      search: search,
    };
    setPagination({ ...pagination, pageIndex: pagination.pageIndex + 1 });
    const courses = await getCourses(params);
    return {
      options:
        courses?.data?.map((item: any) => ({
          value: item.id,
          label: item.title,
        })) ?? [],
      hasMore: courses?.current_page < courses?.last_page ? true : false,
    };
  };

  const handleSearchChange = (inputValue: string) => {
    if (inputValue === "" && search?.length === 1) {
      setSearch("");
      setPagination({ ...pagination, pageIndex: 0 });
    } else {
      setPagination({ ...pagination, pageIndex: 0 });
      setSearch(inputValue);
    }
  };

  const getBlockInfo = async () => {
    setTemp(true);
    const response = await getCourseBlockById(block?.id as string);
    setForm(response?.data);
    setTemp(false);
  };

  const setForm = (selectedBlock: any) => {
    form.setValues({
      title: selectedBlock?.title || "",
      description: selectedBlock?.description,
      course_data: selectedBlock?.courses?.map((course: any) => ({
        course_id: course?.pivot?.course_id || "",
        block_number: course?.pivot?.block_number || 0,
        max_attempts: course?.pivot?.max_attempts || 0,
        pass_count: course?.pivot?.pass_count || 0,
      })),
    });
    setCourses(
      selectedBlock?.courses?.map((item: any) => ({
        value: item?.id,
        label: item?.title,
      })) || []
    );
  };

  useEffect(() => {
    if (open) {
      if (id) {
        getBlockInfo();
      } else {
        setForm(block);
      }
    }
  }, [open]);

  return (
    <CustomModal
      opened={open}
      onClose={close}
      title={t("blocks.modal.blockCreating")}
      // scrolling
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Название"
          placeholder="Введите название"
          {...form.getInputProps("title")}
          withAsterisk
          mb="md"
        />
        {!temp && (
          <>
            <Text fz={14}>
              Описание блока <span style={{ color: "#fa5252" }}>*</span>
            </Text>
            <BaseCKEditor
              onChange={(e) => {
                form.setFieldValue("description", e.editor.getData());
              }}
              initData={form.values.description}
              style={{
                border: form.errors.description
                  ? "1px solid #fa5252"
                  : "1px solid #d1d1d1",
              }}
            />
          </>
        )}
        <Flex
          direction="column"
          mt="md"
          p="md"
          style={{ border: form.errors.course_data ? "1px solid red" : "" }}
        >
          {form.values?.course_data?.map((block: any, index: number) => (
            <Box key={index}>
              <Grid gutter="md" align="end">
                <Grid.Col span={3}>
                  <AsyncSelect
                    w="100%"
                    mah={150}
                    value={courses?.find(
                      (item: any) => item.value === block?.course_id
                    )}
                    loadOptions={loadOptions}
                    isClearable
                    placeholder="Выберите курс"
                    onChange={(option: any) => {
                      const updated = [...form.values.course_data];
                      updated[index].course_id = option?.value ?? null;
                      form.setFieldValue("course_data", updated);
                    }}
                    withAsterisk
                    label="Курс"
                    search={search}
                    handleSearchChange={handleSearchChange}
                  />
                </Grid.Col>
                <Grid.Col span={2}>
                  <TextInput
                    type="number"
                    label="Номер блока"
                    value={block.block_number}
                    onChange={(e) => {
                      const value = Number(e.currentTarget.value) || 0;
                      form.setFieldValue(
                        `course_data.${index}.block_number`,
                        value
                      );
                    }}
                    withAsterisk
                  />
                </Grid.Col>
                <Grid.Col span={2}>
                  <TextInput
                    type="number"
                    label="Проходной балл"
                    value={block.pass_count}
                    onChange={(e) => {
                      const value = Number(e.currentTarget.value) || 0;
                      form.setFieldValue(
                        `course_data.${index}.pass_count`,
                        value
                      );
                    }}
                    withAsterisk
                  />
                </Grid.Col>
                <Grid.Col span={3}>
                  <TextInput
                    type="number"
                    label="Максимум попыток"
                    value={block.max_attempts}
                    onChange={(e) => {
                      const value = Number(e.currentTarget.value) || 0;
                      form.setFieldValue(
                        `course_data.${index}.max_attempts`,
                        value
                      );
                    }}
                    withAsterisk
                  />
                </Grid.Col>
                <Grid.Col span={2} style={{ display: "flex", height: "100%" }}>
                  <Flex align="center">
                    {index === form.values.course_data?.length - 1 && (
                      <Button variant="subtle" onClick={handleAddBlock}>
                        +
                      </Button>
                    )}
                    {form.values.course_data.length > 1 && (
                      <Button
                        variant="subtle"
                        color="red"
                        onClick={() => handleRemoveBlock(index)}
                      >
                        -
                      </Button>
                    )}
                  </Flex>
                </Grid.Col>
              </Grid>
            </Box>
          ))}
          {form.errors.course_data && (
            <Text c="#fa5252" fz={12} mt={5}>
              {form.errors.course_data}
            </Text>
          )}
        </Flex>
        <Flex justify="flex-end" mb={100}>
          <Button mt="xl" type="submit">
            Сохранить
          </Button>
        </Flex>
      </form>
      <LoadingBlock isLoading={isLoading} />
    </CustomModal>
  );
};
