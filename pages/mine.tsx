"use Client";

import { useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";

import Tabs from "@/app/components/tabs";
import Card from "@/app/components/common/card";

function Mine() {
  const router = useRouter();
  const userFromQuery = router.query.user?.toString() || "";
  const allTasks = useSelector((x: any) => x.TaskReducer.tasks);
  const mainTasks = allTasks?.filter((x: any) => x.extra === false);
  const user = useSelector((x: any) => x.TaskReducer.user);
  const handleImageLoad = () => {
    // setImagesLoaded((prev) => {
    //     console.log(prev)
    //     const newCount = prev + 1;
    //     console.log(newCount)
    //     if (newCount === totalImages) {
    //         setLoading(false);
    //     }
    //     return newCount;
    // });
  };

  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <div className="flex-1 h-0">
        <div className="pt-[23px] pb-[150px] px-5 text-white rounded-t-3xl border-t border-[#DFDCD5] bg-gradient-to-b from-[#FFF3D8] to-[#F8DFA6] h-full overflow-auto flex flex-col gap-5">
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
                    <p className="text-[#282828] text-lg font-semibold">
                      Johndoe
                    </p>
                    <img
                      src="/images/lvl-5-platinum.png"
                      className="w-7 h-7"
                      alt=""
                    />
                  </div>
                  <p className="text-[#DD523A] text-sm">Level 5</p>
                </div>
              </div>
              <div className="flex gap-1 items-center">
                <img src="/images/coin.png" alt="" className="w-7 h-7" />
                <p className="bg-gradient-to-b from-[#FED953] to-[#FFC700] text-transparent bg-clip-text stroke-1 stroke-[#CF6100] text-xl font-extrabold">
                  100,400
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-[5px] rounded-[25px] bg-[#E8442433]"></div>
              <div className="absolute top-0 left-0 w-4/5 h-[5px] rounded-[25px] bg-[#E84424]"></div>
            </div>
          </div>
          <div className="flex justify-end gap-1">
            <p className="text-[#DD523A]">
              Time left : <span className="font-semibold">15:42:12</span>
            </p>
            <img
              src="/images/heroicons_information-circle-16-solid.png"
              className="w-5 h-5"
            />
          </div>
          <div className="flex justify-between items-center bg-white rounded-[10px] p-[10px]">
            <div className="flex gap-[10px] items-center">
              <p className="text-black font-semibold">Daily Combo</p>
              <div className="flex gap-[5px]">
                <img src="/images/little-bird.png" className="w-5 h-5" />
                <img src="/images/little-bird.png" className="w-5 h-5" />
                <img src="/images/little-bird.png" className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-center gap-1 bg-gradient-to-b from-[#FFAB07] to-[#E76116] px-[7.5px] py-[5px] rounded-[5px] shadow-[0px_2px_0px_0px_#DC6E09] border border-[#FF8A00]">
              <img src="/images/coin.png" className="w-5 h-5" />
              <p className="font-semibold text-sm">+5,000,000</p>
            </div>
          </div>
          <div className="flex gap-[10px]">
            <div className="bg-white rounded-[10px] flex justify-center items-center py-5 pr-3">
              <img src="/images/box.png" alt="" />
            </div>
            <div className="bg-white rounded-[10px] flex justify-center items-center py-5 pr-3">
              <img src="/images/box.png" alt="" />
            </div>
            <div className="bg-white rounded-[10px] flex justify-center items-center py-5 pr-3">
              <img src="/images/box.png" alt="" />
            </div>
          </div>
          <Tabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabLabels={["Markets", "PR&Team", "Legals", "Special"]}
          />
          <div className="grid grid-cols-2 gap-[10px]">
            <div className="bg-white rounded-[10px] text-black">
              <div className="flex p-[10px] justify-between">
                <img
                  src="/images/fashion.png"
                  className="w-[75px] h-[75px]"
                  alt=""
                />
                <div className="flex flex-col justify-between">
                  <p className="font-semibold text-sm">Fashion 1</p>
                  <p className="text-xs">Profit /Hour</p>
                  <div className="flex gap-1 items-center">
                    <img src="/images/coin.png" className="w-5 h-5" alt="" />
                    <p className="text-xs font-semibold">+40</p>
                  </div>
                </div>
              </div>
              <hr className="border-[#CACACA]" />
              <div className="flex justify-around">
                <p className="text-center font-semibold text-sm border-r border-[#CACACA] py-3 w-1/2">
                  Level 0
                </p>
                <div className="flex justify-center items-center gap-1 py-3 w-1/2">
                  <img src="/images/coin.png" className="w-5 h-5" alt="" />
                  <p className="font-semibold text-sm">10K</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-[10px] text-black">
              <div className="flex p-[10px] justify-between">
                <img
                  src="/images/fashion.png"
                  className="w-[75px] h-[75px]"
                  alt=""
                />
                <div className="flex flex-col justify-between">
                  <p className="font-semibold text-sm">Figma</p>
                  <p className="text-xs">Profit /Hour</p>
                  <div className="flex gap-1 items-center">
                    <img src="/images/coin.png" className="w-5 h-5" alt="" />
                    <p className="text-xs font-semibold">+10</p>
                  </div>
                </div>
              </div>
              <hr className="border-[#CACACA]" />
              <div className="flex justify-around">
                <p className="text-center font-semibold text-sm border-r border-[#CACACA] py-3 w-1/2">
                  Level 0
                </p>
                <div className="flex justify-center items-center gap-1 py-3 w-1/2">
                  <img src="/images/coin.png" className="w-5 h-5" alt="" />
                  <p className="font-semibold text-sm">5K</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-[10px] text-black">
              <div className="flex p-[10px] justify-between">
                <img
                  src="/images/fashion.png"
                  className="w-[75px] h-[75px]"
                  alt=""
                />
                <div className="flex flex-col justify-between">
                  <p className="font-semibold text-sm">Copywr...</p>
                  <p className="text-xs">Profit /Hour</p>
                  <div className="flex gap-1 items-center">
                    <img src="/images/coin.png" className="w-5 h-5" alt="" />
                    <p className="text-xs font-semibold">+10</p>
                  </div>
                </div>
              </div>
              <hr className="border-[#CACACA]" />
              <div className="flex justify-around">
                <p className="text-center font-semibold text-sm border-r border-[#CACACA] py-3 w-1/2">
                  Level 0
                </p>
                <div className="flex justify-center items-center gap-1 py-3 w-1/2">
                  <img src="/images/coin.png" className="w-5 h-5" alt="" />
                  <p className="font-semibold text-sm">5K</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-[10px] text-black">
              <div className="flex p-[10px] justify-between">
                <img
                  src="/images/fashion-lock.png"
                  className="w-[75px] h-[75px]"
                  alt=""
                />
                <div className="flex flex-col justify-between">
                  <p className="font-semibold text-sm">Editing</p>
                  <p className="text-xs">Profit /Hour</p>
                  <div className="flex gap-1 items-center">
                    <img src="/images/coin.png" className="w-5 h-5" alt="" />
                    <p className="text-xs font-semibold">+10</p>
                  </div>
                </div>
              </div>
              <hr className="border-[#CACACA]" />
              <div className="flex justify-around">
                <p className="text-center font-semibold text-sm border-r border-[#CACACA] py-3 w-1/2">
                  Level 0
                </p>
                <div className="flex justify-center items-center gap-1 py-3 w-1/2">
                  <img src="/images/coin.png" className="w-5 h-5" alt="" />
                  <p className="font-semibold text-sm">5K</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-[10px] text-black">
              <div className="flex p-[10px] justify-between">
                <img
                  src="/images/fashion-lock.png"
                  className="w-[75px] h-[75px]"
                  alt=""
                />
                <div className="flex flex-col justify-between">
                  <p className="font-semibold text-sm">Promoti...</p>
                  <p className="text-xs">Profit /Hour</p>
                  <div className="flex gap-1 items-center">
                    <img src="/images/coin.png" className="w-5 h-5" alt="" />
                    <p className="text-xs font-semibold">+10</p>
                  </div>
                </div>
              </div>
              <hr className="border-[#CACACA]" />
              <div className="flex justify-around">
                <p className="text-center font-semibold text-sm border-r border-[#CACACA] py-3 w-1/2">
                  Level 0
                </p>
                <div className="flex justify-center items-center gap-1 py-3 w-1/2">
                  <img src="/images/coin.png" className="w-5 h-5" alt="" />
                  <p className="font-semibold text-sm">5K</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-[10px] text-black">
              <div className="flex p-[10px] justify-between">
                <img
                  src="/images/fashion-lock.png"
                  className="w-[75px] h-[75px]"
                  alt=""
                />
                <div className="flex flex-col justify-between">
                  <p className="font-semibold text-sm">Marketi...</p>
                  <p className="text-xs">Profit /Hour</p>
                  <div className="flex gap-1 items-center">
                    <img src="/images/coin.png" className="w-5 h-5" alt="" />
                    <p className="text-xs font-semibold">+10</p>
                  </div>
                </div>
              </div>
              <hr className="border-[#CACACA]" />
              <div className="flex justify-around">
                <p className="text-center font-semibold text-sm border-r border-[#CACACA] py-3 w-1/2">
                  Level 0
                </p>
                <div className="flex justify-center items-center gap-1 py-3 w-1/2">
                  <img src="/images/coin.png" className="w-5 h-5" alt="" />
                  <p className="font-semibold text-sm">5K</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center absolute left-[20px] bottom-[20px] z-[100] w-[calc(100%-40px)]">
        <div className="grid grid-cols-5 justify-center mt-auto shadow-[0px_4px_0px_0px_#CACACA] bg-white py-[10px] px-[9px] gap-[6px] w-full font-medium text-[12px] rounded-[25px]">
          <Link href={`/mine`}>
            <div
              className={
                "flex flex-col justify-center space-y-1 text-xs h-[64px] text-center rounded-xl items-center " +
                (router.pathname === "/mine"
                  ? "text-[#00B2FF]"
                  : "text-[#A4A4A4]")
              }
            >
              <img src="/images/footer-mine.png" />
              <div className="text-center">Mine</div>
            </div>
          </Link>
          <Link href={"/earn"}>
            <div
              className={
                "flex flex-col justify-center space-y-1 text-xs h-[64px] text-center rounded-xl items-center " +
                (router.pathname === "/earn"
                  ? "text-[#00B2FF]"
                  : "text-[#A4A4A4]")
              }
            >
              <img src="/images/footer-earn.png" />
              <div>Earn</div>
            </div>
          </Link>
          <Link href={`/?user=${user}`}>
            <div
              className={
                "flex flex-col justify-center space-y-1 text-xs h-[64px] text-center rounded-xl items-center " +
                (router.pathname === "/" ? "text-[#00B2FF]" : "text-[#A4A4A4]")
              }
            >
              <img
                src="/images/footer-game.png"
                className="mt-[-25px] w-[75px] h-[75px]"
              />
              <div>Game</div>
            </div>
          </Link>
          <Link href={"/friend"}>
            <div
              className={
                "flex flex-col justify-center space-y-1 text-xs h-[64px] text-center rounded-xl items-center " +
                (router.pathname === "/friend"
                  ? "text-[#00B2FF]"
                  : "text-[#A4A4A4]")
              }
            >
              <img src="/images/footer-friend.png" />
              <div>Friends</div>
            </div>
          </Link>
          <Link href={"/account"}>
            <div
              className={
                "flex flex-col justify-center space-y-1 text-xs h-[64px] text-center rounded-xl items-center " +
                (router.pathname === "/account"
                  ? "text-[#00B2FF]"
                  : "text-[#A4A4A4]")
              }
            >
              <img src="/images/footer-account.png" />
              <div>Account</div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  // Fetch or define your static props here
  return {
    props: {
      data: {}, // Example data
    },
  };
}

export default Mine;
