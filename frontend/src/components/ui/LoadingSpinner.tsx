import { JsxElement } from "typescript";

interface Props {
  children?: JsxElement | JsxElement[];
}

const LoadingSpinner = (props: Props) => {
  return (
    <div className="inline-block relative w-[80px] h-[80px]">
      <div className="absolute top-[33px] w-[13px] h-[13px] rounded-[50%] bg-white left-2 animate-loadingSpinner1"></div>
      <div className="absolute top-[33px] w-[13px] h-[13px] rounded-[50%] bg-white left-2 animate-loadingSpinner2"></div>
      <div className="absolute top-[33px] w-[13px] h-[13px] rounded-[50%] bg-white left-8 animate-loadingSpinner2"></div>
      <div className="absolute top-[33px] w-[13px] h-[13px] rounded-[50%] bg-white left-14 animate-loadingSpinner3"></div>
    </div>
  );
};

export default LoadingSpinner;
