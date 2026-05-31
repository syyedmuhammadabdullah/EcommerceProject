import {createSlice} from '@reduxjs/toolkit';
import { getNotifications,clearAllNotifications, getNotificationCount, markAllNotificationAsRead, markNotificationAsRead } from '../../../index';
const initialState = {
    loading: false,
    error: null,
    unreadCount: null,
    notifications: [],
};

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        addNotification: (state, action) => {
            state.notifications.unshift(action.payload);
            state.unreadCount = state.unreadCount !== null ? state.unreadCount + 1 : 1;

        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(getNotifications.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getNotifications.fulfilled, (state, action) => {
            state.loading = false;
            state.notifications = action.payload;
        })
        .addCase(getNotifications.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(getNotificationCount.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getNotificationCount.fulfilled, (state, action) => {
            state.loading = false;
            
            state.unreadCount = action.payload;
        })
        .addCase(getNotificationCount.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(markAllNotificationAsRead.pending, (state) => {
           
            state.error = null;
        })
        .addCase(markAllNotificationAsRead.fulfilled, (state, action) => {
            state.loading = false;
            state.notifications = state.notifications.map(notification => ({ ...notification, isRead: true }));
            state.unreadCount = null;
        })
        .addCase(markAllNotificationAsRead.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(markNotificationAsRead.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(markNotificationAsRead.fulfilled, (state, action) => {
            state.loading = false;
            state.notifications = state.notifications.map(notification => notification._id === action.payload._id ? { ...notification, isRead: true } : notification);
            state.unreadCount = state.unreadCount !== null ? state.unreadCount - 1 : 0;
        })
        .addCase(markNotificationAsRead.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(clearAllNotifications.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(clearAllNotifications.fulfilled, (state, action) => {
            state.loading = false;
            state.notifications = [];
            state.unreadCount = null;
        })
        .addCase(clearAllNotifications.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;    
        });
    }
});

export const {addNotification} = notificationSlice.actions;
export default notificationSlice.reducer;
  