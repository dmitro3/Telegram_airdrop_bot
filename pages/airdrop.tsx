"use Client";

import { useSelector } from "react-redux";

function Airdrop() {
  const user = useSelector((x: any) => x.TaskReducer.user);

  return (
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
        <p className="text-[#DD523A] font-semibold pt-[30px] pb-[15px]">Task list</p>
        <div className="bg-[#FFFFFF] rounded-[10px] flex items-center justify-between p-[10px]">
          <img src="/images/wallet.png" alt="" />
          <p className="text-black font-semibold">Connect your TON wallet</p>
          <p className="bg-gradient-to-t from-[#DC6E09] to-[#FF8A00] rounded-[5px] border-[#FF8A00] shadow-[0px_2px_0px_0px_#DC6E09] p-[10px]">
            Connect
          </p>
        </div>
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

export default Airdrop;
