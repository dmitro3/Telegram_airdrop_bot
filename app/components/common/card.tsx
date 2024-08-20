"use Client";

import React, { Ref, forwardRef, useRef, useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import axios from "@/app/axios";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import "../../globals.css";

interface CardProps {
  title: string;
  description?: String;
  price: string;
  link: string;
  img: string;
  onLoad: () => void;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Card({ title, description, price, link, img, onLoad }: CardProps) {
  const user = useSelector((x: any) => x.TaskReducer.user);
  const snackbar = useSnackbar();
  const [open, setOpen] = useState(false);
  const [doing, setDoing] = useState(false);
  const forceRef = useRef(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBonus = () => {
    setDoing(true);
    axios.post("/bonus", { user, title, price }).then((response: any) => {
      console.log(response.data);
      if (response.data.stats == "success")
        snackbar.enqueueSnackbar(
          `You gain ${price} coins.  Your balance is ${response.data.mount}`,
          { autoHideDuration: 1000 }
        );
      else
        snackbar.enqueueSnackbar("You need to wait 24 hours for next time", {
          autoHideDuration: 1000,
        });
      setTimeout(() => (forceRef?.current as any).click(), 1000);
      setOpen(false);
      setDoing(false);
    });
  };
  return (
    <>
      <div
        className="cursor-pointer mt-3 bg-white border border-[#E3E3E3] p-[10px] flex items-center rounded-[10px]"
        onClick={handleClickOpen}
      >
        <img
          src={img}
          alt="mexc"
          className="w-14 h-14 rounded-full"
          onLoad={onLoad}
        />
        <div className="flex flex-col space-y-1 ml-3">
          <p className="font-semibold text-[14px] text-[#282828]">
            Join to our {title}
          </p>
          <div className="flex gap-1 items-center">
            <img src="/images/coin.png" alt="dollar" className="w-5 h-5" />
            <div className="font-semibold text-[14px] text-[#282828]">
              +{price}
            </div>
          </div>
        </div>
        <div className="ml-auto flex items-center">
          <img src="/images/CaretRight.svg" alt="" />
        </div>
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{ backdropFilter: "blur(19px)" }}
      >
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            sx={{ color: "white" }}
          >
            <img
              className="absolute top-[20px] right-[20px] cursor-pointer"
              onClick={handleClose}
              src="/images/close.png"
            />
            <span className="flex flex-col text-center">
              <img
                src={img}
                alt="mexc"
                className="w-[114px] h-[114px] self-center"
              />
              <span className="mt-[35px] font-semibold text-[30px] text-[#282828]">
                {title}
              </span>
              <a
                ref={forceRef}
                className="text-black opacity-0"
                target="_self"
                href={link}
              >
                dd
              </a>
              <p className="flex justify-center items-center space-x-[10.61px] mt-[18.5px] font-bold text-[29px] leading-[29px]">
                <img
                  src="/images/coin.png"
                  alt="dollar"
                  className="w-[50px] h-[50px]"
                />
                <p className="text-[#FFC700]">+{price}</p>
              </p>
              <span className="my-[17px] text-[16px] text-[#6E6E6E]">
                {description}
              </span>
              <span className="flex justify-center mt-[29.08px]">
                <button
                  className="p-4 font-semibold text-[24px] bg-gradient-to-b from-[#FFAB07] to-[#E76116] shadow-[0px_4px_0px_0px_#DC6E09] border border-[#FF8A00] text-white rounded-[12px] transition duration-300 disabled:opacity-40 disabled:cursor-not-allowed w-full"
                  onClick={handleBonus}
                  disabled={doing}
                >
                  Go head
                </button>
              </span>
            </span>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Card;
