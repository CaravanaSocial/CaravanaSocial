import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletedAdmins,
  getAdmins,
  restoreAdmins,
  createAdmin,
  clearErrors,
  setNewErrors,
} from "../../../Redux/Actions/Actions";
import validation from "./validations";

export default function Admins() {
  const { admins, adminsDeleted } = useSelector((state) => state);
  const globalErrors = useSelector((state) => state.errors);
  const [admin, setAdmin] = useState("");
  const [updated, setUpdated] = useState(false);
  const [create, setCreate] = useState({
    name: "",
    email: "",
    password: "",
    createKey: "R*7fE2$9cH@6DpT",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getAdmins());
    dispatch(getAdmins("deleted"));
  }, []);

  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCreate({
      ...create,
      [name]: value,
    });
    setErrors(
      validation({
        ...create,
        [name]: value,
      })
    );
  };

  const handleSumbit = (event) => {
    if (event === "activos") {
      setAdmin("activos");
      dispatch(getAdmins());
    }
    if (event === "bloqueados") {
      setAdmin("bloqueados");
      dispatch(getAdmins("deleted"));
    }
    if (event === "crear") {
      setAdmin("crear");
    }
  };

  const handleDeleted = (e, id) => {
    e.preventDefault();
    dispatch(deletedAdmins(id));
    dispatch(getAdmins("deleted"));
    dispatch(getAdmins());
    setUpdated(!updated);
  };

  const handleRestore = (e, id) => {
    e.preventDefault();
    dispatch(restoreAdmins(id));
    dispatch(getAdmins());
    dispatch(getAdmins("deleted"));
  };

  const handleCreate = (e) => {
    e.preventDefault();
    dispatch(
      createAdmin({
        name: create.name,
        email: create.email,
        password: create.password,
        createKey: create.createKey,
      })
    ).then((postError) => {
      if (!postError) {
        dispatch(clearErrors());
        alert("Admin creado exitosamente!");
      } else {
        dispatch(
          setNewErrors({ type: "CREATE_ADMIN", error: postError.response.data })
        );
      }
    });
  };

  return (
    <div>
      <button onClick={() => handleSumbit("activos")}>Admins Activos</button>
      <button onClick={() => handleSumbit("bloqueados")}>
        Admins Bloqueados
      </button>
      <button onClick={() => handleSumbit("crear")}>Crear Admin</button>

      <div>
        {admin === "activos" ? (
          admins?.map((u) => (
            <div key={u.id}>
              <div>
                {u.name} {u.lastName} {u.email}
              </div>
              <button onClick={(e) => handleDeleted(e, u.id)}>Bloquear</button>
            </div>
          ))
        ) : admin === "bloqueados" ? (
          adminsDeleted?.map((u) => (
            <div key={u.id}>
              <div>
                {u.name} {u.lastName} {u.email}
              </div>
              <button onClick={(e) => handleRestore(e, u.id)}>
                Restablecer
              </button>
            </div>
          ))
        ) : (
          <div>
            <h2>Nombre: </h2>
            <input type="text" name="name" onChange={handleChange} />
            <h3 className="text-red-600">{errors.name ? errors.name : null}</h3>
            <h2>Email: </h2>
            <input type="email" name="email" onChange={handleChange} />
            <h3 className="text-red-600">
              {errors.email ? errors.email : null}
            </h3>
            <h2>Contraseña: </h2>
            <input type="password" name="password" onChange={handleChange} />
            <h3 className="text-red-600">
              {errors.password ? errors.password : null}
            </h3>
            <h3
              className="text-red-600"
              style={{
                visibility: globalErrors?.CREATE_ADMIN?.error
                  ? "visible"
                  : "hidden",
              }}
            >
              {globalErrors?.CREATE_ADMIN?.error}
            </h3>
            <button onClick={handleCreate}>Crear</button>
          </div>
        )}
      </div>
    </div>
  );
}
