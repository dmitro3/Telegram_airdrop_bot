"use Client";

import { useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";


import Card from "@/app/components/common/card";
import YoutubeCard from "@/app/components/common/youtubecard";
import Tabs from "@/app/components/tabs";

function Earn() {
  const allTasks = useSelector((x: any) => x.TaskReducer.tasks);
  const extraTasks = allTasks?.filter((x: any) => x.extra === true);
  const router = useRouter();
  const user = useSelector((x: any) => x.TaskReducer.user);
  const userFromQuery = router.query.user?.toString() || "";

  const [activeTab, setActiveTab] = useState(0);

  const handleImageLoad = () => {};

  return (
    <>
      <div className="flex-1 h-0">
        <div className="pt-[23px] pb-[150px] px-5 text-white rounded-t-3xl border-t border-[#DFDCD5] bg-gradient-to-b from-[#FFF3D8] to-[#F8DFA6] h-full overflow-auto">
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
          <img src="/images/box.png" className="mt-7 mx-auto" alt="" />
          <div className="font-semibold text-[30px] text-center text-[#282828]">
            Earn More Coins
          </div>
          <div className="pb-[26px] text-[16px] text-center text-[#DD523A]">
            Complete daily tasks, unlock bonus levels, and participate in social
            media to earn more Chirpley coins.
          </div>
          <Tabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabLabels={["Daily Tasks", "Bonus Levels"]}
          />
          {activeTab === 0 && (
            <>
              <p className="text-[#282828] text-xl font-semibold mt-[20px]">
                Daily tasks
              </p>
              <Card
                title="Telegram Channel"
                description="Click on the link amd hit the follow button."
                price="10000"
                link="https://t.me/MagicVipClub"
                img="/images/telegram.svg"
                onLoad={handleImageLoad}
              ></Card>
              {/* {extraTasks.map((x: any, i: number) => (
              <YoutubeCard
                key={i}
                title={x.title}
                description={x.description}
                price={x.price}
                link={x.link}
                img={x.image}
                onLoad={handleImageLoad}
              />
            ))} */}
              <p className="text-[#282828] text-xl font-semibold mt-[20px]">
                Task list
              </p>
              <Card
                title="Mexc"
                description="Click on the link amd hit the follow button."
                price="10000"
                link="https://www.mexc.com/ru-RU/register?inviteCode=mexc-Magik"
                img="/images/mexc.png"
                onLoad={handleImageLoad}
              ></Card>
              <Card
                title="Gate"
                description="Click on the link amd hit the follow button."
                price="10000"
                link="https://www.gate.io/signup/11024473"
                img="/images/gate-io.png"
                onLoad={handleImageLoad}
              ></Card>
              <Card
                title="Bitmart"
                description="Click on the link amd hit the follow button."
                price="10000"
                link="https://www.bitmart.com/register-referral/en?r=TxcR8r"
                img="/images/bitmart.png"
                onLoad={handleImageLoad}
              ></Card>
              <Card
                title="Bingx"
                description="Click on the link amd hit the follow button."
                price="10000"
                link="https://bingx.com/invite/E5RZZM"
                img="/images/bingx.png"
                onLoad={handleImageLoad}
              ></Card>
              <Card
                title="Getgems"
                description="Click on the link amd hit the follow button."
                price="10000"
                link="http://getgems.io/virtualsworlds"
                img="/images/getgem.png"
                onLoad={handleImageLoad}
              ></Card>
              <Card
                title="Twitter"
                description="Click on the link amd hit the follow button."
                price="10000"
                link="http://x.com/VirtualsWorlds"
                img="/images/twitterIcon-BqHkf0Wv.png"
                onLoad={handleImageLoad}
              ></Card>
              <Card
                title="Youtube"
                description="Click on the link amd hit the follow button."
                price="10000"
                link="http://youtube.com/@magicnft"
                img="/images/youtube.png"
                onLoad={handleImageLoad}
              ></Card>
              <Card
                title="Github"
                description="Click on the link amd hit the follow button."
                price="10000"
                link="http://github.com/MagicVipPeople"
                img="/images/github.png"
                onLoad={handleImageLoad}
              ></Card>
              <Card
                title="Facebook"
                description="Click on the link amd hit the follow button."
                price="10000"
                link="http://www.facebook.com/MagicVipClub"
                img="/images/facebook.png"
                onLoad={handleImageLoad}
              ></Card>
              <Card
                title="Instagram"
                description="Click on the link amd hit the follow button."
                price="10000"
                link="http://www.instagram.com/magiknft"
                img="/images/instagram.png"
                onLoad={handleImageLoad}
              ></Card>
              <Card
                title="Ticktok"
                description="Click on the link amd hit the follow button."
                price="10000"
                link=" http://www.tiktok.com/@spacetickets"
                img="/images/ticktok.png"
                onLoad={handleImageLoad}
              ></Card>
              <Card
                title="Gate Magic-Game"
                description="Click on the link amd hit the follow button."
                price="10000"
                link="http://gate.io/nft/collection/11879/Magic-Game"
                img="/images/gate-io.png"
                onLoad={handleImageLoad}
              ></Card>
              <Card
                title="Referrals Airdrop"
                description="Click on the link amd hit the follow button."
                price="10000"
                link="https://t.me/ReferralsAirdrop"
                img="/images/TON.png"
                onLoad={handleImageLoad}
              ></Card>
              <Card
                title="Rarible"
                description="Click on the link amd hit the follow button."
                price="10000"
                link="http://rarible.com/magicnftcollections"
                img="/images/rarible.png"
                onLoad={handleImageLoad}
              ></Card>
              <Card
                title="Opensea"
                description="Click on the link amd hit the follow button."
                price="10000"
                link="http://opensea.io/MagicNFTcollections"
                img="/images/opensea.png"
                onLoad={handleImageLoad}
              ></Card>
              <Card
                title="Tonresear"
                price="10000"
                link="https://tonresear.ch/t/tma-clicker-token-vws-game-mining-pool-vws-ton-dedust-io-mining-nfts-buidls-dorahacks-io/18457/3"
                img="/images/TON.png"
                onLoad={handleImageLoad}
              ></Card>
              <Card
                title="Ton Jetttons"
                description="Subscribe and mining will begin for you"
                price="10000"
                link="https://ton.app/ru/jettons/EQBfX9KO5yIFprHWPpJp3OsX-6cjLjEJF-h5uIQE3eLJY8_h"
                img="/images/getgem.png"
                onLoad={handleImageLoad}
              ></Card>
            </>
          )}
          {activeTab === 1 && (
            <>
              <p className="text-[20px] font-semibold text-[#282828] mt-5">
                Bonus for leveling up
              </p>
              <div className="flex p-[10px] w-full justify-between">
                <p className="min-w-[137px] text-[#DD523A]">Level</p>
                <p className="min-w-[66px] text-[#DD523A]">For friend</p>
                <p className="min-w-[85px] text-[#DD523A]">Premium</p>
              </div>
              <div className="flex flex-col gap-3">
                <div className="bg-white rounded-[10px] p-[10px] text-[#282828] flex justify-between items-center">
                  <div className="flex items-center gap-1 min-w-[137px]">
                    <img src="/images/lvl-1-rookie.png" alt="" />
                    <p className="font-semibold text-sm">Rookie</p>
                  </div>
                  <div className="flex gap-1">
                    <img src="/images/coin.png" className="w-5 h-5" alt="" />
                    <p className="font-semibold">+20K</p>
                  </div>
                  <div className="flex gap-1">
                    <img src="/images/coin.png" className="w-5 h-5" alt="" />
                    <p className="font-semibold pr-5">+25K</p>
                  </div>
                </div>
                <div className="bg-white rounded-[10px] p-[10px] text-[#282828] flex justify-between items-center">
                  <div className="flex items-center gap-1 min-w-[137px]">
                    <img src="/images/lvl-2-bronze.png" alt="" />
                    <p className="font-semibold">Bronze</p>
                  </div>
                  <div className="flex gap-1">
                    <img src="/images/coin.png" className="w-5 h-5" alt="" />
                    <p className="font-semibold">+20K</p>
                  </div>
                  <div className="flex gap-1">
                    <img src="/images/coin.png" className="w-5 h-5" alt="" />
                    <p className="font-semibold pr-5">+25K</p>
                  </div>
                </div>
                <div className="bg-white rounded-[10px] p-[10px] text-[#282828] flex justify-between items-center">
                  <div className="flex items-center gap-1 min-w-[137px]">
                    <img src="/images/lvl-3-silver.png" alt="" />
                    <p className="font-semibold">Silver</p>
                  </div>
                  <div className="flex gap-1">
                    <img src="/images/coin.png" className="w-5 h-5" alt="" />
                    <p className="font-semibold">+20K</p>
                  </div>
                  <div className="flex gap-1">
                    <img src="/images/coin.png" className="w-5 h-5" alt="" />
                    <p className="font-semibold pr-5">+25K</p>
                  </div>
                </div>
                <div className="bg-white rounded-[10px] p-[10px] text-[#282828] flex justify-between items-center">
                  <div className="flex items-center gap-1 min-w-[137px]">
                    <img src="/images/lvl-4-gold.png" alt="" />
                    <p className="font-semibold">Gold</p>
                  </div>
                  <div className="flex gap-1">
                    <img src="/images/coin.png" className="w-5 h-5" alt="" />
                    <p className="font-semibold">+20K</p>
                  </div>
                  <div className="flex gap-1">
                    <img src="/images/coin.png" className="w-5 h-5" alt="" />
                    <p className="font-semibold pr-5">+25K</p>
                  </div>
                </div>
                <div className="bg-white rounded-[10px] p-[10px] text-[#282828] flex justify-between items-center">
                  <div className="flex items-center gap-1 min-w-[137px]">
                    <img src="/images/lvl-5-platinum.png" alt="" />
                    <p className="font-semibold">Platinum</p>
                  </div>
                  <div className="flex gap-1">
                    <img src="/images/coin.png" className="w-5 h-5" alt="" />
                    <p className="font-semibold">+20K</p>
                  </div>
                  <div className="flex gap-1">
                    <img src="/images/coin.png" className="w-5 h-5" alt="" />
                    <p className="font-semibold pr-5">+25K</p>
                  </div>
                </div>
                <div className="bg-white rounded-[10px] p-[10px] text-[#282828] flex justify-between items-center">
                  <div className="flex items-center gap-1 min-w-[137px]">
                    <img src="/images/lvl-6-diamond.png" alt="" />
                    <p className="font-semibold">Diamond</p>
                  </div>
                  <div className="flex gap-1">
                    <img src="/images/coin.png" className="w-5 h-5" alt="" />
                    <p className="font-semibold">+20K</p>
                  </div>
                  <div className="flex gap-1">
                    <img src="/images/coin.png" className="w-5 h-5" alt="" />
                    <p className="font-semibold pr-5">+25K</p>
                  </div>
                </div>
                <div className="bg-white rounded-[10px] p-[10px] text-[#282828] flex justify-between items-center">
                  <div className="flex items-center gap-1 min-w-[137px]">
                    <img src="/images/lvl-7-master.png" alt="" />
                    <p className="font-semibold">Master</p>
                  </div>
                  <div className="flex gap-1">
                    <img src="/images/coin.png" className="w-5 h-5" alt="" />
                    <p className="font-semibold">+20K</p>
                  </div>
                  <div className="flex gap-1">
                    <img src="/images/coin.png" className="w-5 h-5" alt="" />
                    <p className="font-semibold pr-5">+25K</p>
                  </div>
                </div>
                <div className="bg-white rounded-[10px] p-[10px] text-[#282828] flex justify-between items-center">
                  <div className="flex items-center gap-1 min-w-[137px]">
                    <img src="/images/lvl-8-grand-master.png" alt="" />
                    <p className="font-semibold text-sm">Grand Master</p>
                  </div>
                  <div className="flex gap-1">
                    <img src="/images/coin.png" className="w-5 h-5" alt="" />
                    <p className="font-semibold">+20K</p>
                  </div>
                  <div className="flex gap-1">
                    <img src="/images/coin.png" className="w-5 h-5" alt="" />
                    <p className="font-semibold pr-5">+25K</p>
                  </div>
                </div>
                <div className="bg-white rounded-[10px] p-[10px] text-[#282828] flex justify-between items-center">
                  <div className="flex items-center gap-1 min-w-[137px]">
                    <img src="/images/lvl-9-lord.png" alt="" />
                    <p className="font-semibold">Lord</p>
                  </div>
                  <div className="flex gap-1">
                    <img src="/images/coin.png" className="w-5 h-5" alt="" />
                    <p className="font-semibold">+20K</p>
                  </div>
                  <div className="flex gap-1">
                    <img src="/images/coin.png" className="w-5 h-5" alt="" />
                    <p className="font-semibold pr-5">+25K</p>
                  </div>
                </div>
                <div className="bg-white rounded-[10px] p-[10px] text-[#282828] flex justify-between items-center">
                  <div className="flex items-center gap-1 min-w-[137px]">
                    <img src="/images/lvl-10-legendary.png" alt="" />
                    <p className="font-semibold">Legendary</p>
                  </div>
                  <div className="flex gap-1">
                    <img src="/images/coin.png" className="w-5 h-5" alt="" />
                    <p className="font-semibold">+20K</p>
                  </div>
                  <div className="flex gap-1">
                    <img src="/images/coin.png" className="w-5 h-5" alt="" />
                    <p className="font-semibold pr-5">+25K</p>
                  </div>
                </div>
              </div>
            </>
          )}
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

export default Earn;
