import { getRoles } from "@/core/api";
// import { deleteCourse, getCourses, getRoles } from "@/core/api";
import { Button } from "@mantine/core";
// import { Button, Flex } from "@mantine/core";
import {
  MRT_ColumnDef,
  MRT_PaginationState,
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";
import { MRT_Localization_RU } from "mantine-react-table/locales/ru";

import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
// import { AddCourseModal } from "../AddCourseModal";
// import { formatDMYHM } from "@/core/format";
// import { IconEdit, IconTrashFilled } from "@tabler/icons-react";
// import { EditCourseModal } from "../EditCourseModal";
import { AddRoleModal } from "../AddRoleModal";

export const Roles = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  // const [selectedCourse, setSelectedCourse] = useState(null);
  const [modal, setModal] = useState(false);
  // const [editModal, setEditModal] = useState(false);
  const [changes, setChanges] = useState(false);
  const data: any[] = useMemo(() => roles || [], [roles]);
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
      const response = await getRoles(params);
      setRoles(response?.data);
      setTotalRowCount(response?.total);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  // const deleteData = async (id: string) => {
  //   setIsLoading(true);
  //   try {
  //     await deleteCourse(id);
  //     setChanges((prev) => !prev);
  //   } catch (e) {
  //     console.error(e);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

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
        header: "Название",
        accessorKey: "name",
      },
      {
        header: "Статус",
        accessorKey: "active"
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
            Создать роль
          </Button>
        </div>
      );
    },
  });
  return (
    <>
      <MantineReactTable table={table} />
      <AddRoleModal
        open={modal}
        onClose={() => setModal(false)}
        setChanges={setChanges}
      />
    </>
  );
};
