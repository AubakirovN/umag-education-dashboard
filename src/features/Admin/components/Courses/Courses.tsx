import { getCourses } from "@/core/api";
import { Button } from "@mantine/core";
import {
  MRT_ColumnDef,
  // MRT_PaginationState,
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";
import { MRT_Localization_RU } from "mantine-react-table/locales/ru";

import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { AddCourseModal } from "./AddCourseModal";
import { formatDMYHM } from "@/core/format";
import { useNavigate } from "react-router-dom";

export const Courses = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [modal, setModal] = useState(false);
  const [changes, setChanges] = useState(false);
  const data: any[] = useMemo(() => courses || [], [courses]);

  console.log(setIsLoading);

  const getData = async () => {
    const response = await getCourses();
    setCourses(response.data);
    console.log(response);
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
    ],
    [t]
  );

  const table = useMantineReactTable({
    columns,
    data,
    enablePinning: true,
    manualPagination: true,
    // rowCount: totalRowCount,
    mantineLoadingOverlayProps: {
      loaderProps: {
        variant: "dots",
      },
    },
    localization: MRT_Localization_RU,
    state: {
      // pagination: pagination,
      isLoading,
    },
    positionToolbarAlertBanner: "bottom",
    // onPaginationChange: setPagination,
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
