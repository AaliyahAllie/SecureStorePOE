import {
  useEffect,
  useState,
} from "react";

import employeeApi
from "../services/employeeApi";

import StatsCards
from "../components/StatsCards";

import TransactionTable
from "../components/TransactionTable";

import SearchBar
from "../components/SearchBar";

export default function EmployeeDashboard() {

  const [stats,
    setStats] =
    useState({});

  const [payments,
    setPayments] =
    useState([]);

  async function loadData() {

    const statsRes =
      await employeeApi.get(
        "/employee/payments/stats"
      );

    const paymentRes =
      await employeeApi.get(
        "/employee/payments"
      );

    setStats(
      statsRes.data
    );

    setPayments(
      paymentRes.data.payments
    );
  }

  async function search(
    query
  ) {

    const res =
      await employeeApi.get(
        `/employee/payments/search?q=${query}`
      );

    setPayments(
      res.data.payments
    );
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="main-content">

      <h1>
        Employee Dashboard
      </h1>

      <StatsCards
        stats={stats}
      />

      <SearchBar
        onSearch={search}
      />

      <TransactionTable
        transactions={payments}
        onReload={loadData}
      />

    </div>
  );
}
