import { USER_STORAGE, LOGGEDIN_USER } from "./constants";

export const loadLocalStorage = (storageKey = USER_STORAGE) => {
  const loadedUserListData = localStorage.getItem(storageKey);
  const parsedUserListData = JSON.parse(loadedUserListData);
  return parsedUserListData;
};

export const saveLocalStorage = (storageKey = USER_STORAGE, data) => {
  const formattedSaveData = JSON.stringify(data);
  const savedUserListData = localStorage.setItem(storageKey, formattedSaveData);
  return savedUserListData;
};

export const loggedOutStorage = (storageKey = LOGGEDIN_USER) => {
  localStorage.removeItem(storageKey);
};

export const userAuthority = (storageKey = LOGGEDIN_USER) => {
  const nowLoggedInuserData = loadLocalStorage(storageKey);
  if (!nowLoggedInuserData) return null;
  return nowLoggedInuserData.authority;
};

export const autoIncrementUserId = (storageKey = USER_STORAGE) => {
  const loadedUserListData = loadLocalStorage(storageKey);
  const lastUserListData = loadedUserListData[loadedUserListData.length - 1];
  return lastUserListData.id + 1;
};
