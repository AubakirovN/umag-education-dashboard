import { deleteCourseBlock, getCourseBlocksById } from "@/core/api";
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
import { IconTrashFilled } from "@tabler/icons-react";
import { AddBlockModal } from "../AddBlockModal";

export const Course = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [blocks, setBlocks] = useState([]);
  const [modal, setModal] = useState(false);
  const [changes, setChanges] = useState(false);
  const data: any[] = useMemo(() => blocks || [], [blocks]);
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
      const response = await getCourseBlocksById(id as string, params);
      setBlocks(response?.data);
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
  }, [changes, pagination.pageIndex, pagination.pageSize]);

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
