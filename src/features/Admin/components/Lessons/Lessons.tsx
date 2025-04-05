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
import { useNavigate } from "react-router-dom";
import { IconTrashFilled } from "@tabler/icons-react";
import { AddLessonModal } from "../AddLessonModal";

export const Lessons = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [lessons, setLessons] = useState([]);
  const [modal, setModal] = useState(false);
  const [changes, setChanges] = useState(false);
  const data: any[] = useMemo(() => lessons || [], [lessons]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 15,
  });
  const [totalRowCount, setTotalRowCount] = useState(0);

  const getData = async () => {
    setIsLoading(true);
    const params = {
      page: pagination.pageIndex + 1,
      perPage: pagination.pageSize,
    };
    try {
      const response = await getLessons(params);
      setLessons(response?.data);
      setTotalRowCount(response?.total);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteItem = async (id: string) => {
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
        header: "Блок",
        accessorKey: "pivot.course_block_id",
        Cell: ({ cell }) => {
          return (
            <Button
              p={0}
              variant="subtle"
              onClick={() =>
                navigate(
                  `/app/blocks/${cell.row.original?.pivot?.course_block_id}`
                )
              }
            >
              {cell.row.original?.pivot?.course_block_name || 'mockBlock'}
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
            onClick={() => deleteItem(row.original?.id)}
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
      const openModal = () => {
        setModal(true);
      };
      return (
        <div style={{ display: "flex", gap: "8px" }}>
          <Button onClick={() => openModal()} variant="filled">
            {t("lessons.lessonCreate")}
          </Button>
        </div>
      );
    },
  });
  return (
    <>
      <MantineReactTable table={table} />
      <AddLessonModal
        open={modal}
        onClose={() => setModal(false)}
        setChanges={setChanges}
      />
    </>
  );
};
