import { Box, LinearProgress } from '@mui/material';
import './style.css';

import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

import NoRowsOverlay from "../noRowsOverlay/NoRowsOverlay";
import { useTranslation } from 'react-i18next';

const DataTable = ({ height, isLoading, columns, data }) => {

    const {t, i18n} = useTranslation();

    return (
        <Box id="data-grid" display="flex" sx={{
            width: 1, minHeight: {height}, justifyContent: "center", padding: "10px",
            "& .super-app-theme--header": {
                backgroundColor: "background.default",
                color: "text.main",
            },
            "& .MuiDataGrid-sortIcon": {
                opacity: 1,
                color: "text.main",
            },
            "& .MuiDataGrid-menuIconButton": {
                opacity: 1,
                color: "text.main"
            },
        }}
        >
            <DataGrid
                rows={data !== null && data !== undefined ? data : []}
                columns={columns}
                slots={{
                    loadingOverlay: LinearProgress,
                    noRowsOverlay: NoRowsOverlay,
                    noResultsOverlay: NoRowsOverlay,
                }}
                loading={isLoading}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 8,
                        },
                    },
                }}
                disableRowSelectionOnClick
                localeText={{
                    noRowsLabel: t("noRowsLabel"),
                    noResultsOverlayLabel: t("noRowsLabel"),
                    columnMenuLabel: t("columnMenuLabel"),
                    columnMenuShowColumns: t("columnMenuShowColumns"),
                    columnMenuManageColumns: t("columnMenuManageColumns"),
                    columnMenuFilter: t("columnMenuFilter"),
                    columnMenuHideColumn: t("columnMenuHideColumn"),
                    columnMenuUnsort: t("columnMenuUnsort"),
                    columnMenuSortAsc: t("columnMenuSortAsc"),
                    columnMenuSortDesc: t("columnMenuSortDesc"),
                    toolbarColumns: t("toolbarColumns"),
                    toolbarColumnsLabel: t("toolbarColumnsLabel"),
                    columnsPanelTextFieldLabel: t("columnsPanelTextFieldLabel"),
                    columnsPanelTextFieldPlaceholder: t("columnsPanelTextFieldPlaceholder"),
                    columnsPanelDragIconLabel: t("columnsPanelDragIconLabel"),
                    columnsPanelShowAllButton: t("columnsPanelShowAllButton"),
                    columnsPanelHideAllButton: t("columnsPanelHideAllButton"),
                    filterPanelAddFilter: t("filterPanelAddFilter"),
                    filterPanelRemoveAll: t("filterPanelRemoveAll"),
                    filterPanelDeleteIconLabel: t("filterPanelDeleteIconLabel"),
                    filterPanelLogicOperator: t("filterPanelLogicOperator"),
                    filterPanelOperator: t("filterPanelOperator"),
                    filterPanelOperatorAnd: t("filterPanelOperatorAnd"),
                    filterPanelOperatorOr: t("filterPanelOperatorOr"),
                    filterPanelColumns: t("filterPanelColumns"),
                    filterPanelInputLabel: t("filterPanelInputLabel"),
                    filterPanelInputPlaceholder: t("filterPanelInputPlaceholder"),
                    toolbarExport: t("toolbarExport"),
                    toolbarExportLabel: t("toolbarExportLabel"),
                    toolbarExportCSV: t("toolbarExportCSV"),
                    toolbarExportPrint: t("toolbarExportPrint"),
                    toolbarExportExcel: t("toolbarExportExcel"),
                    filterOperatorContains: t("filterOperatorContains"),
                    filterOperatorEquals: t("filterOperatorEquals"),
                    filterOperatorStartsWith: t("filterOperatorStartsWith"),
                    filterOperatorEndsWith: t("filterOperatorEndsWith"),
                    filterOperatorIs: t("filterOperatorIs"),
                    filterOperatorNot: t("filterOperatorNot"),
                    filterOperatorAfter: t("filterOperatorAfter"),
                    filterOperatorOnOrAfter: t("filterOperatorOnOrAfter"),
                    filterOperatorBefore: t("filterOperatorBefore"),
                    filterOperatorOnOrBefore: t("filterOperatorOnOrBefore"),
                    filterOperatorIsEmpty: t("filterOperatorIsEmpty"),
                    filterOperatorIsNotEmpty: t("filterOperatorIsNotEmpty"),
                    filterOperatorIsAnyOf: t("filterOperatorIsAnyOf"),
                    headerFilterOperatorContains: t("headerFilterOperatorContains"),
                    headerFilterOperatorEquals: t("headerFilterOperatorEquals"),
                    headerFilterOperatorStartsWith: t("headerFilterOperatorStartsWith"),
                    headerFilterOperatorEndsWith: t("headerFilterOperatorEndsWith"),
                    headerFilterOperatorIs: t("headerFilterOperatorIs"),
                    headerFilterOperatorNot: t("headerFilterOperatorNot"),
                    headerFilterOperatorAfter: t("headerFilterOperatorAfter"),
                    headerFilterOperatorOnOrAfter: t("headerFilterOperatorOnOrAfter"),
                    headerFilterOperatorBefore: t("headerFilterOperatorBefore"),
                    headerFilterOperatorOnOrBefore: t("headerFilterOperatorOnOrBefore"),
                    headerFilterOperatorIsEmpty: t("headerFilterOperatorIsEmpty"),
                    headerFilterOperatorIsNotEmpty: t("headerFilterOperatorIsNotEmpty"),
                    headerFilterOperatorIsAnyOf: t("headerFilterOperatorIsAnyOf"),
                    'headerFilterOperator=': t("'headerFilterOperator='"),
                    'headerFilterOperator!=': t("'headerFilterOperator!='"),
                    'headerFilterOperator>': t("'headerFilterOperator>'"),
                    'headerFilterOperator>=': t("'headerFilterOperator>='"),
                    'headerFilterOperator<': t("'headerFilterOperator<'"),
                    'headerFilterOperator<=': t("'headerFilterOperator<='")
                }}
            />
        </Box>
    )
}

export default DataTable