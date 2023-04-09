import React from "react";
import { useEffect, useState } from "react";

const UserContainer = ({ users }) => {
  const [loading, setLoading] = useState(true);

  setTimeout(() => setLoading(false), 4000);

  return (
    <>
      <div className="flex items-start justify-center">
        <table className="">
          <thead className="text-xs font-light text-white uppercase bg-gray-700 ">
            <th scope="col" class="px-4 py-3">
              First Name
            </th>
            <th scope="col" class="px-4 py-3">
              Last Name
            </th>
            <th scope="col" class="px-4 py-3">
              Email
            </th>
            <th scope="col" class="px-4 py-3">
              Bith Date
            </th>
            <th scope="col" class="px-4 py-3">
              Points
            </th>
            <th scope="col" class="px-4 py-3">
              Badges
            </th>
            <th scope="col" class="px-4 py-3">
              Nr. finished quests
            </th>
            <th scope="col" class="px-4 py-3">
              Nr. proposed quests
            </th>
          </thead>
          {users.map((user) => (
            <tbody>
              <tr className="bg-white border-b ">
                <th
                  scope="row"
                  class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap"
                >
                  <p>{user.firstName}</p>
                </th>
                <td className="px-4 py-3">
                  <span>{user.lastName}</span>
                </td>
                <td className="px-4 py-3">
                  <h3>{user.email}</h3>
                </td>
                <td className="px-4 py-3">
                  <h3>{user.birthDate}</h3>
                </td>
                <td className="px-4 py-3">
                  <h3>{user.points}</h3>
                </td>
                <td className="px-4 py-3">
                  <h3>{user.badges.length}</h3>
                </td>
                <td className="px-4 py-3">
                  <h3>{user.quests.length}</h3>
                </td>
                <td className="px-4 py-3">
                  <h3>{user.proposedQuests.length}</h3>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </>
  );
};

export default UserContainer;
