import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const Footer = () => {
  const router = useRouter();
  const user = useSelector((x: any) => x.TaskReducer.user);
  const userFromQuery = router.query.user?.toString() || "";

  return (
    // user ?
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
            <img src="/images/footer-game.png" className="mt-[-25px] w-[75px] h-[75px]" />
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
    // : null
  );
};

export default Footer;
