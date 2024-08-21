"use Client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "@/app/axios";

const Topheader = () => {
  const [count, setCount] = useState<number>(0);
  const user = useSelector((x: any) => x.TaskReducer.user);

  const getLevelInfo = () => {
    switch (Math.floor(count / 20)) {
      case 0:
        return {
          text: "Rookie",
          number: 1,
          image: "/images/lvl-1-rookie.png",
          lvlcoin: 20,
        };
      case 1:
        return {
          text: "Bronze",
          number: 2,
          image: "/images/lvl-2-bronze.png",
          lvlcoin: 20,
        };
      case 2:
        return {
          text: "Silver",
          number: 3,
          image: "/images/lvl-3-silver.png",
          lvlcoin: 20,
        };
      case 3:
        return {
          text: "Gold",
          number: 4,
          image: "/images/lvl-4-gold.png",
          lvlcoin: 20,
        };
      case 4:
        return {
          text: "Platinum",
          number: 5,
          image: "/images/lvl-5-platinum.png",
          lvlcoin: 20,
        };
      case 5:
        return {
          text: "Diamond",
          number: 6,
          image: "/images/lvl-6-diamond.png",
          lvlcoin: 20,
        };
      case 6:
        return {
          text: "Master",
          number: 7,
          image: "/images/lvl-7-master.png",
          lvlcoin: 20,
        };
      case 7:
        return {
          text: "Grand Master",
          number: 8,
          image: "/images/lvl-8-grand-master.png",
          lvlcoin: 20,
        };
      case 8:
        return {
          text: "Lord",
          number: 9,
          image: "/images/lvl-9-lord.png",
          lvlcoin: 20,
        };
      default:
        return {
          text: "Legendary",
          number: 10,
          image: "/images/lvl-10-legendary.png",
          lvlcoin: 20,
        };
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const { data } = await axios.get("/users");
        const item = data.find((item: any) => item.tgid === user); // Adjust the condition if needed
        setCount(item?.mount | (0 as number));
      }
    };
    fetchData();
  }, [user]);

  const levelInfo = getLevelInfo();

  return (
    <>
      <div className="bg-gradient-to-b from-[#FFFFFF] to-[#F2F2F2] shadow-[0px_4px_0px_0px_#CACACA] border border-[#FFFFFF] p-[10px] rounded-[10px] flex flex-col gap-[10px]">
        <div className="flex justify-between">
          <div className="flex gap-1">
            <img
              src="/images/john-doe.png"
              className="w-[50px] h-[50px]"
              alt=""
            />
            <div>
              <div className="flex items-center gap-2">
                <p className="text-[#282828] text-lg font-semibold">{user}</p>
                <img src={levelInfo.image} className="w-7 h-7" alt="" />
              </div>
              <p className="text-[#DD523A] text-sm">Level {levelInfo.number}</p>
            </div>
          </div>
          <div className="flex gap-1 items-center">
            <img src="/images/coin.png" alt="" className="w-7 h-7" />
            <p className="bg-gradient-to-b from-[#FED953] to-[#FFC700] text-transparent bg-clip-text stroke-1 stroke-[#CF6100] text-xl font-extrabold">
              {count}
            </p>
          </div>
        </div>
        <div className="relative">
          <div className="w-full h-[5px] rounded-[25px] bg-[#E8442433]"></div>
          <div
            className="absolute top-0 left-0 h-[5px] rounded-[25px] bg-[#E84424]"
            style={{
              width: `${
                ((count % levelInfo.lvlcoin) / levelInfo.lvlcoin) * 100
              }%`,
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default Topheader;
