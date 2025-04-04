import { deleteLesson, getLessons } from "@/core/api";
import { Button } from "@mantine/core";
import {
  MRT_ColumnDef,
  MRT_PaginationState,
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";
import { MRT_Localization_RU } from "mantine-react-table/locales/ru";

import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { AddLessonModal } from "./AddLessonModal";
import { IconTrashFilled } from "@tabler/icons-react";

export const Block = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [lessons, setLessons] = useState([]);
  const [lessonModal, setLessonModal] = useState(false);
  const [testModal, setTestModal] = useState(false);
  const [changes, setChanges] = useState(false);
  const data: any[] = useMemo(() => lessons || [], [lessons]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 15,
  });
  const [totalRowCount, setTotalRowCount] = useState(0);

  console.log(testModal);
  

  const getData = async () => {
    setIsLoading(true);
    const params = {
      page: pagination.pageIndex + 1,
      perPage: pagination.pageSize,
    };
    try {
      const response = await getLessons(id as string, params);
      setLessons(response?.data);
      setTotalRowCount(response?.total);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };
  const deleteData = async (id: string) => {
    setIsLoading(true);
    try {
      await deleteLesson(id);
      setChanges((prev) => !prev);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [changes]);

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        header: "ID",
        accessorKey: "id",
      },
      {
        header: "Название урока",
        accessorKey: "title",
        Cell: ({ cell }) => {
          return (
            <Button
              p={0}
              variant="subtle"
              onClick={() => navigate(`/app/lessons/${cell.row.original?.id}`)}
            >
              {cell.row.original.title}
            </Button>
          );
        },
      },
      {
        enableClickToCopy: true,
        header: "Ссылка на видео",
        accessorKey: "number",
      },
      {
        header: "Действия",
        Cell: ({ row }) => (
          <IconTrashFilled
            style={{ color: "red" }}
            onClick={() => deleteData(row.original?.id)}
          />
        ),
      },
    ],
    [t]
  );

  const table = useMantineReactTable({
    columns,
    data,
    enablePinning: true,
    manualPagination: true,
    rowCount: totalRowCount,
    mantineLoadingOverlayProps: {
      loaderProps: {
        variant: "dots",
      },
    },
    localization: MRT_Localization_RU,
    state: {
      pagination: pagination,
      isLoading,
    },
    positionToolbarAlertBanner: "bottom",
    onPaginationChange: setPagination,
    renderTopToolbarCustomActions: () => {
      return (
        <div style={{ display: "flex", gap: "8px" }}>
          <Button onClick={() => setLessonModal(true)} variant="filled">
            {t("lessons.lessonCreate")}
          </Button>
          <Button disabled onClick={() => setTestModal(true)} variant="filled">Создать тест</Button>
        </div>
      );
    },
  });
  return (
    <>
      <MantineReactTable table={table} />
      <AddLessonModal
        open={lessonModal}
        onClose={() => setLessonModal(false)}
        setChanges={setChanges}
      />
      {/* <AddTestModal
        open={testModal}
        onClose={() => setTestModal(false)}
        setChanges={setChanges}
      /> */}
    </>
  );
};
