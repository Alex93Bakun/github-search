import axios from "axios";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";

import s from "../styles/UserList.module.scss";
import { User } from "../types/user";

interface IUserListItemProps {
  id: number;
  login: string;
  avatar_url: string;
  url: string;
  list: User[];
}

const UserListItem: FC<IUserListItemProps> = ({
  id,
  login,
  avatar_url,
  url,
  list,
}) => {
  const [reposCount, setReposCount] = useState(0);

  useEffect(() => {
    getReposCount(url);
  }, []);

  const getReposCount = async (url: string) => {
    try {
      const { data } = await axios.get(url, {
        headers: {
          authorization: "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",
        },
      });

      const { public_repos } = data;

      setReposCount(public_repos);
    } catch (e) {
      console.log(e);
    }
  };

  const onClickHandler = () => {
    localStorage.setItem("userList", JSON.stringify(list));
  };

  return (
    <Link href={`/user/${id}`}>
      <li className={s.list_item} onClick={onClickHandler}>
        <div className={s.avatar_container}>
          <img className={s.avatar} src={avatar_url} alt="avatar" />
        </div>
        <div className={s.login_wrapper}>
          <span className={s.login}>{login}</span>
        </div>
        <div className={s.repo_wrapper}>
          <span>Repo: {reposCount}</span>
        </div>
      </li>
    </Link>
  );
};

export default UserListItem;
