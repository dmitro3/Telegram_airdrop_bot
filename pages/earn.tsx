"use Client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import Topheader from "./Topheader";
import axios from "../app/axios";

import Card from "@/app/components/common/card";
import YoutubeCard from "@/app/components/common/youtubecard";
import Tabs from "@/app/components/tabs";

interface Level {
  level_id: number;
  level_name: string;
  friend_value: number;
  premium_value: number;
  level_avatar: string;
}

function Earn() {
  const [levels, setLevels] = useState<Level[]>([]);
  const allTasks = useSelector((x: any) => x.TaskReducer.tasks);
  const extraTasks = allTasks?.filter((x: any) => x.extra === true);
  const router = useRouter();
  const user = useSelector((x: any) => x.TaskReducer.user);
  const userFromQuery = router.query.user?.toString() || "";
  const { activeTabState } = router.query;

  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (activeTabState) {
      setActiveTab(Number(activeTabState));
    }
  }, [activeTabState]);

  useEffect(() => {
    const fetchlevel = async () => {
      const { data } = await axios.get("/bonuslevel");
      setLevels(data);
    };
    fetchlevel();
  }, []);

  const handleImageLoad = () => {};

  return (
    <>
      <div className="flex-1 h-0">
        <div className="pt-[23px] pb-[150px] px-5 text-white rounded-t-3xl border-t border-[#DFDCD5] bg-gradient-to-b from-[#FFF3D8] to-[#F8DFA6] h-full overflow-auto">
          <Topheader />
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
                {levels.map((level) => (
                  <div
                    key={level.level_id}
                    className="bg-white rounded-[10px] p-[10px] text-[#282828] flex justify-between items-center"
                  >
                    <div className="flex items-center gap-1 min-w-[137px]">
                      <img src={level.level_avatar} alt={level.level_name} />
                      <p className="font-semibold text-sm">{level.level_name}</p>
                    </div>
                    <div className="flex gap-1">
                      <img
                        src="/images/coin.png"
                        className="w-5 h-5"
                        alt="Coin"
                      />
                      <p className="font-semibold">+{level.friend_value}</p>
                    </div>
                    <div className="flex gap-1">
                      <img
                        src="/images/coin.png"
                        className="w-5 h-5"
                        alt="Coin"
                      />
                      <p className="font-semibold pr-5">
                        +{level.premium_value}
                      </p>
                    </div>
                  </div>
                ))}
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
