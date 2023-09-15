import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCompanies,
  getCompanies,
  restoreCompanies,
} from "../../Redux/Actions/Actions";

export default function Companies() {
  const { companies, companiesDelete } = useSelector((state) => state);
  const [companie, setCompanie] = useState("");
  const [updated, setUpdated] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCompanies());
    dispatch(getCompanies("deleted"));
  }, []);

  const handleSumbit = (event) => {
    if (event === "activos") {
      setCompanie("activos");
      dispatch(getCompanies("online"));
    }
    if (event === "bloqueados") {
      setCompanie("bloqueados");
      dispatch(getCompanies("deleted"));
    }
  };

  const handleDeleted = (e, id) => {
    e.preventDefault();
    dispatch(deleteCompanies(id));
    dispatch(getCompanies("deleted"));
    dispatch(getCompanies());
    setUpdated(!updated);
  };

  const handleRestore = (e, id) => {
    e.preventDefault();
    dispatch(restoreCompanies(id));
    dispatch(getCompanies());
    dispatch(getCompanies("deleted"));
  };

  return (
    <div>
      <button onClick={() => handleSumbit("activos")}>Empresas Activos</button>
      <button onClick={() => handleSumbit("bloqueados")}>
        Empresas Bloqueados
      </button>

      <div>
        {companie === "activos"
          ? companies?.map((u) => (
              <div key={u.id}>
                <div>
                  {u.name} {u.lastName} {u.email}
                </div>
                <button onClick={(e) => handleDeleted(e, u.id)}>
                  Bloquear
                </button>
              </div>
            ))
          : companiesDelete?.map((u) => (
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
}
