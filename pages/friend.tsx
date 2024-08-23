import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import axios from "../app/axios";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import Topheader from "./Topheader";

interface Item {
  tgid: string;
  mount: number;
  avatar_url: string
}

function Friend() {
  const user = useSelector((x: any) => x.TaskReducer.user);
  const router = useRouter();
  const userFromQuery = router.query.user?.toString() || "";
  const [items, setItems] = useState<Item[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const response = await axios.post("/friends", { user });
        if (response.data.items == undefined) setItems([]);
        else setItems(response.data.items);
      }
    };
    fetchData();
  }, [user]);

  const handleInviteClick = async () => {
    // Generate the invite link
    const inviteLink = `https://t.me/Chirpley_Bot?start=${user}\nPlay with me, become cryptoexchange CEO and get a token airdrop`;
    console.log(inviteLink);

    // Show the invite link in a snackbar or modal
    enqueueSnackbar("Invite link copied to clipboard!", { variant: "success" });

    // Copy the link to the clipboard
    const shareLink = `https://t.me/share/url?url=${encodeURIComponent(
      inviteLink
    )}`;

    // Open the share link in a new window
    window.open(shareLink, "_blank");
  };

  const handleMoreBonusesClick = () => {
    router.push({
      pathname: "/earn",
      query: { activeTabState: 1 },
    });
  };

  return (
    <>
      <div className="flex flex-col gap-5 px-5 pt-[23px] pb-[150px] rounded-t-3xl border-t border-[#DFDCD5] bg-gradient-to-b from-[#FFF3D8] to-[#F8DFA6] flex-1 h-0 overflow-auto">
        <Topheader />
        <div className="text-[30px] text-center text-black font-semibold">
          Invite Friends
        </div>
        <div className="font-medium text-[16px] text-center text-[#DD523A]">
          You and your friend will receive bonuses
        </div>
        {/* <div className="flex justify-center space-x-2 mt-8">
          <button
            className="px-[16.5px] py-[15.5px] font-bold text-[14px] leading-[20px] bg-main text-white rounded-[12px] disabled:cursor-not-allowed"
            onClick={handleInviteClick}
          >
            Invite a friend
          </button>
          <button className="px-[9.5px] py-[9px] bg-main rounded-[12px] disabled:cursor-not-allowed">
            <img src="/images/copy.svg" />
          </button>
        </div> */}
        <div className="flex justify-between items-center bg-white border border-[#E3E3E3] rounded-[10px] p-[10px] space-x-5">
          <div className="flex items-center gap-[10px] ml-8">
            <img
              src="/images/icon-friend.png"
              className="w-[56px] h-[56px]"
              alt="gift"
            ></img>
            <div className="text-white text-sm font-normal flex flex-col space-y-2 ml-10">
              <p className="font-semibold text-[14px] text-[#282828]">
                Invite a friend
              </p>
              <div className="flex items-center space-x-2">
                <img
                  src="/images/coin.png"
                  alt="dollar"
                  className="w-5 h-5"
                ></img>
                <div className="font-semibold text-[16px] text-[#282828]">
                  +5,000
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center bg-white border border-[#E3E3E3] rounded-[10px] p-[10px] space-x-5">
          <div className="flex items-center gap-[10px] ml-8">
            <img
              src="/images/icon-telegram.png"
              className="w-[56px] h-[56px]"
              alt="gift"
            ></img>
            <div className="text-white text-sm flex flex-col space-y-2 ml-10">
              <p className="font-semibold text-[14px] text-[#282828]">
                Invite a friend with Telegram Premium
              </p>
              <div className="flex items-center space-x-2">
                <img
                  src="/images/coin.png"
                  alt="dollar"
                  className="w-5 h-5"
                ></img>
                <div className="font-semibold text-[16px] text-[#282828]">
                  +10,000
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          className="py-3 bg-gradient-to-b from-[#FFAB07] to-[#E76116] shadow-[0px_2px_0px_0px_#DC6E09] border border-[#FF8A00] text-white rounded-[10px] text-center"
          onClick={handleMoreBonusesClick}
        >
          More Bonuses
        </button>
        <div className="font-medium text-black mt-[43px]">
          List of your friends
        </div>
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <div className="font-medium text-[14px] text-[#DD523A] mt-3 mb-[25px]">
              You haven&apos;t invited anyone yet
            </div>
            <button
              className="py-3 px-5 bg-gradient-to-b from-[#FFAB07] to-[#E76116] shadow-[0px_2px_0px_0px_#DC6E09] border border-[#FF8A00] text-white rounded-[10px] text-center"
              onClick={handleInviteClick}
            >
              Invite a friend
            </button>
          </div>
        ) : (
          <div className="mb-[100px]">
            {items.map((item, index) => (
              <div className="flex justify-between bg-white border border-[#E3E3E3] rounded-[10px] py-[10px] px-[15px]" key={index}>
              <div className="flex items-center">
                <img
                  src={item.avatar_url}
                  className="w-10 h-10 rounded-full"
                  alt="friend-avatar"
                ></img>
                <p className="text-[#282828] text-[16px] font-semibold leading-4 ml-[10px]">
                  {item.tgid}
                </p>
                <img src="/images/lvl-10-legendary.png" className="w-6 h-6 ml-[10px]" alt="" />
              </div>
              <div className="flex items-center">
                <img
                  src="/images/coin.png"
                  alt="dollar"
                  className="w-5 h-5"
                ></img>
                <div className="font-semibold text-[16px] text-[#282828] ml-1">
                  {item.mount}
                </div>
              </div>
            </div>
            ))}
          </div>
        )}
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

export default Friend;
