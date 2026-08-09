import { ImageResponse } from 'next/og';

export const alt = 'Stefano Christian Wiryana | Cyber Security Consultant';
export const contentType = 'image/png';
export const size = { width: 1200, height: 630 };

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      tw="flex h-full w-full flex-col justify-between bg-[#0b0d12] p-16 text-[#f5f7fa]"
      style={{
        backgroundImage:
          'radial-gradient(circle at 82% 14%, rgba(245,129,72,0.34), transparent 28%), radial-gradient(circle at 14% 88%, rgba(217,184,117,0.16), transparent 25%)',
      }}
    >
      <div tw="flex items-center text-[24px] uppercase text-[#d9b875]">
        Security Solution Delivery Engineer
      </div>
      <div tw="flex flex-col">
        <div tw="text-[84px] font-bold leading-[0.95] tracking-tight">
          From security posture evaluation to confident deployment.
        </div>
        <div tw="mt-9 text-[32px] leading-tight text-[#c7ced9]">
          Cyber security solution delivery, from proof of concept through managed
          service.
        </div>
      </div>
      <div tw="flex items-center border-t border-[#424752] pt-7 text-[25px] text-[#f58148]">
        Stefano Christian Wiryana · Security Solution Delivery Engineer
      </div>
    </div>,
    size,
  );
}
