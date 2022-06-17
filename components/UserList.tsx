import React, { FC } from "react";

import s from "../styles/UserList.module.scss";
import { User } from "../types/user";
import UserListItem from "./UserListItem";

interface IUserListProps {
  list: User[];
}

const UserList: FC<IUserListProps> = ({ list }) => {
  if (list.length === 0) return null;

  return (
    <ul className={s.list}>
      {list.map(({ id, login, avatar_url, url }) => {
        return (
          <UserListItem
            key={id}
            id={id}
            login={login}
            avatar_url={avatar_url}
            url={url}
            list={list}
          />
        );
      })}
    </ul>
  );
};

export default UserList;
