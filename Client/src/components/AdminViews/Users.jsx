import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../Redux/Actions/Actions";
const Users = () => {
  const { users, usersDelete } = useSelector((state) => state);
  const [user, setUser] = useState("");

  const dispatch = useDispatch();

  const handleSumbit = (event) => {
    if (event === "activos") {
      setUser("activos");
      dispatch(getUsers("online"));
    }
    if (event === "bloqueados") {
      setUser("bloqueados");
      dispatch(getUsers("deleted"));
    }
  };

  return (
    <div>
      <button onClick={() => handleSumbit("activos")}>Usuarios Activos</button>
      <button onClick={() => handleSumbit("bloqueados")}>
        Usuarios Bloqueados
      </button>

      <div>
        {user === "activos"
          ? users?.map((u) => (
              <div key={u.id}>
                {u.name} {u.lastName} {u.email}
              </div>
            ))
          : usersDelete?.map((u) => (
              <div key={u.id}>
                {u.name} {u.lastName} {u.email}
              </div>
            ))}
      </div>
    </div>
  );
};

export default Users;
