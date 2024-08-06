"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "@/app/axios";
import { updateItem } from "../app/lib/api";
import Lottie from "react-lottie";
import * as idleAnim from "../app/animations/Ghost_Idle.json";
import * as eatAnim from "../app/animations/Ghost_Eat.json";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/reducers/TaskReducer";

export default function Index() {
  const dispatch = useDispatch();
  const user = useSelector((x: any) => x.TaskReducer.user);
  const [count, setCount] = useState<number>(0);
  const [mount, setMount] = useState<number>(1000);
  const [showAnimation, setShowAnimation] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [pulses, setPulses] = useState([]);
  const router = useRouter();
  const userFromQuery = router.query.user?.toString() || "";

  const defaultOption = {
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const animsOption = {
    ...defaultOption,
    animationData: showAnimation ? eatAnim : idleAnim,
  };

  const handleChange = () => {
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
    }, 500);
  };
  const getLevelInfo = () => {
    switch (Math.floor(count / 200000)) {
      case 0:
        return { text: "Bronze", number: 1 };
      case 1:
        return { text: "Silver", number: 2 };
      case 2:
        return { text: "Platinum", number: 3 };
      case 3:
        return { text: "Diamond", number: 4 };
      case 4:
        return { text: "Master", number: 5 };
      case 5:
        return { text: "Grandmaster", number: 6 };
      case 6:
        return { text: "Elite", number: 7 };
      case 7:
        return { text: "Legendary", number: 8 };
      case 8:
        return { text: "Mythic", number: 9 };
      default:
        return { text: "Mythic", number: 9 };
    }
  };
  const handleIncrement = (event: React.MouseEvent<HTMLDivElement>) => {
    let payload: any = [...pulses];
    payload.push(0);
    setPulses(payload);
    // const { clientX, clientY } = event
    const { userAgent } = window.navigator;
    if (!user || !userAgent.includes("Mobi")) return;
    const { clientX, clientY } = event;
    console.log("Mouse X: ", clientX, "Mouse Y: ", clientY);
    setMousePosition({ x: clientX, y: clientY });
    const newCount = count + 1;
    setCount(newCount);
    setMount(mount - 1);
    if (!showAnimation) handleChange();
    try {
      updateItem(user, newCount); // Use the correct item ID here
    } catch (error) {
      console.error("Failed to update item", error);
    }
  };
  useEffect(() => {
    if (mount < 1000) {
      const intervalId = setInterval(() => {
        setMount((prevMount) => Math.min(prevMount + 1, 1000)); // Ensure mount doesn't exceed 1000
      }, 1500); // Adjust the interval as needed

      return () => clearInterval(intervalId); // Clean up the interval on unmount
    }
  }, [mount]);

  useEffect(() => {
    if (userFromQuery) {
      const func = async () => {
        const { data } = await axios.post("/users", { user: userFromQuery });
        dispatch(setUser(data.user));
      };
      // func();
    }
  }, [userFromQuery]);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const { data } = await axios.get("/users");
        const item = data.find((item: any) => item.tgid === user); // Adjust the condition if needed
        setCount(item?.mount ?? 0);
      }
    };
    // fetchData();
  }, [user]);
  return (
    <>
      <div>
        <style>
          {`
            .animation {
              opacity: 1;
              animation-name: example;
              animation-duration: 1s;
              animation-fill-mode: forwards;
            }

            @keyframes example {
              0%   {opacity: 1; left :${mousePosition.x - 25 + "px"}; top:${
            mousePosition.y + "px"
          };}
              100% {opacity: 0; left: ${mousePosition.x - 25 + "px"}; top:${
            mousePosition.y - 200 + "px"
          };}
            }
            `}
        </style>
      </div>
      <div className="relative border-t border-[#DFDCD5] flex-1 h-0 overflow-x-hidden">
        <div className="flex flex-col gap-10 relative z-[1] px-5 pt-[28px] pb-[150px] rounded-t-3xl bg-gradient-to-b from-[#FFF3D8] to-[#F8DFA6] overflow-y-auto h-full">
          <div className="flex gap-1">
            <div className="bg-gradient-to-b from-[#FFFFFF] to-[#F2F2F2] shadow-[0px_4px_0px_0px_#CACACA] rounded-[10px] w-full flex flex-col items-center p-[10px]">
              <p className="font-semibold text-[#DD523A] text-xs text-center">
                Earn /Tap
              </p>
              <div className="flex gap-1">
                <img src="/images/coin.png" className="w-5 h-5" alt="" />
                <p className="text-lg font-semibold">+1</p>
              </div>
            </div>
            <div className="bg-gradient-to-b from-[#FFFFFF] to-[#F2F2F2] shadow-[0px_4px_0px_0px_#CACACA] rounded-[10px] w-full flex flex-col items-center p-[10px]">
              <p className="font-semibold text-[#DD523A] text-xs text-center">
                Coins to level up
              </p>
              <div className="flex gap-1">
                <img src="/images/coin.png" className="w-5 h-5" alt="" />
                <p className="text-lg font-semibold">5000</p>
              </div>
            </div>
            <div className="bg-gradient-to-b from-[#FFFFFF] to-[#F2F2F2] shadow-[0px_4px_0px_0px_#CACACA] rounded-[10px] w-full flex flex-col items-center p-[10px]">
              <p className="font-semibold text-[#DD523A] text-xs text-center">
                Profit /Hour
              </p>
              <div className="flex gap-1">
                <img src="/images/coin.png" className="w-5 h-5" alt="" />
                <p className="text-lg font-semibold">+1</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center gap-[6px]">
            <img src="/images/coin.png" alt="" />
            <p className="bg-gradient-to-b from-[#FED953] to-[#FFC700] text-transparent bg-clip-text stroke-1 stroke-[#CF6100] font-extrabold text-5xl">
              3,214
            </p>
          </div>
          <div>
            <div className="flex text-white items-center relative z-[2] font-bold">
              <div className="font-semibold text-[14px] text-black">
                {getLevelInfo().text}
              </div>
              <div className="ml-auto font-semibold text-[14px] text-main">
                <span className="text-[12px] text-black mr-1.5">Level</span>
                {getLevelInfo().number}/9
              </div>
            </div>
            <div className="z-[2] relative overflow-hidden min-h-3 rounded-full bg-[#D9D9D9] font-bold mt-2">
              <div
                className="h-full rounded-full transition-transform !duration-500 bg-main"
                style={{
                  transform: `translateX(-${
                    100 - ((count % 200000) / 200000) * 100
                  }%)`,
                }}
              ></div>
            </div>
          </div>
          <div className="flex justify-center">
            <p className="bg-gradient-to-b from-[#DD523A] to-[#C24934] shadow-[0px_4px_0px_0px_#AB402D] text-white rounded-[20px] p-[10px] z-[10]">
              Tap to collect
            </p>
          </div>
          <div className="flex justify-center mt-[-50px]">
            <img
              src="/images/egg-full.png"
              className="w-[390px] h-[390px]"
              alt=""
            />
          </div>
          <div className="flex font-bold text-[18px] text-black mt-[-50px]">
            <div className="flex items-center space-x-2 bg-gradient-to-b from-[#EEEEEE] to-[#FFFFFF] shadow-[0px_4px_0px_0px_#CACACA] px-[15px] py-[10px] rounded-[10px]">
              <img src="/images/lightening.svg" />
              <span>
                <span className="text-main">{mount}</span> / 1000
              </span>
              <img src="/images/pajamas_information-o.png" alt="" />
            </div>
            {/* <div className="flex items-center space-x-2 ml-auto">
              <img src="/images/boost.svg" />
              <span>Boost</span>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
0;
