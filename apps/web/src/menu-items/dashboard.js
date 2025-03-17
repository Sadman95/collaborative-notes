// assets
import { TbDashboard, TbUsersGroup, TbBrandCampaignmonitor, TbMessageChatbot, TbNote } from 'react-icons/tb';

// constant
const icons = { TbDashboard, TbUsersGroup, TbBrandCampaignmonitor, TbMessageChatbot, TbNote };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'root',
    title: 'Dashboard',
    type: 'group',
    children: [
        {
            id: '',
            title: 'Notes',
            type: 'item',
            url: '/',
            icon: icons.TbNote,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
