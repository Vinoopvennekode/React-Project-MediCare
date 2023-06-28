import React, { useEffect, useState } from "react";
import { message, Tabs } from "antd";
import axios from "../../../axios/axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Notification() {
  const navigate = useNavigate();
  const { id, token } = useSelector((state) => state.userLogin);
  const [notification, setNotification] = useState([]);
  const [seenNotification, setseenNotification] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios
      .post(
        `/getAllNotifications`,
        { id },
        { headers: { Authorization: token } }
      )
      .then((response) => {
        const result = response.data;
        if (result.success) {
          setNotification(result.clientNotifications);
          setseenNotification(result.clientSeenNotification);
        } else {
          message.error(result.message);
        }
      });
  }, [refresh]);

  const handleMarkAllRead = () => {
    try {
      axios
        .patch(
          "/notificationMarkAllRead",
          { id },
          { headers: { Authorization: token } }
        )
        .then((response) => {
          if (response.data.success) {
            message.success(response.data.message);
            setRefresh(!refresh);
          } else {
            message.error(response.data.message);
          }
        });
    } catch (error) {
      console.log(error);
      message.error("somthing went wrong");
    }
  };

  const handleDeleteAllRead = () => {
    try {
      axios
        .patch(
          "/notificationDeleteAllRead",
          { id },
          { headers: { Authorization: token } }
        )
        .then((response) => {
          if (response.data.success) {
            message.success(response.data.message);
            setRefresh(!refresh);
          } else {
            message.error(response.data.message);
          }
        });
    } catch (error) {
      console.log(error);
      message.error("somthing went wrong");
    }
  };
  return (
    <>
      <div className="mt-16">
        <div className=" p-5 md:px-40 py-10">
          <div className="bg-gray-100 mb-11 pb-10">
            <div className="flex justify-center content-center  py-8">
              <h1 className="text-2xl font-serif  font-semibold">
                Notifications
              </h1>
            </div>

            <Tabs>
              <Tabs.TabPane tab="unRead" key={0}>
                <div>
                  {notification.length === 0 ? (
                    <div className="flex p-16 justify-center font-serif text-[#194569] text-xl">
                      No Notifications Yet..
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-end">
                        <button
                          onClick={handleMarkAllRead}
                          className="text-end text-[#1F6CD6] text-base mr-3"
                        >
                          Mark all read
                        </button>
                      </div>

                      {notification.map((notification) => (
                        <div
                          className=" m-5  rounded-lg shadow bg-white  py-4 bg-opacity-50 lg:px-13 lg:mx-32"
                          onClick={() =>
                            navigate("/payment", {
                              state: {
                                fee: notification.fee,
                                id: notification.id,
                              },
                            })
                          }
                        >
                          <h1 className="text-center text-[#dc2626]">
                            {notification.message}
                          </h1>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Read" key={1}>
                <div>
                  {seenNotification.length === 0 ? (
                    <div className="flex p-16 justify-center font-serif text-[#194569] text-xl">
                      No Notifications Yet..
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-end">
                        <button
                          onClick={handleDeleteAllRead}
                          className="text-end text-base text-[#1F6CD6] mr-3"
                        >
                          Delete all read
                        </button>
                      </div>

                      {seenNotification.map((notification) => (
                        <div
                          onClick={() =>
                            navigate("/payment", {
                              state: {
                                fee: notification.fee,
                                id: notification.id,
                              },
                            })
                          }
                          className=" m-5  rounded-lg shadow bg-white  py-4 bg-opacity-50 hover:bg-opacity-75 cursor-pointer lg:px-13 lg:mx-32"
                        >
                          <h1 className="text-center text-[#dc2626]">
                            {notification.message}
                          </h1>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Tabs.TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}

export default Notification;
