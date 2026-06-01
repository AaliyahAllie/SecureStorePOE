import {
  useEffect,
  useState,
} from "react";

import employeeApi
from "../services/employeeApi";

import EmployeeNavbar
from "../components/EmployeeNavbar";

export default function AuditLogs() {

  const [logs,
    setLogs] =
    useState([]);

  useEffect(() => {

    employeeApi
      .get(
        "/employee/audit"
      )
      .then((res) => {

        setLogs(
          res.data.logs
        );
      });

  }, []);

  return (
    <div>

      <EmployeeNavbar />

      <h1>
        Audit Logs
      </h1>

      {logs.map(
        (log) => (

          <div
            key={log._id}
          >

            <strong>
              {log.action}
            </strong>

            <p>
              {
                log.details
              }
            </p>

            <small>
              {
                new Date(
                  log.createdAt
                ).toLocaleString()
              }
            </small>

          </div>
        )
      )}
    </div>
  );
}