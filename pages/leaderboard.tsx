"use Client";

import { useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";

function Leaderboard() {
  const user = useSelector((x: any) => x.TaskReducer.user);
  const router = useRouter();
  const userFromQuery = router.query.user?.toString() || "";


  return (
    <>
      <div className="flex-1 h-0">
        <div className="pt-[23px] pb-[150px] px-5 text-white border-t border-[#DFDCD5] bg-gradient-to-b from-[#FFF3D8] to-[#F8DFA6] h-full overflow-auto flex flex-col gap-4">
          <img src="/images/john-doe.png" className="mx-auto" alt="" />
          <p className="font-bold text-[28px] text-center text-[#282828]">
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
          <p className="text-3xl text-center text-black font-semibold">
            Leaderboard
          </p>
          <div className="flex justify-between border border-[#FF7C65] bg-gradient-to-b from-[#DD523A] to-[#C24934] rounded-[10px] shadow-[0px_4px_0px_0px_#AB402D] py-[10px] px-[16px]">
            <div className="flex gap-[10px] items-center">
              <p className="font-semibold">1</p>
              <img src="/images/egg-with-bg.png" alt="" />
              <p className="font-semibold">Johndoe123</p>
            </div>
            <div className="flex items-center gap-1">
              <img src="./images/coin.png" className="w-5 h-5" alt="" />
              <p>+13,000,000</p>
            </div>
          </div>
          <div className="flex justify-between border border-[#FF8A00] bg-gradient-to-b from-[#FFAB07] to-[#E76116] rounded-[10px] shadow-[0px_4px_0px_0px_#DC6E09] py-[10px] px-[16px]">
            <div className="flex gap-[10px] items-center">
              <p className="font-semibold">2</p>
              <img src="/images/egg-with-bg.png" alt="" />
              <p className="font-semibold">Johndoe123</p>
            </div>
            <div className="flex items-center gap-1">
              <img src="./images/coin.png" className="w-5 h-5" alt="" />
              <p>+13,000,000</p>
            </div>
          </div>
          <div className="flex justify-between border border-[#FFF965] bg-gradient-to-b from-[#FFD600] to-[#E8B500] rounded-[10px] shadow-[0px_4px_0px_0px_#E5B300] py-[10px] px-[16px]">
            <div className="flex gap-[10px] items-center">
              <p className="font-semibold">3</p>
              <img src="/images/egg-with-bg.png" alt="" />
              <p className="font-semibold">Johndoe123</p>
            </div>
            <div className="flex items-center gap-1">
              <img src="./images/coin.png" className="w-5 h-5" alt="" />
              <p>+13,000,000</p>
            </div>
          </div>
          <div className="flex justify-between bg-white rounded-[10px] py-[10px] px-[16px] text-black font-semibold">
            <div className="flex gap-[10px] items-center">
              <p>4</p>
              <img src="/images/egg-with-bg.png" alt="" />
              <p>Johndoe123</p>
            </div>
            <div className="flex items-center gap-1">
              <img src="./images/coin.png" className="w-5 h-5" alt="" />
              <p>+13,000,000</p>
            </div>
          </div>
          <div className="flex justify-between bg-white rounded-[10px] py-[10px] px-[16px] text-black font-semibold">
            <div className="flex gap-[10px] items-center">
              <p>5</p>
              <img src="/images/egg-with-bg.png" alt="" />
              <p>Johndoe123</p>
            </div>
            <div className="flex items-center gap-1">
              <img src="./images/coin.png" className="w-5 h-5" alt="" />
              <p>+13,000,000</p>
            </div>
          </div>
          <div className="flex justify-between bg-white rounded-[10px] py-[10px] px-[16px] text-black font-semibold">
            <div className="flex gap-[10px] items-center">
              <p>6</p>
              <img src="/images/egg-with-bg.png" alt="" />
              <p>Johndoe123</p>
            </div>
            <div className="flex items-center gap-1">
              <img src="./images/coin.png" className="w-5 h-5" alt="" />
              <p>+13,000,000</p>
            </div>
          </div>
          <div className="flex justify-between bg-white rounded-[10px] py-[10px] px-[16px] text-black font-semibold">
            <div className="flex gap-[10px] items-center">
              <p>7</p>
              <img src="/images/egg-with-bg.png" alt="" />
              <p>Johndoe123</p>
            </div>
            <div className="flex items-center gap-1">
              <img src="./images/coin.png" className="w-5 h-5" alt="" />
              <p>+13,000,000</p>
            </div>
          </div>
          <div className="flex justify-between bg-white rounded-[10px] py-[10px] px-[16px] text-black font-semibold">
            <div className="flex gap-[10px] items-center">
              <p>8</p>
              <img src="/images/egg-with-bg.png" alt="" />
              <p>Johndoe123</p>
            </div>
            <div className="flex items-center gap-1">
              <img src="./images/coin.png" className="w-5 h-5" alt="" />
              <p>+13,000,000</p>
            </div>
          </div>
          <div className="flex justify-between bg-white rounded-[10px] py-[10px] px-[16px] text-black font-semibold">
            <div className="flex gap-[10px] items-center">
              <p>9</p>
              <img src="/images/egg-with-bg.png" alt="" />
              <p>Johndoe123</p>
            </div>
            <div className="flex items-center gap-1">
              <img src="./images/coin.png" className="w-5 h-5" alt="" />
              <p>+13,000,000</p>
            </div>
          </div>
          <div className="flex justify-between bg-white rounded-[10px] py-[10px] px-[16px] text-black font-semibold">
            <div className="flex gap-[10px] items-center">
              <p>10</p>
              <img src="/images/egg-with-bg.png" alt="" />
              <p>Johndoe123</p>
            </div>
            <div className="flex items-center gap-1">
              <img src="./images/coin.png" className="w-5 h-5" alt="" />
              <p>+13,000,000</p>
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

export default Leaderboard;
