import { axiosInstance } from './axios';

export const fetchSectionTimetable = async () => {
  const response = await axiosInstance.get('/timetables/timetables');
  return response.data;
};

export const fetchFacultyTimetable = async () => {
  const response = await axiosInstance.get('/visualization/faculty-timetable');
  return response.data;
};

export const fetchRoomTimetable = async () => {
  const response = await axiosInstance.get('/visualization/room-timetable');
  return response.data;
};
