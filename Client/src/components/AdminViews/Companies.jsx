import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCompanies } from "../../Redux/Actions/Actions";

export default function Companies() {
  const { companies, companiesDelete } = useSelector((state) => state);
  const [companie, setCompanie] = useState("");

  const dispatch = useDispatch();

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
                {u.name} {u.lastName} {u.email}
              </div>
            ))
          : companiesDelete?.map((u) => (
              <div key={u.id}>
                {u.name} {u.lastName} {u.email}
              </div>
            ))}
      </div>
    </div>
  );
}
