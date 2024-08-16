"use Client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { useTonConnectUI } from "@tonconnect/ui-react";

function Account() {
  const user = useSelector((x: any) => x.TaskReducer.user);
  const [tonConnectUi] = useTonConnectUI();
  
  return (
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
            <p className="text-[#DD523A] font-semibold text-sm">Global Rank</p>
            <p className="text-[#5B586A] font-semibold text-lg">#164,934</p>
          </div>
          <div className="w-[1px] h-full bg-[#CACACA]"></div>
          <div className="text-center flex flex-col justify-between">
            <p className="text-[#DD523A] font-semibold text-sm">Game Level 5</p>
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
        <button className="py-4 w-full bg-gradient-to-t from-[#DC6E09] to-[#FF8A00] rounded-[10px] shadow-[0px_2px_0px_0px_#DC6E09]" onClick={() => tonConnectUi.openModal()}>
          Connect Wallet
        </button>
      </div>
    </div>
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
