import { Table, Timeline, Breadcrumb, Descriptions, Tag } from "antd";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./OrderView.scss";
import Content from "../../components/Content";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrder } from "../../store/orderViewReducer";
import { ORDER_ITEMS_COLUMN } from "../../utils/columns";

const OrderView = () => {
  const { orderId } = useParams();
  const orderDetails = useSelector((state) => state.orderView.data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrder(orderId));
  }, [orderId]);

  return (
    <div className="order-view">
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/orders">Orders</Link>
        </Breadcrumb.Item>

        <Breadcrumb.Item>Order#{orderId}</Breadcrumb.Item>
      </Breadcrumb>
      <h2 className="heading">Order Summary</h2>

      <Descriptions size="small">
        <Descriptions.Item label="Order Id" span={2}>
          <b> {orderId}</b>
        </Descriptions.Item>
        <Descriptions.Item label="Due date" span={1}>
          {orderDetails.due}
        </Descriptions.Item>
        <Descriptions.Item label="Status" span={2}>
          <Tag color="geekblue">{orderDetails.status}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Created at" span={3}>
          {orderDetails.created}
        </Descriptions.Item>

        <Descriptions.Item label="Total Amount" span={2}>
          <p> ${orderDetails.amount}</p>
        </Descriptions.Item>
      </Descriptions>

      <div className="websites-list">
        <Table
          columns={ORDER_ITEMS_COLUMN}
          dataSource={orderDetails.items ?? []}
          pagination={false}
        />
      </div>

      <h2 className="heading">Order History</h2>
      <div className="order-history">
        <Timeline mode="left">
          {orderDetails.history?.map((history, index) => (
            <Timeline.Item key={index} label={history.time}>
              {history.event}
            </Timeline.Item>
          ))}
        </Timeline>
      </div>
    </div>
  );
};

export default OrderView;
