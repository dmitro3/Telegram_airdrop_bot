"use Client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useRouter } from "next/router";
import { red } from "@mui/material/colors";

function Account() {
  const router = useRouter();
  const user = useSelector((x: any) => x.TaskReducer.user);
  const userFromQuery = router.query.user?.toString() || "";

  return (
    <>
      <div className="flex-1 h-0">
        <div className="pt-[23px] pb-[150px] px-5 text-white rounded-t-3xl border-t border-[#DFDCD5] bg-gradient-to-b from-[#FFF3D8] to-[#F8DFA6] h-full overflow-auto flex flex-col gap-4">
          <img src="/images/john-doe.png" className="mx-auto" alt="" />
          <p className="font-bold text-[42px] text-center text-[#282828]">
            John Doe
          </p>
          <div className="flex gap-1 justify-center">
            <img src="/images/coin.png" alt="" />
            <p className="text-5xl bg-gradient-to-b from-[#FED953] to-[#FFC700] text-transparent bg-clip-text stroke-1 stroke-[#CF6100]">
              123,214
            </p>
          </div>
          <div className="flex px-[10px] py-[20px] justify-around bg-gradient-to-t from-[#EEEEEE] to-[#FFFFFF] rounded-[10px] shadow-[0px_4px_0px_0px_#CACACA]">
            <div className="text-center flex flex-col justify-between">
              <p className="text-[#DD523A] font-semibold text-sm">
                Global Rank
              </p>
              <p className="text-[#5B586A] font-semibold text-lg">#164,934</p>
            </div>
            <div className="w-[1px] h-full bg-[#CACACA]"></div>
            <div className="text-center flex flex-col justify-between">
              <p className="text-[#DD523A] font-semibold text-sm">
                Game Level 5
              </p>
              <div className="flex gap-1 items-end">
                <img src="/images/lvl-5-platinum.png" alt="" />
                <p className="text-[#5B586A] font-semibold text-lg">Platinum</p>
              </div>
            </div>
            <div className="w-[1px] h-full bg-[#CACACA]"></div>
            <div className="text-center flex flex-col justify-between">
              <p className="text-[#DD523A] font-semibold text-sm">Invite</p>
              <p className="text-[#5B586A] font-semibold text-lg">25 Total</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Link
              href={"/airdrop"}
              className="bg-gradient-to-b from-[#DD523A] to-[#C24934] shadow-[0px_4px_0px_0px_#AB402D] py-[20px] w-full flex flex-col items-center rounded-[10px]"
            >
              <img src="/images/hugeicons_airdrop.png" alt="" />
              <p>Airdrop</p>
            </Link>
            <Link
              href={"/leaderboard"}
              className="bg-gradient-to-b from-[#DD523A] to-[#C24934] shadow-[0px_4px_0px_0px_#AB402D] py-[20px] w-full flex flex-col items-center rounded-[10px]"
            >
              <img src="/images/iconoir_leaderboard-star.png" alt="" />
              <p>Leaderboard</p>
            </Link>
            <div className="bg-gradient-to-b from-[#DD523A] to-[#C24934] shadow-[0px_4px_0px_0px_#AB402D] py-[20px] w-full flex flex-col items-center rounded-[10px]">
              <img src="/images/mdi_account-box-outline.png" alt="" />
              <p>Social Accounts</p>
            </div>
            <div className="bg-gradient-to-b from-[#DD523A] to-[#C24934] shadow-[0px_4px_0px_0px_#AB402D] py-[20px] w-full flex flex-col items-center rounded-[10px]">
              <img src="/images/icon-park-outline_wallet.png" alt="" />
              <p>My Wallets</p>
            </div>
          </div>
          <div className="flex justify-center">
            <TonConnectButton />
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

export default Account;
