"use Client";

import { useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";

function Airdrop() {
  const user = useSelector((x: any) => x.TaskReducer.user);
  const router = useRouter();
  const userFromQuery = router.query.user?.toString() || "";


  return (
    <>
      <div className="flex-1 h-0">
        <div className="py-[23px] px-5 text-white border-t border-[#DFDCD5] rounded-t-3xl bg-gradient-to-b from-[#FFF3D8] to-[#F8DFA6] h-full overflow-auto">
          <img src="/images/logo.png" className="mx-auto" alt="" />
          <p className="font-bold text-[42px] text-center text-[#282828]">
            Airdrop Tasks
          </p>
          <p className="text-[#DD523A] text-center text-[16px]">
            Listing is on its way. Tasks will appear below. Complete them to
            participate in the Airdrop.
          </p>
          <p className="text-[#DD523A] font-semibold pt-[30px] pb-[15px]">
            Task list
          </p>
          <div className="bg-[#FFFFFF] rounded-[10px] flex items-center justify-between p-[10px]">
            <img src="/images/wallet.png" alt="" />
            <p className="text-black font-semibold">Connect your TON wallet</p>
            <p className="bg-gradient-to-t from-[#DC6E09] to-[#FF8A00] rounded-[5px] border-[#FF8A00] shadow-[0px_2px_0px_0px_#DC6E09] p-[10px]">
              Connect
            </p>
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

export default Airdrop;
