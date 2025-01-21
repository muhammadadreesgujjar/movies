import React, { useEffect, useState } from "react";
import { getItem, setItem } from "../helpers/utils/localStorage";
import { useSelector, useDispatch } from "react-redux";
import useLocalStorageHandler from "../hooks/useLocalStorageHandler";
import { setUser } from "../reducers/usersAuthSlice";

const AdminTabel = () => {
  const userDispatch = useDispatch();
  const [permision, setPermision] = useState([]);
  const selectorUsersAuth = useSelector((state) => state.usersAuth);
  useLocalStorageHandler();

  useEffect(() => {
    setPermision([...selectorUsersAuth]);
  }, [selectorUsersAuth]);

  const handleView = (email) => {
    const findUser = selectorUsersAuth.map((item) => {
      if (item.email == email) {
        let obj = {
          ...item.permisions,
          view: !item.permisions.view,
        };
        return { ...item, permisions: { ...obj } };
      } else {
        return item;
      }
    });
    userDispatch(setUser(findUser));
    // setItem("users", findUser);
    setPermision(findUser);
  };

  const handleCreate = (email) => {
    const findUser = selectorUsersAuth.map((item) => {
      if (item.email == email) {
        let obj = {
          ...item.permisions,
          create: !item.permisions.create,
        };
        return { ...item, permisions: { ...obj } };
      } else {
        return item;
      }
    });
    userDispatch(setUser(findUser));
    setPermision(findUser);
  };

  const handleUpdate = (email) => {
    const findUser = selectorUsersAuth.map((item) => {
      if (item.email == email) {
        let obj = {
          ...item.permisions,
          update: !item.permisions.update,
        };
        return { ...item, permisions: { ...obj } };
      } else {
        return item;
      }
    });
    userDispatch(setUser(findUser));
    setPermision(findUser);
  };
  const handleDelete = (email) => {
    const findUser = selectorUsersAuth.map((item) => {
      if (item.email == email) {
        let obj = {
          ...item.permisions,
          delete: !item.permisions.delete,
        };
        return { ...item, permisions: { ...obj } };
      } else {
        return item;
      }
    });
    userDispatch(setUser(findUser));
    setPermision(findUser);
  };
  return (
    <div className="bg-[url('/src/assets/images/bg-img.jpg')] h-screen bg-bottom bg-no-repeat bg-cover">
      <div className="w-4/5 mx-auto pt-10">
        <h1 className="text-5xl font-semibold text-center text-white py-5">
          Admin Panel
        </h1>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2 border border-gray-300">Email</th>
              <th className="px-4 py-2 border border-gray-300">View</th>
              <th className="px-4 py-2 border border-gray-300">Create</th>
              <th className="px-4 py-2 border border-gray-300">Update</th>
              <th className="px-4 py-2 border border-gray-300">Delete</th>
            </tr>
          </thead>
          <tbody>
            {permision.map((item, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border border-gray-300 text-white">
                  {item.email}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  <input
                    id="disabled-first"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600"
                    checked={item.permisions.view}
                    onClick={() => handleView(item.email)}
                  />
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  <input
                    id="disabled-first"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600"
                    checked={item.permisions.create}
                    onClick={() => handleCreate(item.email)}
                  />
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  <input
                    id="disabled-first"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600"
                    checked={item.permisions.update}
                    onClick={() => handleUpdate(item.email)}
                  />
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  <input
                    id="disabled-first"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600"
                    checked={item.permisions.delete}
                    onClick={() => handleDelete(item.email)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTabel;
