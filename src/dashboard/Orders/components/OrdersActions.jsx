import React, { useEffect, useState } from "react";
import { Space, Table, Tag, Dropdown, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { ORDER_STATUS } from "../../../utils/constants";
import { applyFilter } from "../../../store/ordersReducer";
import "./OrdersActions.scss";

const OrdersActions = () => {
  const orders = useSelector((state) => state.orders.data);
  const filters = useSelector((state) => state.orders.filters);
  const filterResult = useSelector((state) => state.orders.filterResult);

  const dispatch = useDispatch();
  const [total, setTotal] = useState({
    all: 0,
    process: 0,
    pending: 0,
    completed: 0,
    rejected: 0,
  });

  const changeView = (view) => {
    dispatch(applyFilter({ ...filters, view }));
  };

  const ViewType = ({ total, value }) => {
    let isSelected = value === filters.view;
    return (
      <p
        className={isSelected ? "view-active" : "view"}
        onClick={() => changeView(value)}
      >
        {value} ({total})
      </p>
    );
  };

  useEffect(() => {
    let totalAll = orders.length;
    let totalPending = orders.filter(
      (e) => e.status === ORDER_STATUS.PENDING
    ).length;
    let totalProcess = orders.filter(
      (e) => e.status === ORDER_STATUS.IN_PROCESS
    ).length;
    let totalCompleted = orders.filter(
      (e) => e.status === ORDER_STATUS.COMPLETED
    ).length;
    let totalRejected = orders.filter(
      (e) => e.status === ORDER_STATUS.REJECTED
    ).length;
    setTotal({
      all: totalAll,
      process: totalProcess,
      pending: totalPending,
      completed: totalCompleted,
      rejected: totalRejected,
    });
  }, [orders]);

  return (
    <div className="orders-actions">
      <Space className="flex-grow">
        <ViewType value="All" total={total.all} />
        <ViewType value="In_Process" total={total.process} />
        <ViewType value="Pending" total={total.pending} />
        <ViewType value="Completed" total={total.completed} />
        <ViewType value="Rejected" total={total.rejected} />

        {filters.search !== "" && (
          <div className="search-result">
            <b>{filterResult.length}</b> results for Order ID:{" "}
            <b>"{filters.search}"</b>
          </div>
        )}
      </Space>
    </div>
  );
};

export default OrdersActions;
