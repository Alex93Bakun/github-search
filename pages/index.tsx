import axios from "axios";
import type { NextPage } from "next";
import React, { useEffect, useState } from "react";

import SearchBar from "../components/SearchBar";
import UserList from "../components/UserList";
import { BASE_URL } from "../Constants/Constants";
import { useDebounce } from "../hooks/useDebounce";
import s from "../styles/Home.module.scss";
import { User } from "../types/user";

const Home: NextPage = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [userList, setUserList] = useState<User[]>([]);
  const debounceValue = useDebounce(searchValue);

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
      return;
    }

    if (localStorage.hasOwnProperty("userList")) {
      const userListJson = localStorage.getItem("userList") || "";

      if (userListJson !== null) {
        setUserList(JSON.parse(userListJson) || []);
        localStorage.removeItem("userList");
      } else {
        getUsers();
      }
    } else {
      getUsers();
    }
  }, [debounceValue, isMounted]);

  const getUsers = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/users?q=${debounceValue}`, {
        headers: {
          authorization: "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",
        },
      });
      setUserList(data.items);
    } catch (e: any) {
      console.log(e.message);
    }
  };

  return (
    <>
      <SearchBar
        value={searchValue}
        setValue={setSearchValue}
        placeholder="Search for Users"
      />

      <main className={s.main}>
        <UserList list={userList} />
      </main>
    </>
  );
};

export default Home;
