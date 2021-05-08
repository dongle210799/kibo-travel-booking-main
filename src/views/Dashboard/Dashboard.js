import React, { useState, useEffect, lazy, Suspense } from "react";

import { Col, Row } from "reactstrap";
import { onShowReport } from "../../apis/dashboard";

import { getStyle, hexToRgba } from "@coreui/coreui/dist/js/coreui-utilities";

const Widget03 = lazy(() => import("../../views/Widgets/Widget03"));

function Dashboard() {
  const [userCountTrue, setUserCoutTrue] = useState();
  const [userCountFalse, setUserCountFalse] = useState();
  const [bedCountTrue, setBedCountTrue] = useState();
  const [bedCountFalse, setBedCountFalse] = useState();
  const [nurseCountTrue, setNurseCountTrue] = useState();
  const [nurseCountFalse, setNurseCountFalse] = useState();
  const [patientCountTrue, setPatientCountTrue] = useState();
  const [patientCountFalse, setPatientCountFalse] = useState();
  const [roomCountTrue, setRoomCountTrue] = useState();
  const [roomCountFalse, setRoomCountFalse] = useState();

  useEffect(() => {
    getReport();
  }, []);
  const getReport = async () => {
    try {
      const res = await onShowReport();
      setUserCoutTrue(res.data.userCountTrue);
      setUserCountFalse(res.data.userCountFalse);
      setBedCountTrue(res.data.bedCountTrue);
      setBedCountFalse(res.data.bedCountFalse);
      setNurseCountTrue(res.data.nurseCountTrue);
      setNurseCountFalse(res.data.nurseCountFalse);
      setPatientCountTrue(res.data.patientCountTrue);
      setPatientCountFalse(res.data.patientCountFalse);
      setRoomCountTrue(res.data.roomCountTrue);
      setRoomCountFalse(res.data.roomCountFalse);
    } catch (error) {
      console.log(error);
    }
  };
  const loading = () => <div className="animated fadeIn ">Loading...</div>;

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xl="4"  xs="12" md="4" mx="6">
          <Suspense fallback={loading}>
            <Widget03
              dataBox={() => ({
                variant: "blue",
                Active: `${userCountTrue}`,
                InActive: `${userCountFalse}`,
              })}
              className="text-center text-value"
            >
              <div className="text-white bg-primary">
                <i className="fa fa-user "></i> {userCountTrue + userCountFalse}
                <div>Total Users</div>
              </div>
            </Widget03>
          </Suspense>
        </Col>
        <Col xl="4"  xs="12" md="4" mx="6" >
          <Suspense fallback={loading}>
            <Widget03
              dataBox={() => ({
                variant: "green",
                Active: `${nurseCountTrue}`,
                InActive: `${nurseCountFalse}`,
              })}
              className="text-center text-value"
            >
              <div className="text-white ">
                <i className="fa fa-user-md "></i>{" "}
                {nurseCountTrue + nurseCountFalse}
                <div>Total Nurses</div>
              </div>
            </Widget03>
          </Suspense>
        </Col>
       

        <Col  xl="4"  xs="12" md="4" mx="6">
          <Suspense fallback={loading}>
            <Widget03
              dataBox={() => ({
                variant: "facebook",
                Active: `${patientCountTrue}`,
                InActive: `${patientCountFalse}`,
              })}
              className="text-center text-value"
            >
              <div className="text-white ">
                <i className="fa fa-wheelchair "></i>{" "}
                {patientCountTrue + patientCountFalse}
                <div>Total Patients</div>
              </div>
            </Widget03>
          </Suspense>
        </Col>

        <Col  xl="4"  xs="12" md="4" mx="6">
          <Suspense fallback={loading}>
            <Widget03
              dataBox={() => ({
                variant: "red",
                Active: `${roomCountTrue}`,
                InActive: `${roomCountFalse}`,
              })}
              className="text-center text-value"
            >
              <div className="text-white ">
                <i className="fa fa-hospital-o "></i>{" "}
                {roomCountTrue + roomCountFalse}
                <div>Total Rooms</div>
              </div>
            </Widget03>
          </Suspense>
        </Col>
        <Col  xl="4"  xs="12" md="4" mx="6">
          <Suspense fallback={loading}>
            <Widget03
              dataBox={() => ({
                variant: "yellow",
                Active: `${bedCountTrue}`,
                InActive: `${bedCountFalse}`,
              })}
              className="text-center text-value"
            >
              <div className="text-white ">
                <i className="fa fa-bed "></i> {bedCountTrue + bedCountFalse}
                <div>Total Beds</div>
              </div>
            </Widget03>
          </Suspense>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
