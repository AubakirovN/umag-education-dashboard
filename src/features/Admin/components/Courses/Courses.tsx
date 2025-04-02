import { deleteCourse, getCourses } from "@/core/api";
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
import { AddCourseModal } from "./AddCourseModal";
import { formatDMYHM } from "@/core/format";
import { useNavigate } from "react-router-dom";
import { IconTrashFilled } from "@tabler/icons-react";

export const Courses = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [modal, setModal] = useState(false);
  const [changes, setChanges] = useState(false);
  const data: any[] = useMemo(() => courses || [], [courses]);
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
      const response = await getCourses(params);
      setCourses(response?.data);
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
      await deleteCourse(id);
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
        header: t("courses.table.title"),
        accessorKey: "title",
        Cell: ({ cell }) => {
          return (
            <Button
              p={0}
              variant="subtle"
              onClick={() => navigate(`${cell.row.original?.id}`)}
            >
              {cell.row.original.title}
            </Button>
          );
        },
      },
      {
        header: t("courses.table.deadline"),
        accessorFn: (row) => (row?.deadline ? formatDMYHM(row.deadline) : "-"),
      },
      {
        header: "Действия",
        Cell: ({ row }) => <IconTrashFilled style={{color: 'red'}} onClick={() => deleteData(row.original?.id)} />,
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
            {t("courses.courseCreate")}
          </Button>
        </div>
      );
    },
  });
  return (
    <>
      <MantineReactTable table={table} />
      <AddCourseModal
        open={modal}
        onClose={() => setModal(false)}
        setChanges={setChanges}
      />
    </>
  );
};
