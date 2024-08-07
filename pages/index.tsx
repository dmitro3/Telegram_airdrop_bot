"use client";

import React, { useState, useEffect } from "react";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import axios from "@/app/axios";
import { updateItem } from "../app/lib/api";
import * as idleAnim from "../app/animations/Ghost_Idle.json";
import * as eatAnim from "../app/animations/Ghost_Eat.json";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/reducers/TaskReducer";
import fs from 'fs';
import path from 'path';
import { Games } from "@mui/icons-material";

interface Game {
  level: number;
  name: string;
  mount: number;
}

interface Data {
  games: Game[]
}

interface IndexProps {
  data: Data;
}

const Index: React.FC<IndexProps> = ({ data }) => {
  const dispatch = useDispatch();
  const user = useSelector((x: any) => x.TaskReducer.user);
  const [count, setCount] = useState<number>(0);
  const [profit, setprofit] = useState<number>(1);
  const [Games, setGames] = useState<Game[]>(data.games);
  const [mount, setMount] = useState<number>(1000);
  const [lvlcoin, setlvlcoin] = useState<number>(5000);
  const [tap, settap] = useState<number>(1);
  const [alert, setalert] = useState<number>(0);
  const [showAnimation, setShowAnimation] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [pulses, setPulses] = useState([]);
  const router = useRouter();
  const userFromQuery = router.query.user?.toString() || "";
  
  const getMountBylevel = (level: number): number | number => {
    const item = Games.find((item: Game) => item.level === level);
    return item ? item.mount : 0;
  };

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
    switch (Math.floor(count / lvlcoin)) {
      case 0:
        return { text: "Rookie", number: 1, image: "/images/lvl-1-rookie.png" };
      case 1:
        return { text: "Bronze", number: 2, image: "/images/lvl-2-bronze.png" };
      case 2:
        return { text: "Silver", number: 3, image: "/images/lvl-3-silver.png" };
      case 3:
        return { text: "Gold", number: 4, image: "/images/lvl-4-gold.png" };
      case 4:
        return {
          text: "Platinum",
          number: 5,
          image: "/images/lvl-5-platinum.png",
        };
      case 5:
        return {
          text: "Diamond",
          number: 6,
          image: "/images/lvl-6-diamond.png",
        };
      case 6:
        return { text: "Master", number: 7, image: "/images/lvl-7-master.png" };
      case 7:
        return {
          text: "Grand Master",
          number: 8,
          image: "/images/lvl-8-grand-master.png",
        };
      case 8:
        return { text: "Lord", number: 9, image: "/images/lvl-9-lord.png" };
      default:
        return {
          text: "Legendary",
          number: 10,
          image: "/images/lvl-10-legendary.png",
        };
    }
  };
  const handleIncrement = (event: React.MouseEvent<HTMLDivElement>) => {
    let payload: any = [...pulses];
    payload.push(0);
    setPulses(payload);
    // const { clientX, clientY } = event
    const { userAgent } = window.navigator;
    // if (!user || !userAgent.includes("Mobi")) return;
    const { clientX, clientY } = event;
    console.log("Mouse X: ", clientX, "Mouse Y: ", clientY);
    setMousePosition({ x: clientX, y: clientY });
    setalert(0);
    if (mount < tap) return;
    setalert(1);
    const newCount = count + tap;
    setCount(newCount);
    setMount(mount - tap);
    if (!showAnimation) handleChange();
    // try {
    //   updateItem(user, newCount); // Use the correct item ID here
    // } catch (error) {
    //   console.error("Failed to update item", error);
    // }
  };
  useEffect(() => {
    if (mount < 1000) {
      const intervalId = setInterval(() => {
        setMount((prevMount) => Math.min(prevMount + 1, 1000)); // Ensure mount doesn't exceed 1000
      }, 250); // Adjust the interval as needed

      return () => clearInterval(intervalId); // Clean up the interval on unmount
    }
  }, [mount]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) => (prevCount + profit));
    }, 60000); // Adjust the interval as needed

    return () => clearInterval(intervalId); // Clean up the interval on unmount
  })

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
  useEffect(() => {
    settap(getLevelInfo().number); // Increase the tap value based on the level number
  }, [count]);

  useEffect(() => {
    const mountValue = getMountBylevel(tap);
    setlvlcoin(mountValue);
  }, [tap])
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
              0%   {opacity: 1; left :${mousePosition.x - 250 + "px"}; top:${
            mousePosition.y + "px"
          };}
              100% {opacity: 0; left: ${mousePosition.x - 250 + "px"}; top:${
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
                <p className="text-lg font-semibold">+{tap}</p>
              </div>
            </div>
            <div className="bg-gradient-to-b from-[#FFFFFF] to-[#F2F2F2] shadow-[0px_4px_0px_0px_#CACACA] rounded-[10px] w-full flex flex-col items-center p-[10px]">
              <p className="font-semibold text-[#DD523A] text-xs text-center">
                Coins to level up
              </p>
              <div className="flex gap-1">
                <img src="/images/coin.png" className="w-5 h-5" alt="" />
                <p className="text-lg font-semibold">{lvlcoin}</p>
              </div>
            </div>
            <div className="bg-gradient-to-b from-[#FFFFFF] to-[#F2F2F2] shadow-[0px_4px_0px_0px_#CACACA] rounded-[10px] w-full flex flex-col items-center p-[10px]">
              <p className="font-semibold text-[#DD523A] text-xs text-center">
                Profit /Hour
              </p>
              <div className="flex gap-1">
                <img src="/images/coin.png" className="w-5 h-5" alt="" />
                <p className="text-lg font-semibold">+{profit}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center gap-[6px]">
            <img src="/images/coin.png" alt="" />
            <p className="bg-gradient-to-b from-[#FED953] to-[#FFC700] text-transparent bg-clip-text stroke-1 stroke-[#CF6100] font-extrabold text-5xl">
              {count}
            </p>
          </div>
          <div>
            <div className="flex text-white items-center relative z-[2] font-bold">
              <div className="font-semibold text-[14px] text-black flex">
                <img src={getLevelInfo().image} className="w-8 h-8" alt="" />
                <span className="flex justify-center items-center ml-1">
                  {getLevelInfo().text}
                </span>
              </div>
              <div className="ml-auto font-semibold text-[14px] text-main">
                <span className="text-[12px] text-black mr-1.5">Level</span>
                {getLevelInfo().number}/10
              </div>
            </div>

            <div className="z-[2] relative overflow-hidden min-h-3 rounded-full bg-[#D9D9D9] font-bold mt-2">
              <div
                className="h-3 rounded-full transition-transform !duration-500 bg-main"
                style={{
                  transform: `translateX(-${100 - ((count % lvlcoin) / lvlcoin) * 100}%)`,
                }}
              ></div>
            </div>
          </div>
          <div className="flex justify-center">
            <p className="bg-gradient-to-b from-[#DD523A] to-[#C24934] shadow-[0px_4px_0px_0px_#AB402D] text-white rounded-[20px] p-[10px] z-[10]">
              Tap to collect
            </p>
          </div>
          <div
            className="flex justify-center mt-[-50px]"
            onClick={handleIncrement}
          >
            <img
              src="/images/egg-full.png"
              className={`w-[390px] h-[390px] ${tap > 2 ? "hidden" : ""}`}
              alt=""
            />
            <img
              src="/images/egg-bitbroken.png"
              className={`w-[390px] h-[390px] ${
                tap > 4 || tap < 3 ? "hidden" : ""
              }`}
              alt=""
            />
            <img
              src="/images/redbird.png"
              className={`w-[390px] h-[390px] ${tap < 5 ? "hidden" : ""}`}
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
            <div
              className={`flex items-center space-x-2 bg-gradient-to-b from-[#EEEEEE] to-[#FFFFFF] shadow-[0px_4px_0px_0px_#CACACA] px-[15px] py-[10px] rounded-[10px] ml-auto ${
                tap > 4 ? "block" : "hidden"
              }`}
            >
              <img src="/images/redbird-small.svg" alt="" />
              <span className="text-[#E3310B]">Game Go</span>
            </div>
            {/* <div className="flex items-center space-x-2 ml-auto">
              <img src="/images/boost.svg" />
              <span>Boost</span>
            </div> */}
          </div>
        </div>
      </div>
      {alert === 1 &&
        pulses.map((pulse, index) => (
          <img
            key={index}
            className="absolute w-[50px] h-[50px] animation z-20"
            src="/images/coin.png"
            alt=""
          />
        ))}
    </>
  );
}


export const getStaticProps: GetStaticProps = async () => {
  const filePath = path.join(process.cwd(), 'public', 'data.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const data: Data = JSON.parse(jsonData);

  return {
    props: {
      data,
    },
  };
};

export default Index;