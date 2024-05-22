import React from "react";
const Dashboard = () => {
  return (
    <div className="min-h-screen py-14 flex gap-16 flex-col lg:flex-row sm:flex-wrap justify-center items-center bg-[#F1F5FD]">
      <div className="relative z-[50]">
        <div class="semi-circle -rotate-[47deg] w-[295px] h-[271px] rounded-[100px_100px_0_0] sm:rounded-[400px_400px_0_0] sm:w-[411px] sm:h-[251px] -top-[123px] -left-[139px] sm:-left-[118px] sm:-top-[41px] absolute bg-[#f1f5fd] z-50"></div>
        <div className="relative h-[200px] w-[200px] sm:h-[300px] sm:w-[300px] group rounded-full bg-[#F1F5FD] cursor-pointer">
          <img
            src="https://www.tailwindtap.com/assets/components/team-member/ceo.jpg"
            className="h-[200px] w-[200px] sm:h-[300px] sm:w-[300px] rounded-full  object-cover object-top border-[#f1f5fd] relative z-[60]"
            alt="ceo"
          />
          <div className="h-0 w-0 group-hover:h-[290px] group-hover:w-[290px] group-hover:sm:h-[400px] group-hover:sm:w-[400px] bg-gradient-to-r transition-all duration-300 ease-in-out from-pink-500 via-red-500 to-yellow-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full"></div>
          <div className="absolute transition-all group-hover:duration-300 group-hover:delay-200 group-hover:ease-in-out top-12 group-hover:top-[41px] group-hover:left-[201px] group-hover:sm:top-[80px] left-0 group-hover:sm:left-[304px] hover:delay-0 hover:duration-0 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className=" hover:fill-blue-500 fill-black transition-none min-h-[32px] min-w-[26px] sm:min-h-[42px] sm:min-w-[32px]"
            >
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z" />
            </svg>
          </div>
          <div className="top-12 group-hover:top-[89px] group-hover:left-[209px] group-hover:sm:top-[147px] absolute transition-all duration-300 group-hover:delay-200 ease-in-out left-0 group-hover:sm:left-[310px] hover:delay-0 hover:duration-0 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              className="min-h-[32px] min-w-[26px] sm:min-h-[42px] sm:min-w-[32px] hover:fill-blue-500 fill-black"
            >
              <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334c0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518a3.301 3.301 0 0 0 1.447-1.817a6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429a3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218a3.203 3.203 0 0 1-.865.115a3.23 3.23 0 0 1-.614-.057a3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
            </svg>
          </div>
          <div className="top-12 group-hover:top-[137px] group-hover:left-[199px] group-hover:sm:top-[210px] absolute transition-all duration-300 group-hover:delay-100 ease-in-out left-0 group-hover:sm:left-[290px] hover:delay-0 hover:duration-0 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="min-h-[32px] min-w-[26px] sm:min-h-[42px] sm:min-w-[32px] hover:fill-blue-500 fill-black"
            >
              <path d="M12 2.04c-5.5 0-10 4.49-10 10.02c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89c1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02Z" />
            </svg>
          </div>
          <div className="top-12 group-hover:top-[177px] group-hover:left-[169px] group-hover:sm:top-[264px] absolute transition-all hover:delay-0 hover:duration-0 duration-300 group-hover:delay-200 ease-in-out left-0 group-hover:sm:left-[250px] cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="min-h-[32px] min-w-[26px] sm:min-h-[42px] sm:min-w-[32px] hover:fill-blue-500 fill-black"
            >
              <path d="M4 18h2v4.081L11.101 18H16c1.103 0 2-.897 2-2V8c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2z" />
              <path d="M20 2H8c-1.103 0-2 .897-2 2h12c1.103 0 2 .897 2 2v8c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2z" />
            </svg>
          </div>
          <div className="top-12 group-hover:top-[201px] group-hover:left-[123px] group-hover:sm:top-[296px] absolute transition-all hover:delay-0 hover:duration-0 duration-300 group-hover:delay-200 ease-in-out left-0 group-hover:sm:left-[188px] cursor-pointer -rotate-[17deg]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              className="min-h-[32px] min-w-[26px] sm:min-h-[42px] sm:min-w-[32px] hover:fill-blue-500 fill-black"
            >
              <path
                fill-rule="evenodd"
                d="m7.172 11.334l2.83 1.935l2.728-1.882l6.115 6.033c-.161.052-.333.08-.512.08H1.667c-.22 0-.43-.043-.623-.12l6.128-6.046ZM20 6.376v9.457c0 .247-.054.481-.15.692l-5.994-5.914L20 6.376ZM0 6.429l6.042 4.132l-5.936 5.858A1.663 1.663 0 0 1 0 15.833V6.43ZM18.333 2.5c.92 0 1.667.746 1.667 1.667v.586L9.998 11.648L0 4.81v-.643C0 3.247.746 2.5 1.667 2.5h16.666Z"
              />
            </svg>
          </div>
          <div className="top-12 group-hover:top-[205px] group-hover:left-[68px] group-hover:sm:top-[301px] absolute hover:delay-0 hover:duration-0 transition-all duration-300 group-hover:delay-200 ease-in-out left-0 group-hover:sm:left-[116px] cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              className="min-h-[32px] min-w-[26px] sm:min-h-[42px] sm:min-w-[32px] hover:fill-blue-500 fill-black "
            >
              <path
                fill-rule="evenodd"
                d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42a18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
