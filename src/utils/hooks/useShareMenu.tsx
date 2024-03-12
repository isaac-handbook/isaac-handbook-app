import { useEffect } from 'react';

export const useShareMenu = () => {
  useEffect(() => {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline'],
    });
  }, []);
};
