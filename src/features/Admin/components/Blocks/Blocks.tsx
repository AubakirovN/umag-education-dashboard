// import { getCourseBlocks, getCourses } from "@/core/api";
// import { Button } from "@mantine/core";
// import {
//   MRT_ColumnDef,
//   // MRT_PaginationState,
//   MantineReactTable,
//   useMantineReactTable,
// } from "mantine-react-table";
// import { MRT_Localization_RU } from "mantine-react-table/locales/ru";

// import { useEffect, useMemo, useState } from "react";
// import { useTranslation } from "react-i18next";
// import { AddBlockModal } from "./AddBlockModal";
// import { formatDMYHM } from "@/core/format";

// export const Blocks = () => {
//   const { t } = useTranslation();
//   const [isLoading, setIsLoading] = useState(false);
//   const [courseBlocks, setCourseBlocks] = useState([]);
//   const [modal, setModal] = useState(false);
//   const [changes, setChanges] = useState(false);
//   const data: any[] = useMemo(() => courseBlocks || [], [courseBlocks]);

//   console.log(setIsLoading);

//   const getData = async () => {
//     const response = await getCourseBlocks();
//     setCourseBlocks(response.data);
//     console.log(response);
//   };

//   useEffect(() => {
//     getData();
//   }, [changes]);

//   const columns = useMemo<MRT_ColumnDef<any>[]>(
//     () => [
//       {
//         header: "ID",
//         accessorKey: "id",
//       },
//       {
//         enableClickToCopy: true,
//         header: t("courses.table.title"),
//         accessorKey: "title",
//       },
//       {
//         header: t("courses.table.deadline"),
//         accessorFn: (row) => (row?.deadline ? formatDMYHM(row.deadline) : "-"),
//       },
//     ],
//     [t]
//   );

//   const table = useMantineReactTable({
//     columns,
//     data,
//     enablePinning: true,
//     manualPagination: true,
//     // rowCount: totalRowCount,
//     mantineLoadingOverlayProps: {
//       loaderProps: {
//         variant: "dots",
//       },
//     },
//     localization: MRT_Localization_RU,
//     state: {
//       // pagination: pagination,
//       isLoading,
//     },
//     positionToolbarAlertBanner: "bottom",
//     // onPaginationChange: setPagination,
//     renderTopToolbarCustomActions: () => {
//       const openModal = () => {
//         setModal(true);
//       };
//       return (
//         <div style={{ display: "flex", gap: "8px" }}>
//           <Button onClick={() => openModal()} variant="filled">
//             {t("blocks.blockCreate")}
//           </Button>
//         </div>
//       );
//     },
//   });
//   return (
//     <>
//       <MantineReactTable table={table} />
//       <AddBlockModal
//         open={modal}
//         onClose={() => setModal(false)}
//         setChanges={setChanges}
//       />
//     </>
//   );
// };
