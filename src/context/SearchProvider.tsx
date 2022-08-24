import React, { createContext, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { FetchList } from "../utils/fetchUsersList";
import {
  FilterOptions,
  PagesOptions,
  SearchesOptions,
  SearchOptions,
  SortOptions,
  UsersLists,
  UsersListType,
} from "../types";
import {
  initialFilterOptions,
  initialLimit,
  initialPages,
  initialSearches,
  initialSortOptions,
  initialType,
  initialUsersLists,
} from "./searchProviderData";

interface Props {
  children: React.ReactNode;
}

export const SearchContext = createContext<SearchOptions>({
  sortOptions: initialSortOptions,
  setSortOptions: () => {},
  filterOptions: initialFilterOptions,
  setFilterOptions: () => {},
  limit: initialLimit,
  setLimit: () => {},
  search: initialSearches,
  setSearch: () => {},
  type: initialType,
  setType: () => {},
  currentPages: initialPages,
  setCurrentPages: () => {},
  usersLists: initialUsersLists,
  setUsersLists: () => {},
  refreshList: () => {},
});

export const SearchProvider = ({ children }: Props) => {
  const [sortOptions, setSortOptions] =
    useState<SortOptions>(initialSortOptions);
  const [filterOptions, setFilterOptions] =
    useState<FilterOptions>(initialFilterOptions);
  const [limit, setLimit] = useState<string>(initialLimit);
  const [search, setSearch] = useState<SearchesOptions>(initialSearches);
  const [type, setType] = useState<UsersListType>(initialType);
  const [currentPages, setCurrentPages] = useState<PagesOptions>(initialPages);
  const [usersLists, setUsersLists] = useState<UsersLists>(initialUsersLists);
  const [refresh, setRefresh] = useState<number>(0);
  const { auth } = useAuth();

  const getList = async () => {
    if (!auth.role) return;
    const data = await FetchList(type, {
      ...sortOptions[type],
      ...filterOptions[type],
      limit,
      page: currentPages[type],
      search: search[type],
    });
    console.log(data.count);

    setUsersLists((prevState) => {
      return { ...prevState, [type]: data };
    });
  };

  const refreshList = () => {
    setRefresh((prevState) => prevState + 1);
  };

  useEffect(() => {
    getList();
  }, [type, currentPages, filterOptions, sortOptions, limit, search]);

  useEffect(() => {
    getList();
  }, [auth]);

  useEffect(() => {
    if (refresh > 0) getList();
  }, [refresh]);

  return (
    <SearchContext.Provider
      value={{
        sortOptions,
        setSortOptions,
        filterOptions,
        setFilterOptions,
        limit,
        setLimit,
        search,
        setSearch,
        type,
        setType,
        currentPages,
        setCurrentPages,
        usersLists,
        setUsersLists,
        refreshList,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
