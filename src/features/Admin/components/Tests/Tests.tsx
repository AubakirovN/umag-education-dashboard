import { deleteTest, getTests } from "@/core/api";
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
import { useNavigate } from "react-router-dom";
import { IconEdit, IconTrashFilled } from "@tabler/icons-react";
import { AddTestModal } from "../AddTestModal";
import { EditTestModal } from "../EditTestModal";

export const Tests = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [tests, setTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [changes, setChanges] = useState(false);
  const data: any[] = useMemo(() => tests || [], [tests]);
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
      const response = await getTests(params);
      setTests(response?.data);
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
      await deleteTest(id);
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
        header: "Вопрос",
        Cell: ({ cell }) => {
          return (
            <div>
              <Button
                p={0}
                variant="subtle"
                onClick={() => navigate(`/app/tests/${cell.row.original?.id}`)}
              >
                {cell.row.original.question}
              </Button>
            </div>
          );
        },
      },
      {
        header: "Блок",
        Cell: ({ cell }) => {
          return (
            <>
              {cell.row.original?.course_blocks?.map(
                (block: any, key: number) => (
                  <div key={key}>
                    <Button
                      key={key}
                      p={0}
                      variant="subtle"
                      onClick={() => navigate(`/app/blocks/${block?.id}`)}
                    >
                      {block?.title}
                    </Button>
                  </div>
                )
              )}
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
                setSelectedTest(row.original);
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
            {t("tests.testCreate")}
          </Button>
        </div>
      );
    },
  });
  return (
    <>
      <MantineReactTable table={table} />
      <AddTestModal
        open={modal}
        onClose={() => setModal(false)}
        setChanges={setChanges}
      />
      <EditTestModal
        open={editModal}
        onClose={() => setEditModal(false)}
        setChanges={setChanges}
        test={selectedTest}
      />
    </>
  );
};
