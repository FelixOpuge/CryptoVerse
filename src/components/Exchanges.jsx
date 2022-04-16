import React from "react";
import millify from "millify";
import { Collapse, Row, Col, Typography, Avatar } from "antd";
import HTMLReactParser from "html-react-parser";
import { useGetExchangesQuery } from "../services/cryptoApi";
import Loader from "./Loader";

const { Panel } = Collapse;
const { Text } = Typography;

const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery();
  const exchangesList = data?.data?.exchanges;

  if (isFetching) {
    return <Loader />;
  }
  return (
    <>
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Changes</Col>
      </Row>
      <Row>
        {exchangesList?.map((exchange) => (
          <Col span={24}>
            <Collapse>
              <Panel
                key={exchange?.uuid}
                showArrow={false}
                header={
                  <Row key={exchange?.uuid}>
                    <Col span={6}>
                      <Text>
                        <strong>{exchange?.rank}</strong>
                      </Text>
                      <Avatar
                        className="exchange-name"
                        src={exchange?.iconUrl}
                      />
                      <Text>
                        <strong>{exchange?.name}</strong>
                      </Text>
                    </Col>
                    <Col span={6}>${millify(exchange?.volume)}</Col>
                    <Col span={6}>${millify(exchange?.numberOfMarkets)}</Col>
                    <Col span={6}>${millify(exchange?.marketShare)}</Col>
                  </Row>
                }
              >
                {HTMLReactParser(`${exchange?.description}` || "")}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;
