import { deleteCourseBlock, getCourseBlocks } from "@/core/api";
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
import { AddBlockModal } from "../AddBlockModal";
import { useNavigate } from "react-router-dom";
import { IconEdit, IconTrashFilled } from "@tabler/icons-react";
import { EditBlockModal } from "../EditBlockModal";

export const Blocks = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [courseBlocks, setCourseBlocks] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
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
        Cell: ({ cell }) => {
          return (
            <>
              {cell.row.original?.courses?.map((course: any, key: number) => (
                <div>
                  <Button
                    key={key}
                    p={0}
                    variant="subtle"
                    onClick={() => navigate(`/app/courses/${course?.id}`)}
                  >
                    {course?.title}
                  </Button>
                </div>
              ))}
            </>
          );
        },
      },
      {
        header: "Действия",
        Cell: ({ row }) => (
          <Flex gap={10}>
            <IconEdit
              onClick={() => {
                setSelectedBlock(row.original);
                setEditModal(true);
              }}
            />
            <IconTrashFilled
              style={{ color: "red" }}
              onClick={() => deleteBlock(row.original?.id)}
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
      <EditBlockModal
        open={editModal}
        onClose={() => setEditModal(false)}
        setChanges={setChanges}
        block={selectedBlock}
      />
    </>
  );
};
