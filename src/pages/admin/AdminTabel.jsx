import React, { useEffect, useState } from "react";
import useLocalStorageHandler from "../../hooks/useLocalStorageHandler";
import CheckBox from "../../components/Admin/CheckBox";
import useFetchAPI from "../../hooks/useFetchAPI";

const AdminTabel = () => {
  const [permision, setPermision] = useState([]);
  useLocalStorageHandler();
  const [data, loading, error, fecthCall] = useFetchAPI(
    "/permision/update-user-permisions"
  );
  const [data1, loading1, error1, fecthCall1] = useFetchAPI(
    "/permision/admin-permisions"
  );
  useEffect(() => {
    (async () => {
      const res = await fecthCall1();
      if (!error1) {
        setPermision([...res]);
      }
    })();
  }, []);

  const handleToggle = async (email, permisionType) => {
    const res = await fecthCall("POST", {
      email,
      permisionType,
    });

    if (!error) {
      setPermision((prev) => {
        return prev.map((item) => {
          if (item._id == res._id) return res;
          return item;
        });
      });
    }
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
                  checked={item.permisions.includes("view")}
                  handleToggle={() => handleToggle(item.email, "view")}
                />
                <CheckBox
                  checked={item.permisions.includes("create")}
                  handleToggle={() => handleToggle(item.email, "create")}
                />
                <CheckBox
                  checked={item.permisions.includes("update")}
                  handleToggle={() => handleToggle(item.email, "update")}
                />
                <CheckBox
                  checked={item.permisions.includes("delete")}
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
