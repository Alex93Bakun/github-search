import axios from "axios";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import React, { useState } from "react";

import SearchBar from "../../components/SearchBar";
import s from "../../styles/UserPage.module.scss";
import { Repo } from "../../types/repo";
import { User } from "../../types/user";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data } = await axios.get(
    `https://api.github.com/user/${context?.params?.id}`,
    {
      headers: {
        authorization: "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",
      },
    }
  );
  const userData: User = data;

  const followers: number = await axios
    .get(`https://api.github.com/users/${userData.login}/followers`, {
      headers: {
        authorization: "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",
      },
    })
    .then((r) => r.data.length);

  const following: number = await axios
    .get(`https://api.github.com/users/${userData.login}/following`, {
      headers: {
        authorization: "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",
      },
    })
    .then((r) => r.data.length);

  const repos: Repo[] = await axios
    .get(`https://api.github.com/users/${userData.login}/repos`, {
      headers: {
        authorization: "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",
      },
    })
    .then((r) => r.data);

  return {
    props: {
      userData,
      followers,
      following,
      repos,
    },
  };
};

const UserPage: NextPage = ({
  userData,
  followers,
  following,
  repos,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if (!userData) return null;

  const [searchValue, setSearchValue] = useState<string>("");

  const date = new Date(userData.created_at);
  const convertedDate = date.toLocaleDateString();

  return (
    <div>
      <div className={s.detail_info}>
        <div className={s.avatar_wrapper}>
          <img src={userData.avatar_url} alt="Avatar" />
        </div>
        <ul>
          <li>
            <span>UserName:</span> {userData.login}
          </li>
          <li>Email: {userData.email}</li>
          <li>Location: {userData.location}</li>
          <li>Join Date: {convertedDate}</li>
          <li>{followers} Followers</li>
          <li>Following {following}</li>
        </ul>
      </div>

      <SearchBar
        value={searchValue}
        setValue={setSearchValue}
        placeholder="Search for User's repositories"
      />

      <ul className={s.repos_list}>
        {repos
          .filter((r: Repo) =>
            r.name.toLowerCase().includes(searchValue.trim().toLowerCase())
          )
          .map(
            ({ id, name, forks_count, stargazers_count, html_url }: Repo) => (
              <a
                key={id}
                href={html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <li className={s.list_item}>
                  <div className={s.list_item_name}>{name}</div>
                  <div className={s.list_item_info}>
                    <span>{forks_count} Forks</span>
                    <span>{stargazers_count} Stars</span>
                  </div>
                </li>
              </a>
            )
          )}
      </ul>
    </div>
  );
};

export default UserPage;
