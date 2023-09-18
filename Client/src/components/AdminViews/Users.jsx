import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUsers,
  getUsers,
  restoreUsers,
} from "../../Redux/Actions/Actions";
const Users = () => {
  const { users, usersDelete } = useSelector((state) => state);
  const [user, setUser] = useState("");
  const [updated, setUpdated] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getUsers("deleted"));
  }, [updated]);

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

  const handleDeleted = (e, id) => {
    e.preventDefault();
    dispatch(deleteUsers(id));
    dispatch(getUsers("deleted"));
    dispatch(getUsers());
    setUpdated(!updated);
  };

  const handleRestore = (e, id) => {
    e.preventDefault();
    dispatch(restoreUsers(id));
    dispatch(getUsers());
    dispatch(getUsers("deleted"));
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
                <div>
                  {u.name} {u.lastName} {u.email}
                </div>
                <button onClick={(e) => handleDeleted(e, u.id)}>
                  Bloquear
                </button>
              </div>
            ))
          : usersDelete?.map((u) => (
              <div key={u.id}>
                <div>
                  {u.name} {u.lastName} {u.email}
                </div>
                <button onClick={(e) => handleRestore(e, u.id)}>
                  Restablecer
                </button>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Users;
