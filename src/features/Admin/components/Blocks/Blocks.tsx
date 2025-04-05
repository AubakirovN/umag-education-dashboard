import { deleteCourseBlock, getCourseBlocks } from "@/core/api";
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
import { AddBlockModal } from "../AddBlockModal";
import { useNavigate } from "react-router-dom";
import { IconTrashFilled } from "@tabler/icons-react";

export const Blocks = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [courseBlocks, setCourseBlocks] = useState([]);
  const [modal, setModal] = useState(false);
  const [changes, setChanges] = useState(false);
  const data: any[] = useMemo(() => courseBlocks || [], [courseBlocks]);
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
      const response = await getCourseBlocks(params);
      setCourseBlocks(response?.data);
      setTotalRowCount(response?.total);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteBlock = async (id: string) => {
    setIsLoading(true);
    try {
      await deleteCourseBlock(id);
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
        header: t("blocks.table.title"),
        accessorKey: "title",
        Cell: ({ cell }) => {
          return (
            <Button
              p={0}
              variant="subtle"
              onClick={() => navigate(`/app/blocks/${cell.row.original?.id}`)}
            >
              {cell.row.original.title}
            </Button>
          );
        },
      },
      {
        header: t("blocks.table.course"),
        accessorKey: "pivot.course_id",
        Cell: ({ cell }) => {
          return (
            <Button
              p={0}
              variant="subtle"
              onClick={() => navigate(`/app/course/${cell.row.original?.pivot?.course_id}`)}
            >
              {cell.row.original?.pivot?.course_title || 'mockCourse'}
            </Button>
          );
        },
      },
      {
        header: t("blocks.table.number"),
        accessorKey: "number",
      },
      {
        header: t("blocks.table.maxAttempts"),
        accessorKey: "max_attempts",
      },
      {
        header: t("blocks.table.passCount"),
        accessorKey: "pass_count",
      },
      {
        header: "Действия",
        Cell: ({ row }) => (
          <IconTrashFilled
            style={{ color: "red" }}
            onClick={() => deleteBlock(row.original?.id)}
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
            {t("blocks.blockCreate")}
          </Button>
        </div>
      );
    },
  });
  return (
    <>
      <MantineReactTable table={table} />
      <AddBlockModal
        open={modal}
        onClose={() => setModal(false)}
        setChanges={setChanges}
      />
    </>
  );
};
