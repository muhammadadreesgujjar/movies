import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useLocalStorageHandler from "../../hooks/useLocalStorageHandler";
import CheckBox from "../../components/Admin/CheckBox";
import permisionService from "../../helpers/utils/permisionService";
import { setUser } from "../../reducers/usersAuthSlice";

const AdminTabel = () => {
  const userDispatch = useDispatch();
  const [permision, setPermision] = useState([]);
  const selectorUsersAuth = useSelector((state) => state.usersAuth);
  useLocalStorageHandler();

  useEffect(() => {
    setPermision([...selectorUsersAuth]);
  }, [selectorUsersAuth]);

  const handleToggle = (email, permisionType) => {
    const response = permisionService(selectorUsersAuth, email, permisionType);
    userDispatch(setUser(response));
    setPermision(response);
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
                <CheckBox
                  checked={item.permisions.view}
                  handleToggle={() => handleToggle(item.email, "view")}
                />
                <CheckBox
                  checked={item.permisions.create}
                  handleToggle={() => handleToggle(item.email, "create")}
                />
                <CheckBox
                  checked={item.permisions.update}
                  handleToggle={() => handleToggle(item.email, "update")}
                />
                <CheckBox
                  checked={item.permisions.delete}
                  handleToggle={() => handleToggle(item.email, "delete")}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTabel;
