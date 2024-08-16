import type { AppProps } from "next/app";
import "../app/globals.css";
import { SnackbarProvider } from "notistack";
import axios from "@/app/axios";
import Header from "./Header";
import Footer from "./Footer";
import { persistor, store } from "../redux";
import { TonConnectUIProvider, THEME } from "@tonconnect/ui-react";
import {
  Provider as StoreProvider,
  useDispatch,
  useSelector,
} from "react-redux";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { setTasks } from "@/redux/reducers/TaskReducer";
import { PersistGate } from "redux-persist/integration/react";

const AppWrapper = ({ Component, pageProps }: any) => {
  const dispatch = useDispatch();
  const isLoaded = useSelector((x: any) => x.TaskReducer.isLoaded);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const { userAgent } = window.navigator;
    setIsMobile(userAgent.includes("Mobi"));
    const func = async () => {
      const { data } = await axios.get("/tasks");
      dispatch(setTasks(data));
    };
    // func();
  }, []);

  // return isMobile ? (
  //   !isLoaded ? (
  //     <div className="flex justify-center items-center h-screen">
  //       <CircularProgress />
  //     </div>
  //   ) : (
  //     <Component {...pageProps} />
  //   )
  // ) : (
  //   <div className="flex flex-col space-y-5 justify-center items-center fixed top-0 left-0 w-full h-full bg-gradient-to-b from-[#FFF3D8] to-[#F8DFA6] z-[2]">
  //     <img className="max-w-[186px]" src="/images/crying.svg" />
  //     <span>Not available in PC.</span>
  //   </div>
  // );
  return <Component {...pageProps} />;
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TonConnectUIProvider
      // manifestUrl="/tonconnect-manifest.json"
      manifestUrl="https://ipfs.io/ipfs/QmPGbEC1E62wMWi11Yn3Q3K35e1fdPiyU7qXH9jX9mq7tP"
      uiPreferences={{ theme: THEME.DARK }}
      walletsListConfiguration={{
        includeWallets: [
          {
            appName: "tonwallet",
            name: "TON Wallet",
            imageUrl: "https://wallet.ton.org/assets/ui/qr-logo.png",
            aboutUrl:
              "https://chrome.google.com/webstore/detail/ton-wallet/nphplpgoakhhjchkkhmiggakijnkhfnd",
            universalLink: "https://wallet.ton.org/ton-connect",
            jsBridgeKey: "tonwallet",
            bridgeUrl: "https://bridge.tonapi.io/bridge",
            platforms: ["chrome", "android"],
          },
          {
            appName: "nicegramWallet",
            name: "Nicegram Wallet",
            imageUrl: "https://static.nicegram.app/icon.png",
            aboutUrl: "https://nicegram.app",
            universalLink: "https://nicegram.app/tc",
            deepLink: "nicegram-tc://",
            jsBridgeKey: "nicegramWallet",
            bridgeUrl: "https://bridge.tonapi.io/bridge",
            platforms: ["ios", "android"],
          },
          {
            appName: "binanceTonWeb3Wallet",
            name: "Binance Web3 Wallet",
            imageUrl:
              "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjMEIwRTExIi8+CjxwYXRoIGQ9Ik01IDE1TDcuMjU4MDYgMTIuNzQxOUw5LjUxNjEzIDE1TDcuMjU4MDYgMTcuMjU4MUw1IDE1WiIgZmlsbD0iI0YwQjkwQiIvPgo8cGF0aCBkPSJNOC44NzA5NyAxMS4xMjlMMTUgNUwyMS4xMjkgMTEuMTI5TDE4Ljg3MSAxMy4zODcxTDE1IDkuNTE2MTNMMTEuMTI5IDEzLjM4NzFMOC44NzA5NyAxMS4xMjlaIiBmaWxsPSIjRjBCOTBCIi8+CjxwYXRoIGQ9Ik0xMi43NDE5IDE1TDE1IDEyLjc0MTlMMTcuMjU4MSAxNUwxNSAxNy4yNTgxTDEyLjc0MTkgMTVaIiBmaWxsPSIjRjBCOTBCIi8+CjxwYXRoIGQ9Ik0xMS4xMjkgMTYuNjEyOUw4Ljg3MDk3IDE4Ljg3MUwxNSAyNUwyMS4xMjkgMTguODcxTDE4Ljg3MSAxNi42MTI5TDE1IDIwLjQ4MzlMMTEuMTI5IDE2LjYxMjlaIiBmaWxsPSIjRjBCOTBCIi8+CjxwYXRoIGQ9Ik0yMC40ODM5IDE1TDIyLjc0MTkgMTIuNzQxOUwyNSAxNUwyMi43NDE5IDE3LjI1ODFMMjAuNDgzOSAxNVoiIGZpbGw9IiNGMEI5MEIiLz4KPC9zdmc+Cg==",
            aboutUrl: "https://www.binance.com/en/web3wallet",
            deepLink: "bnc://app.binance.com/cedefi/ton-connect",
            bridgeUrl: "https://bridge.tonapi.io/bridge",
            platforms: ["chrome", "safari", "ios", "android"],
            universalLink: "https://app.binance.com/cedefi/ton-connect",
          },
          {
            appName: "fintopio-tg",
            name: "Fintopio Telegram",
            imageUrl: "https://fintopio.com/tonconnect-icon.png",
            aboutUrl: "https://fintopio.com",
            universalLink: "https://t.me/fintopio?attach=wallet",
            bridgeUrl: "https://wallet-bridge.fintopio.com/bridge",
            platforms: ["ios", "android", "macos", "windows", "linux"],
          },
          {
            appName: "GateWallet",
            name: "GateWallet",
            imageUrl: "https://www.gate.io/images/login/qrcode_center_icon.svg",
            aboutUrl: "https://www.gate.io/",
            bridgeUrl: "https://dapp.gateio.services/tonbridge_api/bridge/v1",
            jsBridgeKey: "gatetonwallet",
            platforms: ["ios", "android", "chrome"],
            universalLink: "https://gateio.onelink.me/DmA6/web3",
          },
          {
            appName: "hot",
            name: "HOT",
            imageUrl: "https://storage.herewallet.app/logo.png",
            aboutUrl: "https://hot-labs.org/",
            universalLink: "https://t.me/herewalletbot?attach=wallet",
            bridgeUrl: "https://sse-bridge.hot-labs.org",
            jsBridgeKey: "hotWallet",
            platforms: ["ios", "android", "macos", "windows", "linux"],
          },
          {
            appName: "bybitTonWallet",
            name: "Bybit Wallet",
            imageUrl:
              "https://static.bymj.io/bhop/image/Q3Kmzw7qczSZF5eqfo6pW8QuT1MDMmqC80lWxFBhiE0.png",
            aboutUrl: "https://www.bybit.com/web3",
            universalLink: "https://app.bybit.com/ton-connect",
            deepLink: "bybitapp://",
            jsBridgeKey: "bybitTonWallet",
            bridgeUrl:
              "https://api-node.bybit.com/spot/api/web3/bridge/ton/bridge",
            platforms: ["ios", "android", "chrome"],
          },
          {
            appName: "dewallet",
            name: "DeWallet",
            imageUrl:
              "https://raw.githubusercontent.com/delab-team/manifests-images/main/WalletAvatar.png",
            aboutUrl: "https://delabwallet.com",
            universalLink: "https://t.me/dewallet?attach=wallet",
            bridgeUrl: "https://bridge.dewallet.pro/bridge",
            platforms: ["ios", "android", "macos", "windows", "linux"],
          },
        ],
      }}
      actionsConfiguration={{
        twaReturnUrl: "https://t.me/DemoDappWithTonConnectBot/demo",
      }}
    >
      <StoreProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SnackbarProvider>
            {/* <Header /> */}
            <AppWrapper Component={Component} pageProps={pageProps} />
            <Footer />
          </SnackbarProvider>
        </PersistGate>
      </StoreProvider>
    </TonConnectUIProvider>
  );
}
