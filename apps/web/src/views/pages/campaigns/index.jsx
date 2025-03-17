import { Box, Button, ButtonGroup, Tooltip, Typography, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import agent2 from 'api/agent2';
import CampaignDetails from 'components/notes';
import CreateNoteModal from 'components/notes/CreateNoteModal';
import DeleteBulkCampaignsModal from 'components/notes/DeleteBulkCampaignsModal';
import DeleteCampaignmodal from 'components/notes/DeleteNotemodal';
import { useEffect, useState } from 'react';
import { HiMiniViewfinderCircle } from 'react-icons/hi2';
import { MdDelete, MdDeleteOutline } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { selectCurrentMode } from 'redux/selector';
import Drawer from 'ui-component/extended/Drawer';
import { GradientCircularProgress } from 'ui-component/progess/GradientCircularProgress';
import { convertCamelToTitleCase } from 'utils/convert-camel-to-title';
import { objectMapper } from 'utils/object-mapper';

const Campaigns = () => {
    const modalInitialState = {
        deleteCampaignModal: false,
        deleteBulkCampaignsModal: false,
        createCampaignModal: false
    };
    const [modals, setModals] = useState(modalInitialState);
    const [columns, setColumns] = useState([]);
    const [selectedCampaigns, setSelectedCampaigns] = useState([]);

    const theme = useTheme();
    const { mode } = useSelector(selectCurrentMode);

    const handleModalOpen = (key, value) =>
        setModals({
            ...modals,
            [key]: value
        });

    const {
        data: campaigns_data,
        isLoading,
        isError,
        refetch,
        error
    } = useQuery({
        queryKey: ['campaigns'],
        queryFn: () => agent2.Campaigns.GetAll({ searchQuery: '' }),
        enabled: false
    });

    useEffect(() => {
        refetch();
    }, [campaigns_data]);

    useEffect(() => {
        if (campaigns_data) {
            const dataColumns = campaigns_data?.data?.data.reduce((prev, curr) => {
                const value = Object.keys(
                    objectMapper({ ...curr, action: '' }, ['campaignName', 'message', 'startDate', 'endDate', 'status', 'action'])
                ).map((k, i) => ({
                    field: k,
                    headerName: (
                        <Typography key={i} variant="h4" sx={{ margin: 0, fontWeight: 'bold' }}>
                            {convertCamelToTitleCase(k)}
                        </Typography>
                    ),
                    width: 200,
                    renderCell: (params) => {
                        if (params.field == 'action') {
                            return (
                                <ButtonGroup
                                    variant="contained"
                                    sx={{
                                        mt: 0.8,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 0.5
                                    }}
                                >
                                    <DeleteCampaignmodal
                                        open={modals.deleteCampaignModal}
                                        setOpen={(value) => handleModalOpen('deleteCampaignModal', value)}
                                        refetch={refetch}
                                        campaignId={params.row._id}
                                    />

                                    <DeleteBulkCampaignsModal
                                        open={modals.deleteBulkCampaignsModal}
                                        setOpen={(value) => handleModalOpen('deleteBulkCampaignsModal', value)}
                                        refetch={refetch}
                                        campaignIds={selectedCampaigns}
                                    />

                                    <Tooltip title={<Typography variant="subtitle2">Delete</Typography>}>
                                        <Button
                                            color="error"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                return handleModalOpen('deleteCampaignModal', true);
                                            }}
                                        >
                                            <MdDeleteOutline size={24} />
                                        </Button>
                                    </Tooltip>
                                    {/* <Tooltip title={params.row.status == 'inactive' ? 'Start' : 'Stop'}>
                                        <Button color={params.row.status == 'inactive' ? 'primary' : 'warning'}>
                                            {params.row.status == 'inactive' ? <MdStart size={24} /> : <FaStop size={24} />}
                                        </Button>
                                    </Tooltip> */}
                                    <Drawer
                                        anchor="right"
                                        trigger={({ onClick }) => (
                                            <Tooltip title={<Typography variant="subtitle2">View</Typography>}>
                                                <Button
                                                    color="info"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        return onClick();
                                                    }}
                                                >
                                                    <HiMiniViewfinderCircle size={24} />
                                                </Button>
                                            </Tooltip>
                                        )}
                                    >
                                        <CampaignDetails
                                            campaignData={objectMapper(params.row, ['campaignName', 'createdAt', 'groupInfo'])}
                                        />
                                    </Drawer>
                                </ButtonGroup>
                            );
                        }
                    }
                }));

                return value;
            }, []);

            setColumns(dataColumns);
        }
    }, [campaigns_data]);

    const css = `
    .text-secondary {
    color: ${mode == 'light' ? theme.palette.common.black : theme.palette.secondary.light};
    }

    .text-center {
    text-align: 'center';
    }

    .w-100{
    width: '100%;
    }
    `;

    return (
        <>
            <style>{css}</style>
            <div>
                <CreateCampaignModal
                    open={modals.createCampaignModal}
                    setOpen={(value) => handleModalOpen('createCampaignModal', value)}
                    refetch={refetch}
                />
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <h2>Campaigns</h2>
                    <Button variant="contained" color="primary" onClick={() => handleModalOpen('createCampaignModal', true)}>
                        Create campaign
                    </Button>
                </div>
                {isLoading ? (
                    <div>
                        <GradientCircularProgress size={32} />
                    </div>
                ) : isError ? (
                    <Box
                        sx={{
                            display: 'flex',
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 32
                        }}
                    >
                        {error.response.data.message}
                    </Box>
                ) : campaigns_data && campaigns_data?.data?.data.length > 0 ? (
                    <Box mt={6}>
                        {selectedCampaigns.length > 0 && (
                            <Button
                                onClick={() => handleModalOpen('deleteBulkCampaignsModal', true)}
                                variant="contained"
                                color="error"
                                startIcon={<MdDelete />}
                            >
                                Delete ({selectedCampaigns.length})
                            </Button>
                        )}
                        <Box
                            sx={{
                                height: '75%',
                                margin: '0 auto',
                                mt: 1
                            }}
                        >
                            <DataGrid
                                checkboxSelection
                                onRowSelectionModelChange={(newRowSelection) => setSelectedCampaigns(newRowSelection)}
                                sx={{
                                    backgroundColor: mode === 'dark' ? theme.palette.background.paper : theme.palette.background.default
                                }}
                                autoHeight
                                autoPageSize
                                loading={isLoading}
                                getRowClassName={() => 'text-secondary'}
                                getCellClassName={() => 'text-center w-100'}
                                rows={campaigns_data?.data?.data}
                                getRowId={(row) => row._id}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 5 }
                                    }
                                }}
                                pageSizeOptions={[5, 10]}
                            />
                        </Box>
                    </Box>
                ) : (
                    <Typography variant="h5" color="lightgrey">
                        No campaign found!
                    </Typography>
                )}
            </div>
        </>
    );
};

export default Campaigns;
