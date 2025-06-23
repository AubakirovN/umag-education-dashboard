import {
  deleteSublesson,
  getSublessons,
} from "@/core/api";
import { Button, Flex } from "@mantine/core";
import {
  MRT_ColumnDef,
  MRT_PaginationState,
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";
import { MRT_Localization_RU } from "mantine-react-table/locales/ru";

import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { IconEdit, IconTrashFilled } from "@tabler/icons-react";
import { AddSublessonModal } from "../AddSublessonModal";
import { EditSublessonModal } from "../EditSublessonModal";

export const Sublessons = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [sublessons, setSublessons] = useState([]);
  const [selectedSublesson, setSelectedSublesson] = useState(null);
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [changes, setChanges] = useState(false);
  const data: any[] = useMemo(() => sublessons || [], [sublessons]);
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
      const response = await getSublessons(params);
      setSublessons(response?.data);
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
      await deleteSublesson(id);
      setChanges((prev) => !prev);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [changes, pagination]);

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        header: "ID",
        accessorKey: "id",
      },
      {
        header: "Название темы",
        accessorKey: "title",
      },
      {
        header: "Урок",
        accessorKey: "lesson.title",
      },
      {
        header: "Ссылка на видео",
        Cell: ({ row }) => (
          <>
            {row.original?.video_url ? (
              <Link to={row.original?.video_url} target="_blank">
                {row.original?.video_url}
              </Link>
            ) : (
              "-"
            )}
          </>
        ),
      },
      {
        header: "Действия",
        Cell: ({ row }) => (
          <Flex gap={10}>
            <IconEdit
              onClick={() => {
                setSelectedSublesson(row.original);
                setEditModal(true);
              }}
            />
            <IconTrashFilled
              style={{ color: "red" }}
              onClick={() => deleteItem(row.original?.id)}
            />
          </Flex>
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
            Создать тему
          </Button>
        </div>
      );
    },
  });
  return (
    <>
      <MantineReactTable table={table} />
      <AddSublessonModal
        open={modal}
        onClose={() => setModal(false)}
        setChanges={setChanges}
      />
      <EditSublessonModal
        open={editModal}
        onClose={() => setEditModal(false)}
        setChanges={setChanges}
        sublesson={selectedSublesson}
      />
    </>
  );
};
